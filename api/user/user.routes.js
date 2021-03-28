const express = require('express');
const { login, signUp } = require('./user.controller');
const router = express.Router();

router.post('/', login);
router.post('/addUser', signUp);

module.exports = router;