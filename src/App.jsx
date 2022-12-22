import XR8Scene from './XR8Scene';
import { useRef, useEffect } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';

function App() {
  const canvasRef = useRef();
  const R3Scene = useRef();

  let { onxrloaded, cubeCamera } = XR8Scene(canvasRef, R3Scene);

  useEffect(() => {
    XRExtras.Loading.showLoading({ onxrloaded });
  }, []);

  return (
    <div className="App">
      <Canvas style={{ position: 'absolute' }}>
        <scene ref={R3Scene}>
          <ambientLight />
          <pointLight position={[10, 15, 10]} />
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
