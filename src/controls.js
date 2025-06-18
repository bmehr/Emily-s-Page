import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import * as THREE from 'three';

export function setupControls(camera, domElement) {
  const controls = new PointerLockControls(camera, domElement);

  // Handle click to activate
  document.body.addEventListener('click', () => {
    document.body.requestFullscreen()
      .then(() => controls.lock())
      .catch(() => controls.lock());
  });

  const keys = {
    forward: false,
    backward: false,
    left: false,
    right: false,
  };

  const velocity = new THREE.Vector3();
  const direction = new THREE.Vector3();
  const moveSpeed = 20;

  function onKeyDown(event) {
    switch (event.code) {
      case 'KeyW': keys.forward = true; break;
      case 'KeyS': keys.backward = true; break;
      case 'KeyA': keys.left = true; break;
      case 'KeyD': keys.right = true; break;
    }
  }

  function onKeyUp(event) {
    switch (event.code) {
      case 'KeyW': keys.forward = false; break;
      case 'KeyS': keys.backward = false; break;
      case 'KeyA': keys.left = false; break;
      case 'KeyD': keys.right = false; break;
    }
  }

  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);

  // Custom update method to call every frame
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
