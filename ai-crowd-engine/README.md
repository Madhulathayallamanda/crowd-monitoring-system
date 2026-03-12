# AI Crowd Detection Engine

This module performs crowd detection using computer vision.
It processes video frames and detects people using the YOLO object detection model.

The detected crowd count is sent to the backend API for further processing and visualization.

## Features

• Real-time person detection
• Crowd counting using YOLO object detection
• Integration with backend API
• Video stream processing using OpenCV

## Technologies Used

Python
OpenCV
YOLO (Ultralytics)

## Files

detect.py – Main detection script

## How It Works

1. The system loads the YOLO detection model.
2. Video frames are processed in real time.
3. Each detected person is counted.
4. Crowd data is sent to the backend API.

## Running the AI Engine

Install dependencies:

pip install -r requirements.txt

Run detection:

python detect.py
