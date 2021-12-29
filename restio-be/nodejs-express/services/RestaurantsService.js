/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Delete a restaurant.
*
* restaurantId Integer The ID of the restaurant.
* no response value expected for this operation
* */
const deleteRestaurant = ({ restaurantId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        restaurantId,
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
* Returns a restaurant by id.
*
* restaurantId Integer The ID of the restaurant to return.
* returns RestaurantDetails
* */
const getRestaurantById = ({ restaurantId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        restaurantId,
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
* Returns the sorted list (by average rating) of restaurants that the authenticated user has permission to see.
*
* minRating Integer Filter applied to average rating of restaurants. Only restaurants with an average rating >= to minRating are returned. (optional)
* Underscorepage Integer The page index to return. (optional)
* Underscorelimit Integer The number of records to return in paginated response. (optional)
* filter Restaurant  (optional)
* sort String Field on which to sort, prefixed with '-' to indicate descending order (optional)
* returns Object
* */
const getRestaurants = ({ minRating, Underscorepage, Underscorelimit, filter, sort }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        minRating,
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
* Create a restaurant. Owner role only.
*
* restaurantNew RestaurantNew A JSON object containing the new restaurant
* no response value expected for this operation
* */
const postRestaurant = ({ restaurantNew }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        restaurantNew,
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
* Update a restaurant.
*
* restaurantId Integer The ID of the restaurant.
* restaurantBase RestaurantBase A JSON object containing the new restaurant
* no response value expected for this operation
* */
const updateRestaurant = ({ restaurantId, restaurantBase }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        restaurantId,
        restaurantBase,
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
  deleteRestaurant,
  getRestaurantById,
  getRestaurantPendingReviews,
  getRestaurantReviews,
  getRestaurants,
  postRestaurant,
  postReview,
  updateRestaurant,
};
