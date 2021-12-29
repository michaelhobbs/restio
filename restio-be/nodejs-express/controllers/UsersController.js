/**
 * The UsersController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic reoutes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/UsersService');
const deleteUser = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteUser);
};

const getUsers = async (request, response) => {
  await Controller.handleRequest(request, response, service.getUsers);
};

const loginUser = async (request, response) => {
  await Controller.handleRequest(request, response, service.loginUser);
};

const logoutUser = async (request, response) => {
  await Controller.handleRequest(request, response, service.logoutUser);
};

const postUser = async (request, response) => {
  await Controller.handleRequest(request, response, service.postUser);
};

const updateUser = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateUser);
};


module.exports = {
  deleteUser,
  getUsers,
  loginUser,
  logoutUser,
  postUser,
  updateUser,
};
