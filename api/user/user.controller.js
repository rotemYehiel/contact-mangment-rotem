const userService = require('./user.service');

const login = async (request, response) => {
    console.log("request login:", request)
    const credentials = { ...request.body };
    userService.login(credentials).then(result => {
        console.log("result:", result)
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