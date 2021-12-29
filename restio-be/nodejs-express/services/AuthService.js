/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
 * Logs user into the system
 *
 * userCredentials UserCredentials A JSON object containing user credentials
 * returns UserAuth
 * */
const login = ({ body: userCredentials }) =>
    new Promise(async (resolve, reject) => {
        try {
            if (!userCredentials?.name || !userCredentials?.password) {
                reject(Service.rejectResponse('Invalid input', 500));
            }
            if (
                userCredentials?.name === 'user' &&
                userCredentials?.password === 'user'
            ) {
                resolve(
                    Service.successResponse({
                        token: 'token',
                        user: {
                            role: 'User',
                            name: 'John Doe',
                            id: 10,
                            email: 'user@example.com',
                        },
                    })
                );
            }
            reject(Service.rejectResponse('Invalid credentials', 500));
        } catch (e) {
            reject(
                Service.rejectResponse(
                    e.message || 'Invalid input',
                    e.status || 405
                )
            );
        }
    });
/**
 * Logs out current logged in user
 *
 * no response value expected for this operation
 * */
const logout = () =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(Service.successResponse({}));
        } catch (e) {
            reject(
                Service.rejectResponse(
                    e.message || 'Invalid input',
                    e.status || 405
                )
            );
        }
    });
/**
 * Sign up a new User
 *
 * userSignUpCredentials UserSignUpCredentials A JSON object containing user credentials
 * returns UserAuth
 * */
const signUp = ({ userSignUpCredentials }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(
                Service.successResponse({
                    userSignUpCredentials,
                })
            );
        } catch (e) {
            reject(
                Service.rejectResponse(
                    e.message || 'Invalid input',
                    e.status || 405
                )
            );
        }
    });

module.exports = {
    login,
    logout,
    signUp,
};
