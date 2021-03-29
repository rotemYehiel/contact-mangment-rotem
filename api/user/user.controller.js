const userService = require('./user.service');

const login = async (request, response) => {
    const credentials = { ...request.body };
    userService.login(credentials).then(result => {
        response.status(200).json(result);
    })
}

const signUp = async (request, response) => {
    const credentials = { ...request.body };
    userService.signUp(credentials).then(result => {
        response.status(201).json(result);
    })
}

module.exports = {
    login,
    signUp
}