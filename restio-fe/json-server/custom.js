const jsonServer = require('json-server');
const server = jsonServer.create();
const db = require('./index')();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

const SERVER_PORT = 8080;

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

server.use(
    jsonServer.rewriter({
        '/api/v1/*': '/$1',
        '/auth/signup': '/users',
    })
);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

// Add custom routes before JSON Server router
server.get('/auth/logout', (req, res) => {
    res.status(200).end();
    return;
});

server.post('/auth/login', (req, res) => {
    const user = db.users.find(
        (user) => user.name === req.body.name || user.email === req.body.name
    );
    if (user && user.password === req.body.password) {
        const { password, ...passwordlessUser } = user;
        res.jsonp({ token: user.id, user: passwordlessUser });
        return;
    } else {
        res.sendStatus(400);
        return;
    }
});

// sign up is rewritten to this
server.post('/users', (req, res, next) => {
    req.body.role = 'User';
    next(); // formatting response is in router.render function
});

const isAuthorized = (req) => {
    const unprotected = req.path === '/users' && req.method === 'POST';
    const token = req.headers.authorization;
    return unprotected || Boolean(token);
};
server.use((req, res, next) => {
    if (isAuthorized(req)) {
        next();
    } else {
        res.sendStatus(401);
    }
});

const isAllowed = (req) => {
    const unprotected = req.path === '/users' && req.method === 'POST';
    if (unprotected) {
        return true;
    }
    const path = req.path;
    const method = req.method;
    const token = req.headers.authorization;
    const userId = Number(token?.split('Bearer ')[1]);
    const user = db.users.find((u) => u.id === userId);

    if (method === 'DELETE' || req.method === 'PUT') {
        return user.role === 'Admin';
    }
    if (path === '/users' && method === 'GET') {
        return user.role === 'Admin';
    }
    if (path === '/restaurants' && method === 'POST') {
        return user.role === 'Owner';
    }
    if (path === '/reviews/*/reply' && method === 'POST') {
        return user.role === 'Owner';
    }
    if (path === '/restaurants/*/reviews' && method === 'POST') {
        return user.role === 'User';
    }
    if (method === 'GET' && path.includes('/pendingReviews')) {
        return user.role === 'Owner';
    }
    return Boolean(req.headers.authorization);
};
server.use((req, res, next) => {
    if (isAllowed(req)) {
        next();
    } else {
        res.sendStatus(403);
    }
});

// parse serialized filter query param and expand to json-server x_like params
server.use((req, res, next) => {
    const filterString = req.query.filter;
    console.log('filter: ', filterString);
    if (filterString && typeof filterString === 'string') {
        const filterObject = JSON.parse(filterString);
        console.log('filterObject: ', filterObject);
        Object.entries(filterObject).forEach(([key, value]) => {
            req.query[`${key}_like`] = value;
        });
    }
    next();
});

// parse serialized sort query param and expand to json-server x_like params
server.use((req, res, next) => {
    const sortString = req.query.sort;
    console.log('sort: ', sortString);
    if (sortString && typeof sortString === 'string') {
        const desc = sortString.startsWith('-');
        const field = sortString.substr(desc ? 1 : 0);
        console.log('sort field: ', field);
        console.log('order desc: ', desc);
        req.query._sort = field;
        req.query._order = desc ? 'desc' : 'asc';
    }
    next();
});

// generic error echo, if string 'error' present in request body
server.use((req, res, next) => {
    if (JSON.stringify(req.body).indexOf('error') >= 0) {
        console.log('ERROR DETECTED: ', req.body);
        res.sendStatus(501).end();
    } else {
        next();
    }
});

server.get('/restaurants', (req, res, next) => {
    const token = req.headers.authorization;
    const userId = Number(token?.split('Bearer ')[1]);
    const user = db.users.find((u) => u.id === userId);
    const role = user?.role;

    if (role === 'User') {
        req.query._sort = 'avg_rating';
        req.query.avg_rating_gte = req.query.minRating ?? '0';
        next();
        return;
    }

    if (role === 'Owner') {
        // custom impl which returns only the restaurants belonging to the authorized user
        // returns additional field pendingReviews
        const ownedRestaurants = db.restaurants.filter(
            (r) => r.ownerId === user.id
        );
        const page = Number(req.query._page ?? 1);
        const limit = Number(req.query._limit ?? 10);
        const totalCount = ownedRestaurants.length;
        let data = ownedRestaurants.slice((page - 1) * limit, page * limit);
        data = data.map((d) => {
            const reviews = db.reviews.filter((rv) => rv.restaurantId === d.id);
            const pending = reviews.filter((rv) => !rv.reply).length;
            const avg =
                reviews.reduce((acc, rv) => acc + rv.rating, 0) /
                reviews.length;
            return {
                ...d,
                avg_rating: Number(avg.toFixed(2)),
                pendingReplies: pending,
            };
        });
        res.jsonp({
            restaurants: data,
            pagination: { total_count: totalCount },
        }).end();
        return;
    }
    next();
});

