/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Delete a review.
*
* reviewId Integer The ID of the review.
* no response value expected for this operation
* */
const deleteReview = ({ reviewId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        reviewId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Returns a list of unanswered reviews for a restaurant.
*
* restaurantId Integer The ID of the restaurant.
* Underscorepage Integer The page index to return. (optional)
* Underscorelimit Integer The number of records to return in paginated response. (optional)
* returns PendingReviews
* */
const getRestaurantPendingReviews = ({ restaurantId, Underscorepage, Underscorelimit }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        restaurantId,
        Underscorepage,
        Underscorelimit,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Returns a list of reviews for a restaurant.
*
* restaurantId Integer The ID of the restaurant.
* Underscorepage Integer The page index to return. (optional)
* Underscorelimit Integer The number of records to return in paginated response. (optional)
* returns Reviews
* */
const getRestaurantReviews = ({ restaurantId, Underscorepage, Underscorelimit }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        restaurantId,
        Underscorepage,
        Underscorelimit,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Gets all Reviews. Paginated.
*
* Underscorepage Integer The page index to return. (optional)
* Underscorelimit Integer The number of records to return in paginated response. (optional)
* filter Review  (optional)
* sort String Field on which to sort, prefixed with '-' to indicate descending order (optional)
* returns Object
* */
const getReviews = ({ Underscorepage, Underscorelimit, filter, sort }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        Underscorepage,
        Underscorelimit,
        filter,
        sort,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Create an Owner reply for a review.
*
* reviewId Integer The ID of the review.
* reply Reply A JSON object containing owner reply
* no response value expected for this operation
* */
const postReply = ({ reviewId, reply }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        reviewId,
        reply,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Create a review for a restaurant.
*
* restaurantId Integer The ID of the restaurant.
* reviewBase ReviewBase A JSON object containing user review
* no response value expected for this operation
* */
const postReview = ({ restaurantId, reviewBase }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        restaurantId,
        reviewBase,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Update a review.
*
* reviewId Integer The ID of the review.
* review Review A JSON object containing the Review
* no response value expected for this operation
* */
const updateReview = ({ reviewId, review }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        reviewId,
        review,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  deleteReview,
  getRestaurantPendingReviews,
  getRestaurantReviews,
  getReviews,
  postReply,
  postReview,
  updateReview,
};
