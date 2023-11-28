import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber'
import { AxesHelper } from "./axesHelperCustom/axesHelper"
import { CustomCameraControls } from "./controls/CameraControls"
import { CameraSwitch } from "./ui/button/cameraSwitch"
import { Help } from "./ui/button/help"
import { ToolPanel } from "./ui/tool-panel/toolPanel"
import { LeftPanel } from "./ui/left-panel/leftPanel"
import { RightPanel } from "./ui/right-panel/rightPanel"
import { SwitchBetweenCameras } from './camera/camera';
import { TestBox } from './objects/testCube';
import { CreateCube } from './objects/Cube';
import { CreateSphere } from './objects/Sphere';
import { CreateCylinder } from './objects/Cylinder';
import { CreateCone } from './objects/Cone';
import { CreateTetrahedron } from './objects/Tetrahedron';
import { CreatePyramid } from './objects/Pyramid';
import { CreateHemisphere } from './objects/Hemisphere';
import { RayCaster } from './raycast/raycaster';
import { CadPlanes } from './raycast/ScenePlanes';
import { Plane } from '@react-three/drei';
import { AmbientLightFunc, DirectLightFunc } from './objects/Lights';
import { CustomShapes } from './objects/CustomShapes';
import { CustomShapePanel } from './ui/custom-shape-panel/customShapePanel';


import { Session } from '@/types/auth';

export enum CameraDirection {
    freeDrive, 
    redTop,      // Normal vector (0, 1, 0)
    redBottom,   // Normal vector (0, -1, 0)
    greenFront,  // Normal vector (0, 0, 1)
    greenBack,   // Normal vector (0, 0, -1)
    blueFront,   // Normal vector (1, 0, 0)
    blueBack,    // Normal vector (-1, 0, 0)
}
export type TwoDimPlaneRotation = [ number, number, number ];

