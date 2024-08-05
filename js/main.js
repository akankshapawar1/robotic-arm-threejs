let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
let renderer = new THREE.WebGLRenderer({ antialias: true });
let controls = new THREE.OrbitControls(camera, renderer.domElement);

// Config
camera.position.z = 300;
camera.position.y = 140;
camera.position.x = 100;

renderer.setClearColor("#252525");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Lighting
let light = new THREE.AmbientLight(0xaaaaaa); // Soft white light
scene.add(light);

// Add GridHelper to the scene
const gridHelper = new THREE.GridHelper(200, 10);
scene.add(gridHelper);

// Experiment here
let angles = { a1: 0, a2: 0 }; // Initial angles
let manipulator = new ManipulatorTest();
console.log(manipulator);

scene.add(manipulator.revJoin1);

// Function to update the manipulator based on angles
function updateManipulator() {
  manipulator.setAngle(angles);
  renderer.render(scene, camera);
}

// Set up button event listeners
document.getElementById('joint1-increase').addEventListener('click', function() {
  angles.a1 = Math.min(90, angles.a1 + 5); // Increase angle, max 90 degrees
  document.getElementById('joint1-angle').value = angles.a1;
  updateManipulator();
});

document.getElementById('joint1-decrease').addEventListener('click', function() {
  angles.a1 = Math.max(-90, angles.a1 - 5); // Decrease angle, min -90 degrees
  document.getElementById('joint1-angle').value = angles.a1;
  updateManipulator();
});

document.getElementById('joint2-increase').addEventListener('click', function() {
  angles.a2 = Math.min(90, angles.a2 + 5); // Increase angle, max 90 degrees
  document.getElementById('joint2-angle').value = angles.a2;
  updateManipulator();
});

document.getElementById('joint2-decrease').addEventListener('click', function() {
  angles.a2 = Math.max(-90, angles.a2 - 5); // Decrease angle, min -90 degrees
  document.getElementById('joint2-angle').value = angles.a2;
  updateManipulator();
});

// Save button event listener
document.getElementById('save-button').addEventListener('click', function() {
  const filename = prompt('Enter the filename to save joint angles:', 'joint_angles.txt');
  if (filename) {
    const fileContent = `Joint 1 Angle: ${angles.a1} degrees\nJoint 2 Angle: ${angles.a2} degrees`;
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, filename);
  }
});

function render() {
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
}

render();
