const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

const camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 50, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, true);

const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
light.intensity = 0.7;

const sun = BABYLON.MeshBuilder.CreateSphere("sun", { diameter: 5 }, scene);
sun.material = new BABYLON.StandardMaterial("sunMat", scene);
sun.material.emissiveColor = new BABYLON.Color3(1, 0.5, 0);

const planetData = [
  { name: "mercury", diameter: 0.5, distance: 6, color: new BABYLON.Color3(0.7, 0.7, 0.7) },
  { name: "venus", diameter: 0.9, distance: 8, color: new BABYLON.Color3(1, 0.7, 0.3) },
  { name: "earth", diameter: 1, distance: 10, color: new BABYLON.Color3(0.3, 0.5, 1) },
  { name: "mars", diameter: 0.7, distance: 12, color: new BABYLON.Color3(1, 0.3, 0.3) },
  { name: "jupiter", diameter: 2, distance: 15, color: new BABYLON.Color3(0.8, 0.5, 0.3) },
  { name: "saturn", diameter: 1.8, distance: 18, color: new BABYLON.Color3(0.9, 0.8, 0.6) },
  { name: "uranus", diameter: 1.4, distance: 21, color: new BABYLON.Color3(0.6, 0.8, 1) },
  { name: "neptune", diameter: 1.3, distance: 24, color: new BABYLON.Color3(0.3, 0.3, 1) }
];

const planets = planetData.map(data => {
  const planet = BABYLON.MeshBuilder.CreateSphere(data.name, { diameter: data.diameter }, scene);
  planet.position.x = data.distance;
  planet.material = new BABYLON.StandardMaterial(`${data.name}Mat`, scene);
  planet.material.diffuseColor = data.color;
  return { mesh: planet, distance: data.distance };
});

let isRotating = true;

scene.registerBeforeRender(() => {
  if (isRotating) {
    planets.forEach((planet, index) => {
      const speed = 0.001 * (index + 1);
      planet.mesh.position.x = Math.cos(Date.now() * speed) * planet.distance;
      planet.mesh.position.z = Math.sin(Date.now() * speed) * planet.distance;
    });
  }
});

engine.runRenderLoop(() => {
  scene.render();
});

const socket = new WebSocket("ws://localhost:8765");

socket.onopen = () => {
  console.log("Connected to WebSocket server.");
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("Received data:", data);

  if (data.palmDetected) {
    isRotating = false; // Stop rotation if palm detected
  } else {
    isRotating = true;
  }

  if (data.zoomDistance) {
    const zoomFactor = 1 + (1 / (data.zoomDistance * 20));
    camera.radius = BABYLON.Scalar.Lerp(camera.radius, 50 * zoomFactor, 0.1);
  }
};

window.addEventListener("resize", () => engine.resize());
