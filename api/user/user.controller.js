const userService = require('./user.service');

const login = async (request, response) => {
    const credentials = {
        UserName: request.body['UserName'],
        Password: request.body['Password']
    };
    userService.login(credentials).then(result => {
        response.status(200).json(result);
    })
}

module.exports = {
    login
}