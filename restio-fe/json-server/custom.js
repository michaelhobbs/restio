const jsonServer = require('json-server');
const server = jsonServer.create();
const db = require('./index')();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
    res.jsonp(req.query);
});
server.use(
    jsonServer.rewriter({
        '/api/v1/*': '/$1',
    })
);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
    if (req.url !== '/users/login' && req.url !== '/users') {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.sendStatus(401);
        }

        if (req.method === 'DELETE' || req.method === 'PUT') {
            const userId = authHeader.split('Bearer ')[1];
            const user = db.users.find((user) => user.id === Number(userId));
            if (user.role !== 'Admin') {
                res.sendStatus(403);
            }
        }
    }

    if (req.url === '/users/login') {
        const user = db.users.find(
            (user) =>
                user.name === req.body.name || user.email === req.body.name
        );
        if (user && user.password === req.body.password) {
            res.jsonp({ token: user.id, user });
            return;
        } else {
            res.sendStatus(400);
            return;
        }
    }

    if (req.url === '/users/logout') {
        res.status(200).end();
        return;
    }
    if (req.method === 'GET' && req.url.includes('/pendingReviews')) {
        res.jsonp({
            reviews: [
                {
                    id: 10,
                    date: '2017-07-21',
                    rating: 4,
                    comment: 'The food was excellent.',
                },
                {
                    id: 19,
                    date: '2017-07-21',
                    rating: 2,
                    comment: 'The food was excellent.',
                },
            ],
            pagination: {
                total_count: 250,
            },
        });
        return;
    }
    if (
        req.method === 'GET' &&
        req.url.startsWith('/restaurants/') &&
        req.url.includes('/reviews')
    ) {
        res.jsonp({
            reviews: [
                {
                    id: 10,
                    date: '2017-07-21',
                    rating: 4,
                    comment: 'The food was excellent.',
                    ownerReply: 'thanks for your visit',
                },
                {
                    id: 19,
                    date: '2017-07-21',
                    rating: 2,
                    comment: 'The food was bad.',
                },
                {
                    id: 19,
                    date: '2017-07-21',
                    rating: 2,
                    comment: 'The food was ok.',
                },
                {
                    id: 19,
                    date: '2017-07-21',
                    rating: 2,
                    comment: 'The food was excellent!!!!',
                    ownerReply: ';-)',
                },
            ],
            pagination: {
                total_count: 250,
            },
        });
        return;
    }
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
    if (req.method === 'GET' && req.url.startsWith('/restaurants?')) {
        res.jsonp({
            restaurants: res.locals.data,
            pagination: { total_count: 100 },
        });
        return;
    }
    if (req.method === 'GET' && req.url.startsWith('/users?')) {
        res.jsonp({
            users: res.locals.data,
            pagination: { total_count: 100 },
        });
        return;
    }
    if (req.method === 'GET' && req.url.startsWith('/reviews?')) {
        res.jsonp({
            reviews: res.locals.data,
            pagination: { total_count: 100 },
        });
        return;
    }
    if (req.method === 'POST' && req.url === '/users') {
        res.jsonp({
            user: { ...res.locals.data, role: 'User' },
            token: res.locals.data.id,
        });
        return;
    }
    if (req.method === 'POST' && req.url === '/restaurants') {
        const restaurant = res.locals.data;
        const authHeader = req.headers.authorization;
        const userId = authHeader.split('Bearer ')[1];
        restaurant.ownerId = Number(userId);
        // res.jsonp({
        //     restaurant,
        // });
        res.status(200).end();
        return;
    }

    if (
        req.method === 'GET' &&
        req.url.split('/').length === 3 &&
        req.url.startsWith('/restaurants/')
    ) {
        res.jsonp({
            restaurant: { ...res.locals.data },
            reviews: db.reviews.slice(0, 10),
            highestReview: db.reviews[100],
            lowestReview: db.reviews[101],
        });
        return;
    }
    return orender(req, res);
};

// Use default router
server.use(router);
// server.use('/api/v1', router);
server.listen(8080, () => {
    console.log('JSON Server is running');
});
