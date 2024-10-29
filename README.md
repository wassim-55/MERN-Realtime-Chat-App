hat Application

A full-stack, real-time chat application built with the MERN stack (MongoDB, Express.js, React, and Node.js) and WebSocket for real-time communication. This app supports user authentication, direct messaging, file sharing, and online/offline status indicators.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Usage Instructions](#usage-instructions)
- [Project Structure](#project-structure)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure registration and login using JWTs.
- **Real-Time Messaging**: Direct messaging with WebSocket for instant updates.
- **File Sharing**: Supports uploading and viewing image files within chats.
- **User Status**: Real-time online/offline status for active users.
- **Responsive UI**: A clean, responsive design for desktop and mobile views.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm
- MongoDB (either locally installed or a cloud-based MongoDB Atlas instance)
- Optional: GitHub account for version control

## Installation

### Clone the Repository

Clone the repository to your local machine and navigate into the project folder.

### Install Server Dependencies

Install the necessary server dependencies.

### Install Client Dependencies (If Client is Separate)

If the client is in a separate directory, navigate there and install the dependencies.

## Environment Variables

Create a `.env` file in the root directory and add environment variables


## Running the Application

1. **Run the Server**

Start the server by executing the command for your server file.

2. **Run the Frontend (if separate)**

If the frontend is located in a separate client directory, navigate there and start the client.

## API Endpoints

- **/profile**: Retrieves user profile information using a JWT from cookies.
- **/messages/:userId**: Fetches chat messages for the specified user.
- **/uploads**: Serves uploaded files to the client.

## Usage Instructions

1. Register or log in to access the chat functionality.
2. Select a user to initiate a conversation.
3. Use the message input to send text or attach files.
4. Monitor the online/offline status of contacts in real-time.

## Project Structure

├── api
│   ├── controllers
│   │   ├── Auth.js             # Handles authentication logic
│   │   ├── Login.js            # Handles user login logic
│   │   ├── Logout.js           # Handles user logout logic
│   │   ├── Message.js          # Manages messaging logic
│   │   ├── Profile.js          # Manages user profile data
│   │   └── User.js             # Manages user data
│   ├── models
│   │   ├── User.js              # User schema
│   │   └── Message.js           # Message schema
│   ├── routes
│   │   └── AuthRoutes.js        # Authentication routes
│   └── utils
│       ├── websocketServer.js    # WebSocket server implementation
│       └── uploads               # Directory for uploaded files
├── client
│   ├── public                   # Static assets
│   └── src
│       ├── App.jsx              # Main app file
│       ├── Avatar.jsx           # User avatar component
│       ├── Chat.jsx             # Chat interface component
│       ├── Contact.jsx          # Contact list component
│       ├── Logo.jsx             # Logo component
│       ├── RegisterandLoginForm.jsx # Registration and login form
│       ├── Routes.jsx           # Application routes
│       ├── UserContext.jsx      # User context for global state management
│       ├── index.css            # Stylesheet for the application
│       └── main.jsx             # Main entry point for React
└── README.md

## Future Improvements

Consider adding the following features:

- **Cloud File Storage**: Integrate with AWS S3 or other services for cloud file storage.
- **Group Chat**: Extend functionality to support group messaging.
- **Typing Indicators**: Show when users are typing.
- **Read Receipts**: Indicate if a message has been read.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (e.g., `git checkout -b feature-branch`).
3. Make your changes.
4. Push to the branch (e.g., `git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License.

