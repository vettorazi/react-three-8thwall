import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef } from 'react';

export default function AnimatedBox() {
  const movingCube = useRef();
  const clock = new THREE.Clock();
  useFrame(() => {
    const rotateX = clock.getElapsedTime();
    movingCube.current.rotation.x = rotateX;
  });
  return (
    <mesh ref={movingCube} position={[0, 0.5, 2]}>
      <boxGeometry />
      <meshBasicMaterial color="royalblue" />
    </mesh>
  );
}
