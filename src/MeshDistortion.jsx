import { MeshDistortMaterial, Torus, GradientTexture } from '@react-three/drei';

export default function WobbleMaterial() {
  return (
    <mesh>
      <Torus args={[1, 0.25, 16, 100]} position={[0, 1, -2]}>
        <MeshDistortMaterial distort={0.7} speed={10}>
          <GradientTexture
            stops={[0, 0.4, 0.8, 1]}
            colors={['#e63946', '#8739e6', '#a8dadc', '#e63946']}
            size={1024}
          />
        </MeshDistortMaterial>
      </Torus>
    </mesh>
  );
}
