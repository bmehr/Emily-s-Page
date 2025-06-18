import * as THREE from 'three';

export function setupInteractions(scene, camera, controls) {
  const interactables = [];

  const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
  );
  box.position.set(0, 0.5, -5);
  scene.add(box);
  interactables.push(box);

  const raycaster = new THREE.Raycaster();

  document.addEventListener('click', () => {
    if (!controls.isLocked) return;
    raycaster.setFromCamera({ x: 0, y: 0 }, camera);
    const hits = raycaster.intersectObjects(interactables);
    if (hits.length) {
      hits[0].object.material.emissive = new THREE.Color(0xffff00);
      setTimeout(() => hits[0].object.material.emissive.set(0x000000), 200);
    }
  });
}
