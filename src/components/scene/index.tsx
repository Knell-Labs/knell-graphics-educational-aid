import React, { useState, useEffect, useRef } from 'react';
import { CameraSwitch } from "../ui/button/cameraSwitch"
import { Help } from "../ui/button/help"
import { ToolPanel } from "../ui/tool-panel/toolPanel"
import { LeftPanel } from "../ui/left-panel/leftPanel"
import { RightPanel } from "../ui/right-panel/rightPanel"
import SceneCanvas from './canvas';

import { Session } from '@/types/auth';

import { ShapeType, ShapeProps } from '@/types/scene';

import {
  getCreateShape
} from '../objects/createShape'

interface SceneProps {
  session             : Session | null;
  handleLogout        : () => void;
  handleShowLoginForm : () => void;
}

const Scene : React.FC<SceneProps> = ({
  session,
  handleLogout,
  handleShowLoginForm
}) => {

  // const [selected, setSelected] = useState<string[]>([]); // arr of selected uuid's

  const [objectClicked, setObjectClicked] = useState<THREE.Mesh | null>();
  const [objectClickedUUID, setObjectClickedUUID] = useState<string | null>();

  const [isOrthographic, setIsOrthographic] = useState<boolean>(false);

  const [isObjectButtonPressed, setIsObjectButtonPressed] = useState<boolean>(false)
  const [objectTypePressed, setObjectTypePressed] = useState<string>("")

  const [openGroupIDs, setOpenGroupIDs] = useState<string[]>([]);   

  const [sceneInfo, setSceneInfo] = useState(null)
  const [sceneMain, setSceneMain] = useState(null)
  
  const [isSketchButtonPressed, setIsSketchButtonPressed] = useState<boolean>(false);

  const [objects, setObjects] = useState<any[]>([]);

  // const addObjectToScene = (shapeType: ShapeType, props: ShapeProps = {}) => {
  //   setObjects(prevObjects => 
  //     [
  //       {
  //         type: shapeType,
  //         props
  //       },
  //       ...prevObjects
  //     ]
  //   );
  // };

  const addObjectToScene = (shapeType: ShapeType, props: ShapeProps = {}) => {
    const Shape = getCreateShape(shapeType);
    if (!Shape) return;

    setObjects(prevObjects => 
      [
        {
          type: shapeType,
          props: props,
          node: (
            <Shape
              key                   = { objects.length.toString() + Date.now().toString() }
              setObjectClickedUUID  = { setObjectClickedUUID }
              setObjectClicked      = { setObjectClicked }
              isObjectButtonPressed = { !isObjectButtonPressed }
              { ...props }
            />
          )
        },
        ...prevObjects
      ]
    );
  };

  return (
    <>
        <SceneCanvas
          objects={objects}
          addObjectToScene={addObjectToScene}

          isOrthographic={isOrthographic}
          setIsOrthographic={setIsOrthographic}

          setObjectClickedUUID={setObjectClickedUUID}
          setObjectClicked={setObjectClicked}
          
          objectTypePressed={objectTypePressed}
          setObjectTypePressed={setObjectTypePressed}
          isObjectButtonPressed={isObjectButtonPressed}

          setSceneInfo={setSceneInfo}
          setSceneMain={setSceneMain}
          isSketchButtonPressed={isSketchButtonPressed}
        />

        { !!sceneInfo && (
          <>

            { !!objectClicked && !!objectClickedUUID &&
              <RightPanel
                objectClicked = { objectClicked }
                objectClickedUUID = { objectClickedUUID }
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



        <Help/>

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

export default Scene;