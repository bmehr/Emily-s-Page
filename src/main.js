// import * as THREE from 'three';
import { initScene } from './scene.js';
import { setupControls } from './controls.js';
import { setupInteractions } from './interactions.js';

const { scene, camera, renderer } = initScene();
const controls = setupControls(camera, renderer.domElement);
setupInteractions(scene, camera, controls);

document.body.appendChild(renderer.domElement);

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  controls.update(delta);
  renderer.render(scene, camera);
}
animate();
