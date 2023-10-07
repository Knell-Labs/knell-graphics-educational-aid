import React, { useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber'
import { AxesHelper } from "./axesHelperCustom/axesHelper"
import { CustomCameraControls } from "./controls/CameraControls"
import { CameraSwitch } from "./ui/button/cameraSwitch"
import { Help } from "./ui/button/help"
import { ToolPanel } from "./ui/tool-panel/toolPanel"
import { LeftPanel } from "./ui/left-panel/leftPanel"
import { SwitchBetweenCameras } from './camera/camera';
import { TestBox } from './objects/testCube';
import { CreateCube } from './objects/Cube';
import { RayCaster } from './raycast/raycaster';
import { Plane } from '@react-three/drei';
import { STLImporter } from "./ui/button/importSTL";
import { AmbientLightFunc, DirectLightFunc } from './objects/Lights';

export function BasicScene() {
  const [isOrthographic, setIsOrthographic] = useState<boolean>(true);
  const [isObjectButtonPressed, setIsObjectButtonPressed] = useState<boolean>(false)
  const [objectTypePressed, setObjectTypePressed] = useState<string>("")
  const [cameraCoordinates, setCameraCoordinates] = useState<number[]>([5,5,5])

  const [openGroupIDs, setOpenGroupIDs] = useState<string[]>([]);   

  const [fetchedObjects, setFetchedObjects] = useState<boolean>(false)
  const [sceneInfo, setSceneInfo] = useState(null)

  const [objectsAdded, setObjectsAdded] = useState<any[]>([]);

  useEffect(() => {
    // console.log(`orthographic set to : ${isOrthographic}`);
  }, [isOrthographic]);

  const addObjectToScene = (type: string, props: any = {}) => {
    setObjectsAdded(prevObjects => [{ type, props }, ...prevObjects ]);
  };

  return (
    <>
      <Canvas >

        <AmbientLightFunc/>
        <DirectLightFunc/>

        <GetSceneInfo
            objectsAdded      = { objectsAdded }
            fetchedObjects    = { fetchedObjects }
            setFetchedObjects = { setFetchedObjects }
            setSceneInfo      = { setSceneInfo }
        />

        <CustomCameraControls/>

        <SwitchBetweenCameras
          isOrthographic    = { isOrthographic }
          setIsOrthographic = { setIsOrthographic }
          cameraCoordinates = { cameraCoordinates }
        />

        {/*<STLImporter addObjectToScene={addObjectToScene} />*/}

        {objectsAdded.map((object, idx) => {
            switch (object.type) {
                case 'cube':
                    return <CreateCube 
                             isObjectButtonPressed = { isObjectButtonPressed }
                             key = { idx } { ...object.props }
                            />;
                // Add more cases for other shapes
                default:
                    return null;
            }
        })}


        <RayCaster
          isObjectButtonPressed = { isObjectButtonPressed }
          addObjectToScene      = { addObjectToScene }
          setCoordinates        = { setCameraCoordinates }
        />

        <color args={ [ '#343a45' ] } attach="background" />

        <gridHelper
          name = "init-grid"
          args = { [20, 20, '#ffffff'] }
          position = { [0, -0.01, 0] }
        />

        <Plane 
          name = "grid-plane-hidden-helper"
          rotation = { [-Math.PI / 2, 0, 0] } 
          args = { [20, 20] } 
          position = { [0, -0.01, 0] } 
          visible = { false }
        />

        <AxesHelper width = {6} length = {2} />

        </Canvas>

        { !!sceneInfo && <LeftPanel 
                          sceneInfo = { sceneInfo } 
                          sceneTitle = { "Untitled" }
                          openGroupIDs = {openGroupIDs}
                          handleOpenGroup = {
                            (group_id: string) => setOpenGroupIDs( prev => openGroupIDs.includes(group_id) ? prev.filter( n => n != group_id) : [...prev,group_id])}
                          />
        }

        <Help/>

        <ToolPanel
         isObjectButtonPressed    = { isObjectButtonPressed }  
         setIsObjectButtonPressed = { setIsObjectButtonPressed }
         objectTypePressed        = { objectTypePressed }
         setObjectTypePressed     = { setObjectTypePressed }
         addObjectToScene         = { addObjectToScene }
        />

        <CameraSwitch
          isOrthographic        = { isOrthographic }
          setIsOrthographic     = { setIsOrthographic }
          isObjectButtonPressed = { isObjectButtonPressed }
        />
    </>
  )
}

function GetSceneInfo({ objectsAdded, fetchedObjects, setFetchedObjects, setSceneInfo }){
  const { scene } = useThree();

  useEffect(() => {
      setSceneInfo(scene.children);
      if (!fetchedObjects) { 
        setFetchedObjects(true);
      }
  }, [objectsAdded]);

  return null;
}
