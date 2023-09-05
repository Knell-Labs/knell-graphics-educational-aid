import React, { useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber'
import { AxesHelper } from "./axesHelperCustom/axesHelper"
import { CustomCameraControls } from "./controls/CameraControls"
import { CameraSwitch } from "./ui/button/cameraSwitch"
import { ToolPanel } from "./ui/tool-panel/toolPanel"
import { LeftPanel } from "./ui/left-panel/leftPanel"
import { SwitchBetweenCameras } from './camera/camera';
import { TestBox } from './objects/testCube';
import { CreateCube } from './objects/Cube';
import { RayCaster } from './raycast/raycaster';
import { Plane } from '@react-three/drei';

export function BasicScene() {
  const [isOrthographic, setIsOrthographic] = useState<boolean>(true);
  const [isObjectButtonPressed, setIsObjectButtonPressed] = useState<boolean>(false)
  const [objectTypePressed, setObjectTypePressed] = useState<string>("")

  const [fetchedObjects, setFetchedObjects] = useState<boolean>(false)
  const [sceneInfo, setSceneInfo] = useState(null)

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
        <ambientLight intensity={0.5} position = {[4,4,4]}/>

        <GetSceneInfo
            cubeCount = { cubeCount }
            fetchedObjects={ fetchedObjects }
            setFetchedObjects={ setFetchedObjects }
            setSceneInfo={setSceneInfo}
        />

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
          name = "grid-plane-hidden-helper"
          rotation={[-Math.PI / 2, 0, 0]} 
          args={[20, 20]} 
          position={[0, -0.01, 0]} 
          visible = { false }
        />

        <AxesHelper width = {6} length = {2} />

        </Canvas>

        { !!sceneInfo && <LeftPanel 
                          sceneInfo = {sceneInfo} 
                          sceneTitle = { "Untitled" }
                          />
        }

        <ToolPanel
         isObjectButtonPressed = {isObjectButtonPressed}  
         setIsObjectButtonPressed={setIsObjectButtonPressed}
         objectTypePressed = {objectTypePressed}
         setObjectTypePressed = { setObjectTypePressed}
         onAddCube = { addCubeToScene }
        />

        <CameraSwitch
          isOrthographic={isOrthographic}
          setIsOrthographic={setIsOrthographic}

        />
    </>
  )
}

function GetSceneInfo({cubeCount, fetchedObjects, setFetchedObjects, setSceneInfo}){
  const { scene } = useThree();

  useEffect(() => {
    if (!fetchedObjects || cubeCount > 0) {
      setSceneInfo(scene.children);
      if (!fetchedObjects) {
        setFetchedObjects(true);
      }
    }
  }, [cubeCount, fetchedObjects, scene]);

  return null;
}






