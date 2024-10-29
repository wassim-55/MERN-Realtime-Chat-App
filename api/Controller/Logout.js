const express = require('express');
const cookieParser = require('cookie-parser');

async function Logout(req, res) {
    res.cookie('token', '', {sameSite:'none', secure: true}).json('ok');
}

module.exports = {Logout} 