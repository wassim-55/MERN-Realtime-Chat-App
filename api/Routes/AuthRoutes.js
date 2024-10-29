const express = require('express');
const { register} = require('../Controller/Auth');
const { Login} = require('../Controller/Login');
const {Logout} = require('../Controller/Logout');
const {getProfile} = require('../Controller/Profile');
const {getMessages} = require('../Controller/Message');
const {getPeople} = require('../Controller/User');
const router = express.Router();

// Register route
router.post('/register', register);
router.post('/login', Login);
router.post('/logout', Logout);
router.get('/profile', getProfile);
router.get('/messages/:userId', getMessages);
router.get('/people', getPeople);

module.exports = router;
