const jwt = require('jsonwebtoken');
const Message = require('../models/Message');
const dotenv = require('dotenv');

dotenv.config();
const jwtSecret = process.env.JWT_SECRET; 

async function getUserDataFromRequest(req) {
    return new Promise((resolve, reject) => {
        const token = req.cookies?.token;
        if (token) {
            jwt.verify(token, jwtSecret, {}, (err, userData) => {
                if (err) return reject(err); 
            });
        } else {
            reject('No Token');
        }
    });
}

async function getMessages(req, res) {
    try {
        const { userId } = req.params;
        const userData = await getUserDataFromRequest(req);
        const ourUserId = userData.userId;

        const messages = await Message.find({
            sender: { $in: [userId, ourUserId] },
            recipient: { $in: [userId, ourUserId] },
        }).sort({ createdAt: 1 });

        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching messages.' });
    }
}

module.exports = { getMessages };