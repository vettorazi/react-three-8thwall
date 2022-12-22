import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as Three from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useGLTF } from '@react-three/drei';

export default function LoadedGltf() {
  const movingLogo = useRef();
  const clock = new THREE.Clock();
  const { nodes, materials } = useGLTF('./react.glb');
  console.log(nodes.atom.material);
  nodes.atom.material.color = new THREE.Color('#61dbfb');
  nodes.atom.material.roughness = 0.5;
  nodes.atom.material.metalness = 0.5;

  useFrame(() => {
    const rotateX = clock.getElapsedTime();
    movingLogo.current.rotation.y = rotateX;
  });
  return (
    <mesh
      material={nodes.atom.material}
      geometry={nodes.atom.geometry}
      castShadow
      receiveShadow
      position={[0, 3, 0]}
      ref={movingLogo}
    />
  );
}
