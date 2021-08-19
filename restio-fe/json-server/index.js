// index.js
const generateRestaurants = (restaurants) => {
    for (let i = 0; i < 1000; i++) {
        restaurants.push({
            id: i,
            name: `resto${i}`,
            ownerId: i - (i % 3) + 1,
            avg_rating: i % 5,
            pendingReplies: i,
        });
    }
};

const generateReviews = (reviews) => {
    const comments = ['ok', 'not bad', 'would go again', 'terrible'];
    for (let i = 0; i < 200; i++) {
        reviews.push({
            id: i,
            date: '2017-01-01',
            rating: i % 5,
            comment: `${comments[i % comments.length]}`,
            ownerReply: i % 2 === 0 ? ' thanks for the feedback' : undefined,
        });
    }
};

module.exports = () => {
    const data = { users: [], restaurants: [], reviews: [] };
    const userRoles = ['User', 'Owner', 'Admin'];
    // Create 1000 users
    for (let i = 0; i < 1000; i++) {
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
