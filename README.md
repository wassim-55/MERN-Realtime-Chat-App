hat Application

A full-stack, real-time chat application built with the MERN stack (MongoDB, Express.js, React, and Node.js) and WebSocket for real-time communication. This app supports user authentication, direct messaging, file sharing, and online/offline status indicators.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
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

Clone the repository from GitHub and navigate to the project directory.

### Install Server Dependencies

Install the necessary dependencies for the server.

### Install Client Dependencies (If Client is Separate)

Navigate to the client directory (if applicable) and install the necessary dependencies.

## Running the Application

1. Run the Server: Start the server by running the appropriate command.
2. Run the Frontend (if separate): If the frontend is located in a separate client directory, navigate there and start the client.

## API Endpoints

- **/profile**: Retrieves user profile information using a JWT from cookies.
- **/messages/:userId**: Fetches chat messages for the specified user.
- **/uploads**: Serves uploaded files to the client.

## Usage Instructions

- Register or log in to access the chat functionality.
- Select a user to initiate a conversation.
- Use the message input to send text or attach files.
- Monitor the online/offline status of contacts in real-time.

## Project Structure

api
├── controllers
│   ├── Auth.js              # Handles authentication logic
│   ├── Login.js             # Login functionality
│   ├── Logout.js            # Logout functionality
│   ├── Message.js           # Messaging logic
│   ├── Profile.js           # Profile management
│   ├── User.js              # User-related logic
├── routes
│   ├── AuthRoutes.js        # Authentication routes
│   ├── MessageRoutes.js     # Messaging routes
├── models
│   ├── User.js              # User schema
│   ├── Message.js           # Message schema
└── utils
    ├── websocketServer.js    # WebSocket server
        └── uploads              # Uploads directory for files

        client
        ├── public                   # Static assets
        └── src
            ├── App.jsx              # Main app file
                ├── Avatar.jsx           # Avatar component
                    ├── Chat.jsx             # Chat window component
                        ├── Contact.jsx          # Contact list component
                            ├── Logo.jsx             # Logo component
                                ├── RegisterandLoginForm.jsx # Registration and Login form
                                    ├── Routes.jsx           # App routing
                                        ├── UserContext.jsx      # Context API for user state management
                                            ├── index.css            # Stylesheet
                                                └── main.jsx             # Entry point for React

                                                ## Future Improvements

                                                Consider adding the following features:

                                                - Cloud File Storage: Integrate with AWS S3 or other services for cloud file storage.
                                                - Group Chat: Extend functionality to support group messaging.
                                                - Typing Indicators: Show when users are typing.
                                                - Read Receipts: Indicate if a message has been read.

                                                ## Contributing

                                                Contributions are welcome! To contribute:

                                                - Fork the repository.
                                                - Create a new branch (feature-branch).
                                                - Make your changes.
                                                - Push to the branch.
                                                - Open a pull request.

                                                ## License

                                                This project is licensed under the MIT License.

