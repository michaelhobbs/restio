/**
 * The ReviewsController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/ReviewsService');
const deleteReview = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteReview);
};

const getRestaurantPendingReviews = async (request, response) => {
  await Controller.handleRequest(request, response, service.getRestaurantPendingReviews);
};

const getRestaurantReviews = async (request, response) => {
  await Controller.handleRequest(request, response, service.getRestaurantReviews);
};

const getReviews = async (request, response) => {
  await Controller.handleRequest(request, response, service.getReviews);
};

const postReply = async (request, response) => {
  await Controller.handleRequest(request, response, service.postReply);
};

const postReview = async (request, response) => {
  await Controller.handleRequest(request, response, service.postReview);
};

const updateReview = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateReview);
};


module.exports = {
  deleteReview,
  getRestaurantPendingReviews,
  getRestaurantReviews,
  getReviews,
  postReply,
  postReview,
  updateReview,
};