server.get('/restaurants/:restaurantId/pendingReviews', (req, res, next) => {
    const pendingReviews = db.reviews.filter(
        (rv) => rv.restaurantId === Number(req.params.restaurantId) && !rv.reply
    );
    const page = Number(req.query._page ?? 1);
    const limit = Number(req.query._limit ?? 10);
    const totalCount = pendingReviews.length;
    let data = pendingReviews.slice((page - 1) * limit, page * limit);
    res.jsonp({
        reviews: data,
        pagination: { total_count: totalCount },
    }).end();
    return;
});

server.post('/restaurants/:restaurantId/reviews', (req, res, next) => {
    let now = new Date();
    const offset = now.getTimezoneOffset();
    now = new Date(now.getTime() - offset * 60 * 1000);
    const nowStr = now.toISOString().split('T')[0];
    req.body.date = nowStr;
    next();
});

server.post('/reviews/:reviewId/reply', (req, res, next) => {
    const reviewId = req.params.reviewId;
    const review = db.reviews.find((rv) => rv.id === Number(reviewId));
    review.reply = req.body.reply;
    res.status(200).end();
    return;
});

server.use((req, res, next) => {
    if (req.method === 'PUT' && req.url.startsWith('/restaurants')) {
        const restaurant = db.restaurants.find(
            (restaurant) =>
                restaurant.id === Number(req.url.split('/restaurants/')[1])
        );
        if (restaurant) {
            restaurant.name = req.body.name;
            restaurant.ownerId = req.body.ownerId;
            res.status(200).end();
            return;
        } else {
            res.sendStatus(404);
            return;
        }
    }
    if (req.method === 'DELETE' && req.url.startsWith('/restaurants')) {
        const willDelete = db.restaurants.find(
            (restaurant) =>
                restaurant.id === Number(req.url.split('/restaurants/')[1])
        );
        db.restaurants = db.restaurants.filter(
            (restaurant) =>
                restaurant.id !== Number(req.url.split('/restaurants/')[1])
        );
        if (willDelete) {
            res.status(200).end();
            return;
        } else {
            res.sendStatus(404);
            return;
        }
    }
    if (req.method === 'PUT' && req.url.startsWith('/reviews')) {
        const reviewIdx = db.reviews.findIndex(
            (review) => review.id === Number(req.url.split('/reviews/')[1])
        );
        if (reviewIdx >= 0) {
            db.reviews[reviewIdx] = req.body;
            res.status(200).end();
            return;
        } else {
            res.sendStatus(404);
            return;
        }
    }
    if (req.method === 'DELETE' && req.url.startsWith('/reviews')) {
        const willDelete = db.reviews.find(
            (review) => review.id === Number(req.url.split('/reviews/')[1])
        );
        db.reviews = db.reviews.filter(
            (review) => review.id !== Number(req.url.split('/reviews/')[1])
        );
        if (willDelete) {
            res.status(200).end();
            return;
        } else {
            res.sendStatus(404);
            return;
        }
    }

    if (req.method === 'POST' && req.url.endsWith('/reply')) {
        res.status(201).end();
        return;
    }
    // Continue to JSON Server router
    next();
});

// We can handle unsupported routes
// fallback is original router.render
let orender = router.render;
router.render = (req, res) => {
    // sign up response with token
    if (req.method === 'POST' && req.url === '/users') {
        const { password, confirmPassword, ...newUser } = res.locals.data;
        res.jsonp({
            user: { ...newUser },
            token: res.locals.data.id,
        });
        return;
    }

    // pagination responses copying total_count header to response body
    if (req.method === 'GET' && req.url.startsWith('/restaurants?')) {
        res.jsonp({
            restaurants: res.locals.data,
            pagination: { total_count: res.get('X-Total-Count') },
        });
        return;
    }
    if (req.method === 'GET' && req.url.startsWith('/users?')) {
        res.jsonp({
            users: res.locals.data,
            pagination: { total_count: res.get('X-Total-Count') },
        });
        return;
    }
    if (req.method === 'GET' && req.url.indexOf('/reviews') >= 0) {
        res.jsonp({
            reviews: res.locals.data,
            pagination: { total_count: res.get('X-Total-Count') },
        });
        return;
    }

    if (req.method === 'POST' && req.url === '/restaurants') {
        const restaurant = res.locals.data;
        const authHeader = req.headers.authorization;
        const userId = authHeader.split('Bearer ')[1];
        restaurant.ownerId = Number(userId);
        res.status(200).end();
        return;
    }

    if (
        req.method === 'GET' &&
        req.url.split('/').length === 3 &&
        req.url.startsWith('/restaurants/')
    ) {
        const restId = res.locals.data.id;
        const reviews = db.reviews.filter((rev) => rev.restaurantId === restId);
        reviews.sort((a, b) =>
            a.rating > b.rating ? -1 : a.rating === b.rating ? 0 : 1
        );
        const highest = reviews?.[0];
        const lowest =
            reviews.length > 1 ? reviews[reviews.length - 1] : undefined;
        res.jsonp({
            restaurant: { ...res.locals.data },
            highestReview: highest,
            lowestReview: lowest,
        }).end();
        return;
    }
    return orender(req, res);
};

// Use default router
server.use(router);

server.listen(SERVER_PORT, () => {
    console.log('JSON Server is running');
});
