// controllers/profileController.js
const jwt = require('jsonwebtoken'); // Make sure to import jwt
const dotenv = require('dotenv');

dotenv.config();
const jwtSecret = process.env.JWT_SECRET; // Ensure your JWT secret is available

async function getProfile(req, res) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, jwtSecret, (err, userData) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        res.json(userData);
    });
}

module.exports = { getProfile };
