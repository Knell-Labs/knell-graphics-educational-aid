import React, { useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber'
import { AxesHelper } from "./axesHelperCustom/axesHelper"
import { CustomCameraControls } from "./controls/CameraControls"
import { CameraSwitch } from "./ui/button/cameraSwitch"
import { ToolPanel } from "./ui/tool-panel/toolPanel"
import { LeftPanel } from "./ui/left-panel/leftPanel"
import { SwitchBetweenCameras } from './camera/camera';
import { TestBox } from './objects/testCube';
import { RayCaster } from './raycast/raycaster';
import { Plane } from '@react-three/drei';

export function BasicScene() {
  const [isOrthographic, setIsOrthographic] = useState<boolean>(true);
  const [isObjectButtonPressed, setIsObjectButtonPressed] = useState<boolean>(false)
  const [objectTypePressed, setObjectTypePressed] = useState<string>("")

  const [fetchedObjects, setFetchedObjects] = useState<boolean>(false)
  const [sceneInfo, setSceneInfo] = useState(null)

  useEffect(() => {
    console.log(`orthographic set to : ${isOrthographic}`);
  }, [isOrthographic]);

  return (
    <>
      <Canvas >
            <ambientLight intensity={0.5} />

        <GetSceneInfo
            fetchedObjects={ fetchedObjects }
            setFetchedObjects={ setFetchedObjects }
            setSceneInfo={setSceneInfo}
        />

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
          name = "gird-plane-hidden"
          rotation={[-Math.PI / 2, 0, 0]} 
          args={[20, 20]} 
          position={[0, -0.01, 0]} 
          visible = { false }
        />

        <AxesHelper width = {6} length = {2} />

        </Canvas>

        { !!sceneInfo && <LeftPanel props = {sceneInfo}/> }

        <ToolPanel
         isObjectButtonPressed = {isObjectButtonPressed}  
         setIsObjectButtonPressed={setIsObjectButtonPressed}
         objectTypePressed = {objectTypePressed}
         setObjectTypePressed = { setObjectTypePressed}

        />

        <CameraSwitch
          isOrthographic={isOrthographic}
          setIsOrthographic={setIsOrthographic}

        />
    </>
  )
}


function GetSceneInfo({fetchedObjects, setFetchedObjects, setSceneInfo}){
    if(!fetchedObjects){
      setSceneInfo( useThree().scene.children )
      setFetchedObjects(true)
    }

    return null;
}
