import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./style.css";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereBufferGeometry(1, 64, 64);

// Materials

const texture = new THREE.TextureLoader().load("/bumps-normal.png");
const material = new THREE.MeshStandardMaterial({
  normalMap: texture,
});
material.metalness = 0.67;
material.roughness = 0.35;
material.color = new THREE.Color(0x000000);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights
const pointLight = new THREE.PointLight(0xffffff, 21.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 5;

const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(pointLightHelper);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xff0000, 2);
pointLight2.position.set(3.3, 1.1, -2.6);
pointLight2.intensity = 25;

const pointLight2Helper = new THREE.PointLightHelper(pointLight2, 1);
scene.add(pointLight2, pointLight2Helper);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 3;
camera.position.y = 1;
camera.position.z = 1.1;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
const controls = new OrbitControls(camera, renderer.domElement);

/**
 * Animate
 */
let mouseX = 0;
let mouseY = 0;
document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX - sizes.width / 2;
  mouseY = event.clientY - sizes.height / 2;
});

const tick = () => {
  if (mouseX > 0) {
    sphere.rotation.y += 0.01;
  } else {
    sphere.rotation.y -= 0.01;
  }

  if (mouseY > 0) {
    sphere.rotation.z -= 0.01;
  } else {
    sphere.rotation.z += 0.01;
  }

  // Update Orbital Controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
