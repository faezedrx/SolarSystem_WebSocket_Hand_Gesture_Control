import cv2
import mediapipe as mp
import asyncio
import websockets
import json
import math

async def send_data(websocket):
    mp_hands = mp.solutions.hands
    hands = mp_hands.Hands()
    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(frame_rgb)

        palm_detected = False
        zoom_distance = None

        if results.multi_hand_landmarks:
            landmarks = results.multi_hand_landmarks[0].landmark

            # Calculate distances to assess if palm is up
            wrist = landmarks[mp_hands.HandLandmark.WRIST]
            index_base = landmarks[mp_hands.HandLandmark.INDEX_FINGER_MCP]
            pinky_base = landmarks[mp_hands.HandLandmark.PINKY_MCP]

            wrist_index_distance = math.sqrt((index_base.x - wrist.x) ** 2 + (index_base.y - wrist.y) ** 2)
            wrist_pinky_distance = math.sqrt((pinky_base.x - wrist.x) ** 2 + (pinky_base.y - wrist.y) ** 2)

            # Check if the hand is open and palm is facing the camera
            if wrist_index_distance < 0.2 and wrist_pinky_distance < 0.2:
                palm_detected = True

            # Calculate zoom distance for index and thumb
            zoom_distance = math.sqrt(
                (landmarks[mp_hands.HandLandmark.INDEX_FINGER_TIP].x - landmarks[mp_hands.HandLandmark.THUMB_TIP].x) ** 2 +
                (landmarks[mp_hands.HandLandmark.INDEX_FINGER_TIP].y - landmarks[mp_hands.HandLandmark.THUMB_TIP].y) ** 2
            )

        data = {
            "palmDetected": palm_detected,
            "zoomDistance": zoom_distance
        }
        await websocket.send(json.dumps(data))
        await asyncio.sleep(0.1)

async def handler(websocket, path):
    await send_data(websocket)

start_server = websockets.serve(handler, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
