const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 
const createWebSocketServer = require('../api/utils/websocketServer');
const authRoutes = require('../api/Routes/AuthRoutes');
const path = require('path');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Initialize Express app
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// CORS setup
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, 
}));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'utils', 'uploads')));

app.use(authRoutes);



// Start the server on port 4000
const server = app.listen(4000, () => {
    console.log('Server is running on port 4000');
});


createWebSocketServer(server);
