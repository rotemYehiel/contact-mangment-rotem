const express = require('express');
const { login, signUp } = require('./user.controller');
const router = express.Router();

router.post('/addUser', signUp);
router.post('/', login);

module.exports = router;