import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber'
import {AxesHelper} from "./axesHelperCustom/axesHelper"
import {CustomCameraControls} from "./controls/CameraControls"
import {CameraSwitch2} from "./ui/buttons/cameraSwitch"
import { SwitchBetweenCameras } from './camera/camera';
import { TestBox } from './objects/testCube';
import { Html } from '@react-three/drei';


export function BasicScene() {
  const [isOrthographic, setIsOrthographic] = useState(true);

  useEffect(() => {
    console.log(`orthographic set to : ${isOrthographic}`);
  }, [isOrthographic]);

  return (
    <>
        <Canvas >
          <CustomCameraControls/>
          <SwitchBetweenCameras
            isOrthographic={isOrthographic}
            setIsOrthographic={setIsOrthographic}
          />
          <TestBox/>
          <color args={ [ '#343a45' ] } attach="background" />
          <gridHelper
            args={[20, 20, '#ffffff']}
            position={[0, -0.01, 0]}
          />
          <AxesHelper width = {6} length = {2} />




          <CameraSwitch2
          isOrthographic={isOrthographic}
          setIsOrthographic={setIsOrthographic}
          />
        </Canvas>
    </>
  )
}
