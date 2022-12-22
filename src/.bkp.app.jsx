import { useState, useRef, useEffect } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { Mesh } from 'three';
import AnimatedBox from './AnimatedBox';
import DreiRefraction from './DreiRefraction';
import { useGLTF, MeshRefractionMaterial } from '@react-three/drei';

function App() {
  const canvasRef = useRef();
  const sceneRef = useRef();

  const { nodes } = useGLTF('./diamond.glb');

  // const onxrloaded = () => {
  let { onxrloaded, cubeCamera, renderTarget } = XR8Scene(canvasRef, sceneRef);
  // console.log('starting XR');
  // const cubeMapScene = new THREE.Scene();
  // const initXrScene = ({ scene, camera }) => {
  //   const refMat = new THREE.MeshBasicMaterial({
  //     side: THREE.DoubleSide,
  //     color: 0xffffff,
  //     map: camTexture_,
  //   });
  //   const sphere = new THREE.SphereGeometry(100, 15, 15);
  //   const sphereMesh = new THREE.Mesh(sphere, refMat);
  //   sphereMesh.scale.set(-1, 1, 1);
  //   sphereMesh.rotation.set(Math.PI, -Math.PI / 2, 0);
  //   cubeMapScene.add(sphereMesh);

  //   scene.add(sceneRef.current);
  //   camera.position.set(0, 3, 0);
  // };

  // XR8.addCameraPipelineModules([
  //   XR8.GlTextureRenderer.pipelineModule(), // Draws the camera feed.
  //   XR8.Threejs.pipelineModule(), // Creates a ThreeJS AR Scene.
  //   XR8.XrController.pipelineModule(), // Enables SLAM tracking.
  //   window.LandingPage.pipelineModule(), // Detects unsupported browsers and gives hints.
  //   XRExtras.FullWindowCanvas.pipelineModule(), // Modifies the canvas to fill the window.
  //   XRExtras.Loading.pipelineModule(), // Manages the loading screen on startup.
  //   XRExtras.RuntimeError.pipelineModule(), // Shows an error image on runtime error.
  // ]);
  // XR8.addCameraPipelineModule({
  //   name: 'react-8thwall-boilerplate',
  //   onStart: ({ canvasWidth, canvasHeight }) => {
  //     const { scene, camera } = XR8.Threejs.xrScene();
  //     initXrScene({ scene, camera });
  //     XR8.XrController.updateCameraProjectionMatrix({
  //       origin: camera.position,
  //       facing: camera.quaternion,
  //     });
  //   }, //END OF ONSTART
  //   onUpdate: ({ processCpuResult }) => {
  //     const { scene, camera, renderer } = XR8.Threejs.xrScene();
  //     cubeCamera.update(renderer, cubeMapScene);
  //     const { reality } = processCpuResult;
  //     if (!reality) {
  //       return;
  //     }
  //   },
  //   onProcessCpu: ({ frameStartResult }) => {
  //     const { cameraTexture } = frameStartResult;
  //     // force initialization
  //     const { scene, camera, renderer } = XR8.Threejs.xrScene(); // Get the 3js scene from XR8.Threejs
  //     texProps = renderer.properties.get(camTexture_);
  //     texProps.__webglTexture = cameraTexture;
  //   },
  // });

  // canvasRef.current.addEventListener('touchstart', () => {
  //   XR8.XrController.recenter();
  // });
  // XR8.run({ canvas: canvasRef.current });
  // };

  useEffect(() => {
    XRExtras.Loading.showLoading({ onxrloaded });
  }, []);

  return (
    <div className="App">
      <Canvas style={{ position: 'absolute' }}>
        <scene ref={sceneRef}>
          <ambientLight />
          <pointLight position={[10, 15, 10]} />
          <mesh position={[0, 0.5, -3]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={'yellow'} />
          </mesh>
          {/* <DreiRefraction /> */}
          <mesh
            geometry={nodes.Diamond_1_0.geometry}
            rotation={[0, 0, 0.715]}
            position={[0, -0.175, 0]}
          >
            <MeshRefractionMaterial
              envMap={cubeCamera.renderTarget.texture}
              bounces={3}
              aberrationStrength={0.08}
              ior={1.8}
              fresnel={1.0}
              color="#efefef"
              fastChroma
              toneMapped={false}
            />
          </mesh>
          {/* <AnimatedBox /> */}
        </scene>
      </Canvas>
      <canvas
        ref={canvasRef}
        width="480"
        height="640"
        style={{ position: 'absolute' }}
      ></canvas>
    </div>
  );
}

export default App;
function XR8Scene(canvasRef, sceneRef) {
  const renderTarget = new THREE.WebGLCubeRenderTarget(256, {
    format: THREE.RGBFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
    encoding: THREE.sRGBEncoding,
  });
  const cubeCamera = new THREE.CubeCamera(1, 1000, renderTarget);
  const onxrloaded = () => {
    let cameraFeedRender = false;

    const camTexture_ = new THREE.Texture();
    let cameraFeedRenderer = null;
    const renderTex_ = null;
    let canvasWidth_ = null;
    let canvasHeight_ = null;
    let videoWidth_ = null;
    let videoHeight_ = null;
    let texProps = null;

    console.log('starting XRscene');
    const cubeMapScene = new THREE.Scene();
    const initXrScene = ({ scene, camera }) => {
      const refMat = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: 0xffffff,
        map: camTexture_,
      });
      const sphere = new THREE.SphereGeometry(100, 15, 15);
      const sphereMesh = new THREE.Mesh(sphere, refMat);
      sphereMesh.scale.set(-1, 1, 1);
      sphereMesh.rotation.set(Math.PI, -Math.PI / 2, 0);
      cubeMapScene.add(sphereMesh);

      scene.add(sceneRef.current);
      camera.position.set(0, 3, 0);
    };

    XR8.addCameraPipelineModules([
      XR8.GlTextureRenderer.pipelineModule(), // Draws the camera feed.
      XR8.Threejs.pipelineModule(), // Creates a ThreeJS AR Scene.
      XR8.XrController.pipelineModule(), // Enables SLAM tracking.
      window.LandingPage.pipelineModule(), // Detects unsupported browsers and gives hints.
      XRExtras.FullWindowCanvas.pipelineModule(), // Modifies the canvas to fill the window.
      XRExtras.Loading.pipelineModule(), // Manages the loading screen on startup.
      XRExtras.RuntimeError.pipelineModule(), // Shows an error image on runtime error.
    ]);
    XR8.addCameraPipelineModule({
      name: 'react-8thwall-boilerplate',
      onStart: ({ canvasWidth, canvasHeight }) => {
        const { scene, camera } = XR8.Threejs.xrScene();
        initXrScene({ scene, camera });
        XR8.XrController.updateCameraProjectionMatrix({
          origin: camera.position,
          facing: camera.quaternion,
        });
      }, //END OF ONSTART
      onUpdate: ({ processCpuResult }) => {
        const { scene, camera, renderer } = XR8.Threejs.xrScene();
        cubeCamera.update(renderer, cubeMapScene);
        const { reality } = processCpuResult;
        if (!reality) {
          return;
        }
      },
      onProcessCpu: ({ frameStartResult }) => {
        const { cameraTexture } = frameStartResult;
        // force initialization
        const { scene, camera, renderer } = XR8.Threejs.xrScene(); // Get the 3js scene from XR8.Threejs
        texProps = renderer.properties.get(camTexture_);
        texProps.__webglTexture = cameraTexture;
      },
    });
    canvasRef.current.addEventListener('touchstart', () => {
      XR8.XrController.recenter();
    });
    XR8.run({ canvas: canvasRef.current });
  };
  return { onxrloaded, renderTarget, cubeCamera };
}

/*
having cert(https):
`npm install mkcert`
then change the vite.config.js to:

```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
server: { https: true },
plugins: [react(), mkcert()],
})
```

package.json needs to expose the IP:
`"dev": "vite --host",`

*/
