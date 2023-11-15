import React, { useState, useEffect, useRef } from 'react';
import { CameraSwitch } from "../ui/button/cameraSwitch"
// import { Help } from "../ui/button/help"
import { ToolPanel } from "../ui/tool-panel/toolPanel"
import { LeftPanel } from "../ui/left-panel/leftPanel"
import { RightPanel } from "../ui/right-panel/rightPanel"
import SceneCanvas from './canvas';

import { Session } from '@/types/auth';

interface SceneProps {
  session             : Session | null;
  handleLogout        : () => void;
  handleShowLoginForm : () => void;
}

export const Scene : React.FC<SceneProps> = ({
  session,
  handleLogout,
  handleShowLoginForm
}) => {

  const [objectClicked, setObjectClicked] = useState<THREE.Mesh | null>();
  const [objectClickedUUID, setObjectClickedUUID] = useState<string | null>();

  const [isOrthographic, setIsOrthographic] = useState<boolean>(false);

  const [isObjectButtonPressed, setIsObjectButtonPressed] = useState<boolean>(false)
  const [objectTypePressed, setObjectTypePressed] = useState<string>("")
  // const [cameraCoordinates, setCameraCoordinates] = useState<number[]>([15,15,15])

  const [openGroupIDs, setOpenGroupIDs] = useState<string[]>([]);   

  // const [fetchedObjects, setFetchedObjects] = useState<boolean>(false)
  const [sceneInfo, setSceneInfo] = useState(null)
  const [sceneMain, setSceneMain] = useState(null)

  
  const [isSketchButtonPressed, setIsSketchButtonPressed] = useState<boolean>(false);

  useEffect(() => {
    // console.log(`orthographic set to : ${isOrthographic}`);
  }, [isOrthographic]);

  const [objects, setObjects] = useState<any[]>([]);

  const addObjectToScene = (type: string, props: any = {}) => {
    setObjects(prevObjects => [{ type, props }, ...prevObjects ]);
  };

  return (
    <>
        <SceneCanvas
          objects={objects}
          addObjectToScene={addObjectToScene}

          isOrthographic={isOrthographic}
          setIsOrthographic={setIsOrthographic}
          // cameraCoordinates={cameraCoordinates}
          // perspectiveCameraRef={perspectiveCameraRef}
          // orthographicCameraRef={orthographicCameraRef}
          setObjectClickedUUID={setObjectClickedUUID}
          setObjectClicked={setObjectClicked}
          isObjectButtonPressed={isObjectButtonPressed}
          // setObjectTypePressed={setObjectTypePressed}
          // planeOrientation={planeOrientation}
          // setPlaneOrientation={setPlaneOrientation}
          // girdOrientation={girdOrientation}
          // setGirdOrientation={setGirdOrientation}
          // setCurrCameraPos={setCurrCameraPos}
          objectTypePressed={objectTypePressed}
          // currCameraPos={currCameraPos}
          // fetchedObjects={fetchedObjects}
          // setFetchedObjects={setFetchedObjects}
          setSceneInfo={setSceneInfo}
          setSceneMain={setSceneMain}
          isSketchButtonPressed={isSketchButtonPressed}
        />
        { !!sceneInfo && (
          <>

            { !!objectClicked  && !!objectClickedUUID &&
              <RightPanel
                objectClicked = { objectClicked }
                objectClickedUUID={objectClickedUUID}
                sceneInfo  = { sceneInfo } 
              />
            }
            
            <LeftPanel 
              sceneMain       = { sceneMain }
              sceneInfo       = { sceneInfo } 
              openGroupIDs    = { openGroupIDs }
              handleOpenGroup = {
                (group_id: string) => setOpenGroupIDs( prev => openGroupIDs.includes(group_id) ? prev.filter( n => n != group_id) : [...prev,group_id])}
            />
            
          </>
        )}



        {/* <Help/> */}

        <ToolPanel
          handleLogout             = { handleLogout }
          handleShowLoginForm      = { handleShowLoginForm }
          session                  = { session }
          isObjectButtonPressed    = { isObjectButtonPressed }  
          setIsObjectButtonPressed = { setIsObjectButtonPressed }
          objectTypePressed        = { objectTypePressed }
          setObjectTypePressed     = { setObjectTypePressed }
          addObjectToScene         = { addObjectToScene }
          isSketchButtonPressed    = { isSketchButtonPressed }
          setIsSketchButtonPressed = { setIsSketchButtonPressed }
        />

        <CameraSwitch
          isOrthographic        = { isOrthographic }
          setIsOrthographic     = { setIsOrthographic }
          isObjectButtonPressed = { isObjectButtonPressed }
        />
    </>
  )
}