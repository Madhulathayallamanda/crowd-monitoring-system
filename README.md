# AI Crowd Monitoring System

AI Crowd Monitoring System is a full-stack application that detects and monitors crowd density using computer vision and displays the information through a web dashboard.

The system uses an AI detection engine to count people from video frames and sends the crowd data to a backend API. A React dashboard visualizes the crowd information in real time.

---

## System Architecture

AI Engine (Python + YOLO)
↓
Backend API (Node.js + Express)
↓
Database (MongoDB)
↓
Frontend Dashboard (React)

---

## Project Structure

crowd-monitoring-system
│
├ ai-crowd-engine
│ └ detect.py
│
├ crowd-monitoring-server
│ ├ package.json
│ └ server
│ ├ controllers
│ ├ models
│ ├ routes
│ └ server.js
│
├ crowd-monitoring-client
│ ├ public
│ ├ src
│ ├ package.json
│ └ package-lock.json
│
└ README.md

---

## Features

• Real-time crowd detection
• Person counting using YOLO object detection
• Backend API for processing crowd data
• React dashboard to monitor locations
• Authentication and protected routes
• Modular full-stack architecture

---

## Technologies Used

### Frontend

React
React Router
Axios

### Backend

Node.js
Express.js

### AI Module

Python
OpenCV
YOLO Object Detection

### Database

MongoDB

---

## How the System Works

1. The AI engine processes video frames and detects people.
2. The system counts the number of detected individuals.
3. Crowd data is sent to the backend server through an API.
4. The backend processes and stores crowd information.
5. The React dashboard displays real-time crowd statistics.

---

## Running the Project

### Run Backend Server

cd crowd-monitoring-server
npm install
npm start

### Run Frontend Client

cd crowd-monitoring-client
npm install
npm start

### Run AI Engine

cd ai-crowd-engine
python detect.py

---

## Future Improvements

• Integration with live CCTV streams
• Real-time crowd density heatmaps
• Alert system for overcrowded locations
• Cloud deployment for scalability

---

## Author

Yallamanda Madhulatha
B.Tech Computer Science Engineering
Anurag University
