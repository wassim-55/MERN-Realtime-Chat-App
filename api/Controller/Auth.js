const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
dotenv.config();

// Add jwtSecret from environment variables or hardcode it (not recommended)
const jwtSecret = process.env.JWT_SECRET;

const bcryptSalt = bcrypt.genSaltSync(10);

async function register(req, res) {
    console.log("Register function called");  // Debug log 
    const { username, password } = req.body;
    
    try {
        // Create a new user
        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        const createdUser = await User.create({ 
            username: username, 
            password: hashedPassword,
        });

        // Log the created user to check if user is saved correctly
        console.log("User created:", createdUser);

        // Generate token
        const payload = {
            userId: createdUser._id,
            username: createdUser.username,
            role: 'user',  // Add role or other fields as needed
        };

        // Log the payload to ensure it's correct
        console.log("Payload:", payload);

        // Sign the JWT with a secret (stored in your .env file)
        jwt.sign(payload, jwtSecret, {}, (err, token) => {
            if (err) throw err;

            // Log the token to check if it's generated properly
            console.log("Token:", token);

            res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
                id: createdUser._id,
                username: createdUser.username,
            });
        });
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json("error");
    }
}


module.exports = {register}
