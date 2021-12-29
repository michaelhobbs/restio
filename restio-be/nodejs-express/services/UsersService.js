/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Delete a user.
*
* userId Integer The ID of the user.
* no response value expected for this operation
* */
const deleteUser = ({ userId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userId,
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
* Gets all Users. Paginated.
*
* Underscorepage Integer The page index to return. (optional)
* Underscorelimit Integer The number of records to return in paginated response. (optional)
* filter User  (optional)
* sort String Field on which to sort, prefixed with '-' to indicate descending order (optional)
* returns Object
* */
const getUsers = ({ Underscorepage, Underscorelimit, filter, sort }) => new Promise(
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
* Logs user into the system
*
* userCredentials UserCredentials A JSON object containing user credentials
* returns UserAuth
* */
const loginUser = ({ userCredentials }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userCredentials,
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
* Logs out current logged in user session
*
* no response value expected for this operation
* */
const logoutUser = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
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
* Create a new User
*
* userSignUpCredentials UserSignUpCredentials A JSON object containing user credentials
* returns UserAuth
* */
const postUser = ({ userSignUpCredentials }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userSignUpCredentials,
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
* Update a user.
*
* userId Integer The ID of the user.
* user User A JSON object containing the User
* no response value expected for this operation
* */
const updateUser = ({ userId, user }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userId,
        user,
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
  deleteUser,
  getUsers,
  loginUser,
  logoutUser,
  postUser,
  updateUser,
};
