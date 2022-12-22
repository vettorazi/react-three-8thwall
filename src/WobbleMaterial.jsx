import { MeshWobbleMaterial, Torus } from '@react-three/drei';

export default function WobbleMaterial() {
  return (
    <mesh>
      <Torus args={[1, 0.25, 16, 100]} position={[-3, 1, -2]}>
        <MeshWobbleMaterial color="#f25042" speed={1.5} factor={0.6} />
      </Torus>
    </mesh>
  );
}
