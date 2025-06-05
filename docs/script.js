import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

const scene1 = new THREE.Scene();
const container1 = document.getElementById("model");

const camera1 = new THREE.PerspectiveCamera(75, container1.clientWidth / container1.clientHeight, 0.1, 1000);
camera1.position.set(0, 0, 10);

const renderer1 = new THREE.WebGLRenderer({ alpha: true });
renderer1.setSize(container1.clientWidth, container1.clientHeight);
renderer1.setPixelRatio(window.devicePixelRatio);
container1.appendChild(renderer1.domElement);

const ambientLight1 = new THREE.AmbientLight(0xffffff, 1.5);
scene1.add(ambientLight1);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight1.position.set(5, 10, 5);
scene1.add(directionalLight1);

const loader = new GLTFLoader();
const models = [
  { url: './models/model1.glb', position: [0, 0.8, 0], scale: [11.5,11.5,11.5] },
  { url: './models/model2.glb', position: [0, 0, 0], scale: [13.5,13.5,13.5] },
  { url: './models/model3.glb', position: [0, 0, 0], scale: [12.5,12.5,12.5] },
  { url: './models/model4.glb', position: [0, 0.5, 0],scale: [13.5,13.5,13.5] },
  { url: './models/model5.glb', position: [0,0.4, 0], scale: [10,10,10] },
  { url: './models/model6.glb', position: [0,0.6, 0], scale: [11,11,11] }
];
const num = parseInt(localStorage.getItem('num'));

if (!isNaN(num) && num >= 0 && num < models.length) {
  const { url, position, scale } = models[num];

  loader.load(url, (gltf) => {
    const model = gltf.scene;
    model.position.set(...position);
    model.rotation.set(0,0,0);
    model.scale.set(...scale);
    scene1.add(model);
  });
} else {
  console.warn("Invalid or missing 'num' in localStorage. No model loaded.");
}

const controls = new OrbitControls(camera1, renderer1.domElement);
controls.enableDamping = true;
controls.autoRotate = true;

function loop() {
  requestAnimationFrame(loop);
  controls.update();
  renderer1.render(scene1, camera1);
}
loop();

window.addEventListener("resize", function () {
  camera1.aspect = container1.clientWidth / container1.clientHeight;
  camera1.updateProjectionMatrix();
  renderer1.setSize(container1.clientWidth, container1.clientHeight);
});
