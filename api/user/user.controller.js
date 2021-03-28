const userService = require('./user.service');

const login = async (request, response) => {
    // const credentials = {
    //     UserName: request.body['UserName'],
    //     Password: request.body['Password']
    // };
    const credentials = {
        UserName: request.body.name,
        Password: request.body.password
    };
    userService.login(credentials).then(result => {
        response.status(200).json(result);
    })
}

const signUp = async (request, response) => {
    const credentials = {
        UserName: request.body.name,
        Password: request.body.password
    };
    userService.signUp(credentials).then(result => {
        response.status(201).json(result);
    })
}

module.exports = {
    login,
    signUp
}