// Import the 'ws' module to create and manage WebSocket connections
const ws = require('ws');
// Import 'jsonwebtoken' to verify JWT tokens
const jwt = require('jsonwebtoken'); 
// Load environment variables from a .env file
const dotenv = require('dotenv');
// Import the Message model for saving and retrieving messages from the database
const Message = require('../models/Message');
// Import 'fs' module to manage file system operations
const fs = require('fs');

// Load environment variables (e.g., JWT_SECRET) into process.env
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

// Function to create a WebSocket server on an existing HTTP server
function createWebSocketServer(server) {
    // Initialize a WebSocket server instance
    const wss = new ws.WebSocketServer({ server });
    
    // Listen for a new client connection to the WebSocket server
    wss.on('connection', (connection, req) => {
        // Parse cookies from the request header to retrieve token information
        const cookies = req.headers.cookie;
        let filename = null;

        if (cookies) {
            // Find the JWT token in the cookies if it exists
            const tokenCookieString = cookies.split(';').find(str => str.trim().startsWith('token='));
            if (tokenCookieString) {
                const token = tokenCookieString.split('=')[1];
                if (token) {
                    // Verify the JWT token and extract user data
                    jwt.verify(token, jwtSecret, {}, (err, userData) => {
                        if (err) {
                            console.error("JWT verification error:", err);
                            return connection.terminate(); // Close connection on verification failure
                        }
                        const { userId, username } = userData;
                        connection.userId = userId;
                        connection.username = username;
                        // Notify all clients of online users once a new connection is established
                        notifyAllClientsAboutOnlineUsers();
                    });
                }
            }
        }

        // Set connection status to alive for tracking connection health
        connection.isAlive = true;
        // Timer to ping the client periodically to maintain an active connection
        connection.timer = setInterval(() => {
            connection.ping(); // Send a ping to the client
            connection.deathTimer = setTimeout(() => {
                connection.isAlive = false;
                clearInterval(connection.timer); // Stop pinging the client
                connection.terminate(); // Close the connection if client is unresponsive
                notifyAllClientsAboutOnlineUsers(); // Update online status for other clients
                console.log('Dead'); // Log if the connection has been terminated
            }, 1000); // Wait for 1 second for pong response before terminating

        }, 5000); // Ping every 5 seconds

        // When a 'pong' response is received, clear the death timer to keep the connection alive
        connection.on('pong', () => {
            clearTimeout(connection.deathTimer);
        });

        // Listen for incoming messages from the client
        connection.on('message', async (message) => {
            const messageData = JSON.parse(message.toString()); // Parse the incoming message as JSON
            const { recipient, text, file } = messageData; // Destructure message properties
            
            if (file) {
                console.log({file});
                // Extract file extension from the file name
                const parts = file.name.split('.');
                const ext = parts[parts.length - 1];
                // Generate a unique filename using the current timestamp
                filename = `${Date.now()}.${ext}`;
                // Specify the file path for saving the file
                const path = `${__dirname}/uploads/${filename}`;
                // Decode base64 data and save to specified path

                // Ensure 'uploads' directory exists
                const uploadDir = `${__dirname}/uploads`;
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
                
                const bufferData = Buffer.from(file.data.split(',')[1], 'base64');
                
                fs.writeFile(path, bufferData, (err) => {
                    if (err) {
                        console.error('Error saving the file:', err); // Log any error while saving
                    } else {
                        console.log('File Saved at: ', path); // Confirm successful save
                    }
                });
            }

            // Save message to database if it includes either text or file
            if (recipient && (text || file)) {
                const MessageDoc = await Message.create({
                    sender: connection.userId,
                    recipient,
                    text,
                    file: file ? filename : null
                });

                // Notify both sender and recipient about the new message
                [...wss.clients]
                .filter(c => c.userId === recipient || c.userId === connection.userId)
                .forEach(c => c.send(JSON.stringify({
                    text, 
                    sender: connection.userId, 
                    recipient,
                    file: file ? filename : null,
                    _id: MessageDoc._id  
                })));
            }
        });
    });

    // Function to notify all connected clients about currently online users
    function notifyAllClientsAboutOnlineUsers() {
        const onlineUsers = [...wss.clients].map(client => ({
            userId: client.userId,
            username: client.username
        }));

        // Send a list of online users to every connected client
        [...wss.clients].forEach(client => {
            client.send(JSON.stringify({
                online: onlineUsers
            }));
        });
    }
}

// Export the function for use in other parts of the application
module.exports = createWebSocketServer;
