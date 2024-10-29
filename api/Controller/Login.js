const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserActivation = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;  // Ensure you have your JWT secret in .env file

async function Login(req, res) {
    const { username, password } = req.body;
    const foundUser = await UserActivation.findOne({ username });

    if (!foundUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    const payload = {
        userId: foundUser._id,  // Fixed from createdUser to foundUser
        username: foundUser.username,
        role: 'user',  // Add role or other fields as needed
    };

    const passOk = bcrypt.compareSync(password, foundUser.password);
    if (passOk) {
        jwt.sign(payload, jwtSecret, {}, (err, token) => {
            if (err) {
                return res.status(500).json({ message: 'Error generating token' });
            }
            res.cookie('token', token, { sameSite: 'none', secure: true })
               .status(201)
               .json({
                   id: foundUser._id,
                   username: foundUser.username,
               });
        });
    } else {
        return res.status(401).json({ message: 'Incorrect password' });
    }
}

module.exports = {Login}; 