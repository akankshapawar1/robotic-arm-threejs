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

renderer.setClearColor("#252525");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// let light = new THREE.PointLight(0xffffff, 1, 500);
let light = new THREE.AmbientLight(0x404040); // soft white light
light.position.set(10, 0, 25);
scene.add(light);

//adding light to the scene
scene.add(light);

//experiment here
let angles = { a1: 0, a2: 0, a3: 0 };
let manipulator = new ManipulatorTest();
console.log(manipulator);

scene.add(manipulator.revJoin1);
//render
let render = function() {
  requestAnimationFrame(render);
  manipulator.setAngle(angles);
  angles.a1 += 0.05;
  angles.a2 += 0.05;
  angles.a3 += 0.05;
  renderer.render(scene, camera);
};

render();