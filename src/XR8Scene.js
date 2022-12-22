
export default function XR8Scene(canvasRef, R3Scene) {
    const renderTarget = new THREE.WebGLCubeRenderTarget(256, {
      format: THREE.RGBFormat,
      generateMipmaps: true,
      minFilter: THREE.LinearMipmapLinearFilter,
      encoding: THREE.sRGBEncoding,
    });
    const cubeCamera = new THREE.CubeCamera(1, 1000, renderTarget);
    const onxrloaded = () => {
      console.log('starting XRscene');
      const camTexture_ = new THREE.Texture();
      let texProps = null;
      const cubeMapScene = new THREE.Scene();
  
      const initXrScene = ({ scene, camera }) => {
        //Creating a sphere to use as a background
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
  
        scene.add(R3Scene.current);
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


    
    //cubeCamera holds the texture of the scene, in case you need to use for
    //reflections, refractions, etc (see DreiRefraction.jsx for example)
    return { onxrloaded, renderTarget, cubeCamera };
  }
  