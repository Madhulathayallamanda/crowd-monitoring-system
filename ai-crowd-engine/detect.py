import cv2
import requests
import sys
from ultralytics import YOLO

# Get location + video from command line
if len(sys.argv) < 3:
    print("Usage: python detect.py <LocationName> <VideoFile>")
    sys.exit()

location_name = sys.argv[1]
video_file = sys.argv[2]

print(f"Starting AI detection for {location_name}")

model = YOLO("yolov8n.pt")
cap = cv2.VideoCapture(video_file)

BACKEND_URL = "http://localhost:5000/api/ai/crowd-data"

while True:
    ret, frame = cap.read()
    if not ret:
        break

    results = model(frame, verbose=False)

    person_count = 0

    for r in results:
        for box in r.boxes:
            if int(box.cls[0]) == 0:
                person_count += 1
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

    try:
        requests.post(
            BACKEND_URL,
            json={
                "location": location_name,
                "count": person_count
            }
        )
    except Exception as e:
        print("Backend not reachable:", e)

    cv2.putText(
        frame,
        f"{location_name} Count: {person_count}",
        (20, 50),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 0, 255),
        2
    )

    cv2.imshow(f"{location_name} Camera", frame)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()
