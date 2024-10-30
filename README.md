# Solar System Interaction with WebSocket and Hand Gesture Control 🌌

This project is a 3D interactive solar system simulation using Babylon.js, designed to showcase the planets and their orbits around the sun. It also includes a WebSocket-based hand gesture recognition feature to control the simulation's rotation and zoom.

## 🖥️ Features

- **3D Solar System**: Realistic rendering of the sun and planets with dynamic orbits.
- **WebSocket Integration**: Connects to a Python server to receive hand gesture data.
- **Hand Gesture Control**: Stop the planets' rotation and zoom in/out based on gesture inputs.
- **Responsive Design**: Fullscreen view with optimized canvas display.

## 📂 File Structure

- `index.html` - HTML file to set up the webpage and link scripts and styles.
- `script.js` - JavaScript file with Babylon.js code to render the scene and handle WebSocket messages.
- `style.css` - CSS file to manage the display, centering the canvas on screen.
- `server.py` - Python server that handles WebSocket connections, sending gesture data to control the scene.

## ⚙️ Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/faezedrx/SolarSystem_WebSocket_Hand_Gesture_Control.git
   cd SolarSystem_WebSocket_Hand_Gesture_Control
   ```
2. Install the required dependencies for the WebSocket server:
   ```bash
   pip install websockets
   ```
3. Run the WebSocket server:
  ```bash
  python server.py
  ```
4. Open `index.html` in a web browser to view the solar system simulation.


##  🧩 How It Works

. **Rendering** : Babylon.js creates a 3D scene with the sun and planets. The planets rotate around the sun with adjustable speed.
. **Gesture Control**: The WebSocket server (`server.py`) sends gesture data (e.g., palm detection and zoom distance). Based on the received data:
  - **Palm Detection**: Stops or resumes the planets' rotation.
  - **Zoom Control**: Adjusts the camera's zoom level.


## 💡 Technologies Used
- Babylon.js for 3D rendering
- WebSockets for real-time communication
- HTML/CSS for webpage structure and styling
- Python for the WebSocket server

# Enjoy exploring the solar system! 🌍🪐



   
   
