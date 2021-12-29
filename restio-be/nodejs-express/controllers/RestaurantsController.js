/**
 * The RestaurantsController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/RestaurantsService');
const deleteRestaurant = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteRestaurant);
};

const getRestaurantById = async (request, response) => {
  await Controller.handleRequest(request, response, service.getRestaurantById);
};

const getRestaurantPendingReviews = async (request, response) => {
  await Controller.handleRequest(request, response, service.getRestaurantPendingReviews);
};

const getRestaurantReviews = async (request, response) => {
  await Controller.handleRequest(request, response, service.getRestaurantReviews);
};

const getRestaurants = async (request, response) => {
  await Controller.handleRequest(request, response, service.getRestaurants);
};

const postRestaurant = async (request, response) => {
  await Controller.handleRequest(request, response, service.postRestaurant);
};

const postReview = async (request, response) => {
  await Controller.handleRequest(request, response, service.postReview);
};

const updateRestaurant = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateRestaurant);
};


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