export interface BasicSceneProps {
  session             : Session | null;
  handleLogout        : () => void;
  handleShowLoginForm : () => void;
}
export const BasicScene : React.FC<BasicSceneProps> = ({
  session,
  handleLogout,
  handleShowLoginForm
}) => {

  const [objectClicked, setObjectClicked] = useState<THREE.Mesh | null>();
  const [objectClickedUUID, setObjectClickedUUID] = useState<string | null>();

  const [isOrthographic, setIsOrthographic] = useState<boolean>(false);

  const [isObjectButtonPressed, setIsObjectButtonPressed] = useState<boolean>(false)
  const [objectTypePressed, setObjectTypePressed] = useState<string>("")
  const [cameraCoordinates, setCameraCoordinates] = useState<number[]>([15,15,15])

  const [openGroupIDs, setOpenGroupIDs] = useState<string[]>([]);   

  const [fetchedObjects, setFetchedObjects] = useState<boolean>(false)
  const [sceneInfo, setSceneInfo] = useState(null)
  const [sceneMain, setSceneMain] = useState(null)

  const [objectsAdded, setObjectsAdded] = useState<any[]>([]);

  const perspectiveCameraRef = useRef<THREE.PerspectiveCamera>(null);
  const orthographicCameraRef = useRef<THREE.OrthographicCamera>(null);

  const [isSketchButtonPressed, setIsSketchButtonPressed] = useState<boolean>(false);

  const [currCameraPos, setCurrCameraPos] =  useState<CameraDirection>(CameraDirection.freeDrive);


  const [planeOrientation, setPlaneOrientation] = useState<TwoDimPlaneRotation>([-Math.PI/2, 0, 0])
  const [girdOrientation, setGirdOrientation] = useState<TwoDimPlaneRotation>([0, 0, 0])


  const [mainCanvasView, setMainCanvasView] = useState<boolean>(false);

  const [lineProperty, setLineProperty] = useState({
    x: "0",
    y: "0",
  });

  useEffect(() => {
    // console.log(`orthographic set to : ${isOrthographic}`);
  }, [isOrthographic]);

  const addObjectToScene = (type: string, props: any = {}) => {
    setObjectsAdded(prevObjects => [{ type, props }, ...prevObjects ]);
  };

  return (
    <>
    {mainCanvasView && 
        <Canvas>
          <AmbientLightFunc/>
          <DirectLightFunc/>
          

          <GetSceneInfo
              objectsAdded      = { objectsAdded }
              fetchedObjects    = { fetchedObjects }
              setFetchedObjects = { setFetchedObjects }
              setSceneInfo      = { setSceneInfo }
              setSceneMain      = { setSceneMain }
          />

          <CustomCameraControls/>

          <SwitchBetweenCameras
            isOrthographic    = { isOrthographic }
            setIsOrthographic = { setIsOrthographic }
            cameraCoordinates = { cameraCoordinates }
            persCameraRef = { perspectiveCameraRef }
            orthoCameraRef = { orthographicCameraRef }

          />

          {objectsAdded.map((object, idx) => {
              switch (object.type) {
                  case 'cube':
                      return <CreateCube 
                               setObjectClickedUUID = {setObjectClickedUUID}
                               setObjectClicked={setObjectClicked}
                               isObjectButtonPressed = { isObjectButtonPressed }
                               key = { idx } { ...object.props }
                              />;
                  case 'sphere':
                      return <CreateSphere
                              setObjectClickedUUID = {setObjectClickedUUID}
                              setObjectClicked={setObjectClicked}
                              isObjectButtonPressed = { isObjectButtonPressed }
                              key = { idx } { ...object.props } 
                              />;
                  case 'cylinder':
                      return <CreateCylinder
                              isObjectButtonPressed = { isObjectButtonPressed }
                              key = { idx } { ...object.props } 
                              />;
                  case 'cone':
                      return <CreateCone
                              isObjectButtonPressed = { isObjectButtonPressed }
                              key = { idx } { ...object.props } 
                              />;
                  case 'tetrahedron':
                      return <CreateTetrahedron
                              isObjectButtonPressed = { isObjectButtonPressed }
                              key = { idx } { ...object.props } 
                              />;
                  case 'pyramid':
                      return <CreatePyramid
                              isObjectButtonPressed = { isObjectButtonPressed }
                              key = { idx } { ...object.props } 
                              />;
                  case 'hemisphere':
                      return <CreateHemisphere
                              isObjectButtonPressed = { isObjectButtonPressed }
                              key = { idx } { ...object.props } 
                              />;
                  // Add more cases for other shapes
                  default:
                      return null;
              }
          })}

          { 
            isSketchButtonPressed &&  <CadPlanes
              isOrthographic =  {isOrthographic}
              orthoCameraRef = {orthographicCameraRef}
              persCameraRef={ perspectiveCameraRef }
              planeOrientation = { planeOrientation }
              setPlaneOrientation = { setPlaneOrientation }
              girdOrientation = { girdOrientation }
              setGirdOrientation = { setGirdOrientation }
              setCurrCameraPos = { setCurrCameraPos }
            />
          }



          <RayCaster
            isObjectButtonPressed = { isObjectButtonPressed }
            addObjectToScene      = { addObjectToScene }
            setCoordinates        = { setCameraCoordinates }
            objectTypePressed     = { objectTypePressed }
            currCameraPos         = {  currCameraPos }
          />

          <color args={ [ '#343a45' ] } attach="background" />

          <gridHelper
            name = "init-grid"
            args = { [20, 20, '#ffffff'] }
            position = { [0, -0.01, 0] }
            rotation={ [
                         girdOrientation[0],
                         girdOrientation[1],
                         girdOrientation[2]
                       ]
           }
          />

          <Plane 
            name = "grid-plane-hidden-helper"
            rotation = { [
                          planeOrientation[0],
                          planeOrientation[1],
                          planeOrientation[2]
                         ]
            } 
            args = { [20, 20] } 
            position = { [0, -0.01, 0] } 
            visible = { false }


          />

          <AxesHelper width = {6} length = {2} />

          </Canvas>
        }

        { !mainCanvasView && 
          <Canvas>
            <AmbientLightFunc/>
            

            <GetSceneInfo
                objectsAdded      = { objectsAdded }
                fetchedObjects    = { fetchedObjects }
                setFetchedObjects = { setFetchedObjects }
                setSceneInfo      = { setSceneInfo }
                setSceneMain      = { setSceneMain }
            />

            <CustomCameraControls/>

            <SwitchBetweenCameras
              isOrthographic    = { isOrthographic }
              setIsOrthographic = { setIsOrthographic }
              cameraCoordinates = { cameraCoordinates }
              persCameraRef = { perspectiveCameraRef }
              orthoCameraRef = { orthographicCameraRef }

            />

            { 
              isSketchButtonPressed &&  <CadPlanes
                isOrthographic =  {isOrthographic}
                orthoCameraRef = {orthographicCameraRef}
                persCameraRef={ perspectiveCameraRef }
                planeOrientation = { planeOrientation }
                setPlaneOrientation = { setPlaneOrientation }
                girdOrientation = { girdOrientation }
                setGirdOrientation = { setGirdOrientation }
                setCurrCameraPos = { setCurrCameraPos }
              />
            }

            <CustomShapes
              lineProperty = { lineProperty }
            />

            <RayCaster
              isObjectButtonPressed = { isObjectButtonPressed }
              addObjectToScene      = { addObjectToScene }
              setCoordinates        = { setCameraCoordinates }
              objectTypePressed     = { objectTypePressed }
              currCameraPos         = {  currCameraPos }
            />

            <color args={ [ '#343a45' ] } attach="background" />

            <gridHelper
              name = "init-grid"
              args = { [20, 20, '#ffffff'] }
              position = { [0, -0.01, 0] }
              rotation={ [
                           girdOrientation[0],
                           girdOrientation[1],
                           girdOrientation[2]
                         ]
             }
            />

            <Plane 
              name = "grid-plane-hidden-helper"
              rotation = { [
                            planeOrientation[0],
                            planeOrientation[1],
                            planeOrientation[2]
                           ]
              } 
              args = { [20, 20] } 
              position = { [0, -0.01, 0] } 
              visible = { false }


            />

            <AxesHelper width = {2} length = {2} />

            </Canvas>
        }



        { mainCanvasView && !!objectClicked  && !!objectClickedUUID && !!sceneInfo
            &&
            <RightPanel
                objectClicked = { objectClicked}
                objectClickedUUID={objectClickedUUID}
                sceneInfo  = { sceneInfo } 
            />
        }
        { mainCanvasView && !!sceneInfo && <LeftPanel 
                          sceneMain       = { sceneMain }
                          sceneInfo       = { sceneInfo } 
                          openGroupIDs    = { openGroupIDs }
                          handleOpenGroup = {
                            (group_id: string) => setOpenGroupIDs( prev => openGroupIDs.includes(group_id) ? prev.filter( n => n != group_id) : [...prev,group_id])}
                          />
        }


        { mainCanvasView && <ToolPanel
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
        }

        {  mainCanvasView && <CameraSwitch
            isOrthographic        = { isOrthographic }
            setIsOrthographic     = { setIsOrthographic }
            isObjectButtonPressed = { isObjectButtonPressed }
          />
        }

        { !mainCanvasView && <CustomShapePanel
          // lineProperty = {lineProperty}
          setLineProperty = {setLineProperty}
        /> }
    </>
  )
}

function GetSceneInfo({ objectsAdded, fetchedObjects, setFetchedObjects, setSceneInfo, setSceneMain }){
  const { scene } = useThree();

  useEffect(() => {
      setSceneInfo(scene.children);
      if(scene.name === ""){
        scene.name = "Untitled";
      }
      setSceneMain(scene);
      if (!fetchedObjects) { 
        setFetchedObjects(true);
      }
  }, [objectsAdded]);

  return null;
}
