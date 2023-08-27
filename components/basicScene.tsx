import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber'
import { AxesHelper } from "./axesHelperCustom/axesHelper"
import { CustomCameraControls } from "./controls/CameraControls"
import { CameraSwitch } from "./ui/buttons/cameraSwitch"
import { ToolPanel } from "./ui/tool-panel/toolPanel"
import { SwitchBetweenCameras } from './camera/camera';
import { TestBox } from './objects/testCube';
import { RayCaster } from './raycast/raycaster';
import { Plane } from '@react-three/drei';

export function BasicScene() {
  const [isOrthographic, setIsOrthographic] = useState<boolean>(true);
  const [isObjectButtonPressed, setIsObjectButtonPressed] = useState<boolean>(false)

  useEffect(() => {
    console.log(`orthographic set to : ${isOrthographic}`);
  }, [isOrthographic]);

  return (
    <>
      <Canvas >
            <ambientLight intensity={0.5} />

        <CustomCameraControls/>

        <SwitchBetweenCameras
          isOrthographic={isOrthographic}
          setIsOrthographic={setIsOrthographic}
        />

        <TestBox/>
        <RayCaster
          isObjectButtonPressed = { isObjectButtonPressed }
        />
        <color args={ [ '#343a45' ] } attach="background" />

        <gridHelper
          name = "init-grid"
          args={[20, 20, '#ffffff']}
          position={[0, -0.01, 0]}
        />

        <Plane 
          name = "test-plane"
          rotation={[-Math.PI / 2, 0, 0]} 
          args={[20, 20]} 
          position={[0, -0.01, 0]} 
          visible = { false }
        />
          
        <Plane 
          name = "test-plane"
          rotation={[-Math.PI / 2, 0, 0]} 
          args={[1, 1]} 
          position={[1.5, -0.01, 1.5]} 
        />



        <AxesHelper width = {6} length = {2} />

        </Canvas>

        <ToolPanel
         isObjectButtonPressed = {isObjectButtonPressed}  
         setIsObjectButtonPressed={setIsObjectButtonPressed}
        />

        <CameraSwitch
          isOrthographic={isOrthographic}
          setIsOrthographic={setIsOrthographic}
        />
    </>
  )
}
