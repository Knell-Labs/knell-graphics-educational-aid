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
  //const [objectAdded, setObjectAdded] = useState<number>(0); // Initialize it to 0
  const [objectsAdded, setObjectsAdded] = useState<any[]>([]);

  const [cursorPosition, setCursorPosition] = useState<THREE.Vector3 | null>(null);

  

  useEffect(() => {
    console.log(`orthographic set to : ${isOrthographic}`);
  }, [isOrthographic]);

  // add cube
  const addCubeToScene = () => {
    setCubeCount(prevCount => prevCount + 1); // increase the count
  };

  const addObjectToScene = (type: string, props: any = {}) => {
    setObjectsAdded(prevObjects => [...prevObjects, { type, props }]);
  };

  return (
    <>
      <Canvas >
        <ambientLight intensity={0.5} position = {[4,4,4]}/>

        <GetSceneInfo
            cubeCount = {cubeCount}
            objectsAdded = {objectsAdded}
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

        {objectsAdded.map((object, idx) => {
            switch (object.type) {
                case 'cube':
                    return <CreateCube key={idx} {...object.props} />;
                // Add more cases for other shapes
                default:
                    return null;
            }
        })}

        <RayCaster
          isObjectButtonPressed = { isObjectButtonPressed }
          addObjectToScene = { addObjectToScene }
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
                          sceneInfo = { sceneInfo } 
                          sceneTitle = { "Untitled" }
                          />
        }

        <ToolPanel
         isObjectButtonPressed = { isObjectButtonPressed }  
         setIsObjectButtonPressed={ setIsObjectButtonPressed }
         objectTypePressed = { objectTypePressed }
         setObjectTypePressed = { setObjectTypePressed}
         addObjectToScene = { addObjectToScene }
        />

        <CameraSwitch
          isOrthographic={isOrthographic}
          setIsOrthographic={setIsOrthographic}

        />
    </>
  )
}

/*
function GetSceneInfo({objectsAdded, fetchedObjects, setFetchedObjects, setSceneInfo}){
    const { scene } = useThree();

    useEffect(() => {
        setSceneInfo(scene.children);
        if (!fetchedObjects) {
            setFetchedObjects(true);
        }
    }, [objectsAdded]);
}
*/

//*
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
//*/





