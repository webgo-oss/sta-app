import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';

const container = document.getElementById("model");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer({ antialias: true,alpha:true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 10, 0);
scene.add(directionalLight);

let model = null;

const loader = new GLTFLoader();
loader.load('/statue_of_matron.glb', (gltf) => {
  model = gltf.scene;
  model.scale.set(5, 5, 5);
  model.position.set(0, -100, 0);
  model.rotation.set(0, 0, 0);
  scene.add(model);
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;
controls.enablePan = false;
const initialY = -100;
const maxScrollY = 700; 

window.addEventListener('scroll', () => {
  if (!model) return;

  const scrollY = Math.min(window.scrollY, maxScrollY);
  const rotationAmount = scrollY * 0.01;
  const positionOffset = scrollY * 0.06;

  model.rotation.y = rotationAmount;
  model.position.y = initialY - positionOffset;
});
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});
