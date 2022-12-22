import { useRef } from 'react';
import {
  useGLTF,
  MeshRefractionMaterial,
  CubeCamera,
  MeshDistortMaterial,
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  OrbitControls,
} from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { RGBELoader } from 'three-stdlib';

export default function DreiRefraction({ ...props }) {
  const ref = useRef();
  const { nodes } = useGLTF('./diamond.glb');
  const texture = useLoader(RGBELoader, './hdr.hdr');
  const config = {
    bounces: 1,
    aberrationStrength: 0.1,
    ior: 2.4,
    fresnel: 2.5,
    color: 'white',
    fastChroma: false,
  };

  return (
    <>
      <mesh
        ref={ref}
        geometry={nodes.Diamond_1_0.geometry}
        rotation={[0, 0, 0.715]}
        position={[0, -0.175, 0]}
      >
        <MeshRefractionMaterial
          envMap={props.envMap}
          bounces={3}
          aberrationStrength={0.08}
          ior={1.8}
          fresnel={1.0}
          color="white"
          fastChroma
          toneMapped={false}
        />
      </mesh>
    </>
  );
}
