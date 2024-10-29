const User = require('../models/User');

async function getPeople(req, res) {
    try {
        const users = await User.find({}, { '_id': 1, username: 1 });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getPeople };