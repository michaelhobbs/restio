// index.js
const generateRestaurants = (restaurants) => {
    for (let i = 1; i < 1001; i++) {
        restaurants.push({
            id: i,
            name: `resto${i}`,
            userId: i - (i % 3) + 1,
            ownerId: i - (i % 3) + 1,
            avg_rating: i % 5,
            pendingReplies: i,
        });
    }
};

const generateReviews = (reviews) => {
    const comments = ['ok', 'not bad', 'would go again', 'terrible'];
    for (let i = 1; i < 201; i++) {
        reviews.push({
            id: i,
            date: '2017-01-01',
            rating: i % 5,
            comment: `${comments[i % comments.length]}`,
            reply: i % 2 === 0 ? ' thanks for the feedback' : undefined,
            restaurantId: (i % 3) + 1,
        });
    }
};

module.exports = () => {
    const data = { users: [], restaurants: [], reviews: [] };
    const userRoles = ['User', 'Owner', 'Admin'];
    // Create 1000 users
    for (let i = 1; i < 1001; i++) {
        data.users.push({
            id: i,
            name: `user${i}`,
            email: `${i}@example.com`,
            role: `${userRoles[i % userRoles.length]}`,
            password: `p${i}`,
        });
    }

    generateRestaurants(data.restaurants);
    generateReviews(data.reviews);
    return data;
};
