import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber'
import { AxesHelper } from "./axesHelperCustom/axesHelper"
import { CustomCameraControls } from "./controls/CameraControls"
import { CameraSwitch } from "./ui/buttons/cameraSwitch"
import { ToolPanel } from "./ui/tool-panel/toolPanel"
import { SwitchBetweenCameras } from './camera/camera';
import { TestBox } from './objects/testCube';
import { CreateCube } from './objects/Cube';

export function BasicScene() {
  const [isOrthographic, setIsOrthographic] = useState(true);
  const [cubeCount, setCubeCount] = useState(0); // using a count to manage number of cubes

  useEffect(() => {
    console.log(`orthographic set to : ${isOrthographic}`);
  }, [isOrthographic]);

  // add cube
  const addCubeToScene = () => {
    setCubeCount(prevCount => prevCount + 1); // increase the count
  };

  return (
    <>
      <Canvas >
        <CustomCameraControls/>

        <SwitchBetweenCameras
          isOrthographic={isOrthographic}
          setIsOrthographic={setIsOrthographic}
        />

        {/* Render cubes based on the count */}
        {Array.from({ length: cubeCount }).map((_, idx) => 
          <CreateCube key = {idx} />
        )}

        {/*<TestBox/>*/}

        <color args={ [ '#343a45' ] } attach="background" />

        <gridHelper
          args={[20, 20, '#ffffff']}
          position={[0, -0.01, 0]}
        />

        <AxesHelper width = {6} length = {2} />

        </Canvas>
        <ToolPanel onAddCube = { addCubeToScene } /> {/* Pass down the callback */}
        <CameraSwitch
          isOrthographic={isOrthographic}
          setIsOrthographic={setIsOrthographic}
        />
    </>
  )
}
