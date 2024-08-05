let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
let renderer = new THREE.WebGLRenderer({ antialias: true });
let controls = new THREE.OrbitControls(camera);

//config
camera.position.z = 300;
camera.position.y = 140;
camera.position.x = 100;

renderer.setClearColor("#333333");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

let light = new THREE.AmbientLight(0xaaaaaa); 
scene.add(light);

// Add GridHelper to the scene
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

//experiment here
let angles = { a1: 180 };
let manipulator = new ManipulatorTest();
console.log(manipulator);

scene.add(manipulator.revJoin1);
//render
let render = function() {
  requestAnimationFrame(render);
  manipulator.setAngle(angles);
  renderer.render(scene, camera);
};

render();