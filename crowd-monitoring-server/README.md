# Crowd Monitoring Server

This module provides the **backend API** for the AI Crowd Monitoring System.
It receives crowd data from the AI detection engine and serves the processed data to the React dashboard.

The backend manages users, locations, events, and crowd information through REST APIs and supports real-time communication.

---

## Features

* REST API for crowd monitoring data
* User authentication system
* Location and event management
* Real-time communication with the frontend
* Modular backend architecture

---

## Technologies Used

Backend Framework
Node.js
Express.js

Database
MongoDB

Other Tools
Socket.IO
JWT Authentication

---

## Project Structure

crowd-monitoring-server
│
├ package.json
├ package-lock.json
│
└ server
│
├ controllers
│ ├ eventController.js
│ └ locationController.js
│
├ models
│ ├ Event.js
│ ├ Location.js
│ └ User.js
│
├ routes
│ ├ aiRoutes.js
│ ├ authRoutes.js
│ ├ eventRoutes.js
│ └ locationRoutes.js
│
├ middlewares
├ services
├ sockets
├ utils
└ server.js

---

## API Responsibilities

The backend performs the following tasks:

1. Receives crowd detection data from the AI engine.
2. Stores crowd information in the database.
3. Provides API endpoints for the frontend dashboard.
4. Handles authentication and authorization.
5. Sends real-time updates to connected clients.

---

## Running the Server

Install dependencies:

npm install

Start the backend server:

npm start

The server will start on the configured port (commonly **5000**).

---

## API Communication Flow

AI Detection Engine
→ Sends crowd data to backend API

Backend Server
→ Processes and stores the data

React Dashboard
→ Requests and displays crowd information

---

## Related Modules

AI Detection Engine
Python + YOLO

Frontend Client
React Dashboard

Together these modules form the **AI Crowd Monitoring System**.
