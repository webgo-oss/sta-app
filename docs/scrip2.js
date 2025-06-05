 import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
  import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
  import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';

  const container = document.getElementById("model1");
  let width = container.clientWidth;
  let height = container.clientHeight;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 5, 15);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 10;
  controls.maxDistance = 30;
  controls.minPolarAngle = Math.PI / 4;
  controls.maxPolarAngle = Math.PI / 1.5;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 5, -10);
  scene.add(directionalLight);

  let model;
  const loader = new GLTFLoader();
  loader.load('/frank.glb', gltf => {
    model = gltf.scene;
    scene.add(model);
    updateModelSize();
  }, undefined, error => {
    console.error('Model load error:', error);
  });

  function updateModelSize() {
    if (!model) return;

    const vw = window.innerWidth;
    let scale = 10;
    if (vw < 768) {
      scale = 6;
      camera.position.set(0, 4, 12);
    } else if (vw < 480) {
      scale = 4.5;
      camera.position.set(1, 3, 10);
    } else {
      camera.position.set(1, 5, 15);
    }

    model.scale.set(scale, scale, scale);
    model.position.set(0, -5.5, 0);
  }

  window.addEventListener('resize', () => {
    width = container.clientWidth;
    height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    updateModelSize();
  });

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();