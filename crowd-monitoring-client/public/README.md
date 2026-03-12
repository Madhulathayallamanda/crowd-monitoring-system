# Crowd Monitoring Client

This is the **frontend dashboard** for the **AI Crowd Monitoring System**.
The client application visualizes crowd density data detected by the AI engine and processed by the backend server.

The dashboard allows users to monitor crowd statistics for different locations in real time.

---

## Features

* Dashboard to monitor crowd activity
* Real-time updates from backend API
* Login system with protected routes
* Displays crowd counts for monitored locations
* Simple and responsive interface

---

## Technologies Used

Frontend Framework
React

Libraries
React Router
Axios

Development Tools
Node.js
npm

---

## Project Structure

crowd-monitoring-client
│
├ public
│ ├ index.html
│ ├ manifest.json
│ └ robots.txt
│
├ src
│ ├ components
│ │ └ PrivateRoute.js
│ │
│ ├ pages
│ │ ├ Dashboard.js
│ │ └ Login.js
│ │
│ ├ App.js
│ ├ index.js
│ ├ App.css
│ └ index.css
│
├ package.json
└ package-lock.json

---

## Getting Started

This project was bootstrapped using Create React App.

### Install Dependencies

npm install

### Run Development Server

npm start

Open the application in your browser:

http://localhost:3000

The page will reload when you make changes.

---

### Run Tests

npm test

Runs the test runner in interactive watch mode.

---

### Build for Production

npm run build

Builds the application for production in the `build` folder.

The build is optimized and minified for deployment.

---

### Eject Configuration

npm run eject

This command exposes the underlying configuration files.
Note: this is irreversible.

---

## Integration with Backend

The client communicates with the backend API to retrieve crowd monitoring data.

Backend server repository:

crowd-monitoring-server

---

## Related Modules

This frontend works together with the following components:

AI Detection Engine
Python + YOLO

Backend API
Node.js + Express

Together these modules form the **AI Crowd Monitoring System**.
