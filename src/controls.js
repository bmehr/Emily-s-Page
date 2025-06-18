import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import * as THREE from 'three';

export function setupControls(camera, domElement) {
  const controls = new PointerLockControls(camera, domElement);

  document.body.addEventListener('click', () => {
    controls.lock();
  });

  const keys = { forward: false, backward: false, left: false, right: false };
  const velocity = new THREE.Vector3();
  const direction = new THREE.Vector3();
  const moveSpeed = 10;

  document.addEventListener('keydown', e => {
    if (e.code === 'KeyW') keys.forward = true;
    if (e.code === 'KeyS') keys.backward = true;
    if (e.code === 'KeyA') keys.left = true;
    if (e.code === 'KeyD') keys.right = true;
  });
  document.addEventListener('keyup', e => {
    if (e.code === 'KeyW') keys.forward = false;
    if (e.code === 'KeyS') keys.backward = false;
    if (e.code === 'KeyA') keys.left = false;
    if (e.code === 'KeyD') keys.right = false;
  });

  controls.update = function(delta) {
    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    direction.z = Number(keys.forward) - Number(keys.backward);
    direction.x = Number(keys.right) - Number(keys.left);
    direction.normalize();

    if (keys.forward || keys.backward) velocity.z -= direction.z * moveSpeed * delta;
    if (keys.left || keys.right) velocity.x -= direction.x * moveSpeed * delta;

    controls.moveRight(-velocity.x * delta);
    controls.moveForward(-velocity.z * delta);
  };

  return controls;
}
