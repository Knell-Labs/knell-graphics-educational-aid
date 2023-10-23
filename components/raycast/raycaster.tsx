import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CameraDirection } from "../basicScene";

interface props {
  isObjectButtonPressed: boolean;
  setCoordinates: Dispatch<SetStateAction<number[]>>;
  addObjectToScene: (type: string, props?: any) => void;  // For adding objects
  objectTypePressed: string;
  currCameraPos: CameraDirection; 

}

export function RayCaster({
        isObjectButtonPressed,
        setCoordinates,
        addObjectToScene,
        objectTypePressed,
        currCameraPos
  }: props){
  const world = useThree()
  const mouseCords = new THREE.Vector2()
  const raycaster = new THREE.Raycaster()

  useEffect(() => {
    const handleClick = (event) => {
      const intersect = raycaster.intersectObject(world.scene.getObjectByName("grid-plane-hidden-helper"));

      if (isObjectButtonPressed && intersect.length > 0) {
        let pointIntersect = intersect[0].point ;

        const distance = displacementDistance(objectTypePressed)

        switch (currCameraPos) {
          case CameraDirection.freeDrive:
            pointIntersect.setY(pointIntersect.y + distance);
            addObjectToScene(objectTypePressed, { position: pointIntersect });
            break;

          case CameraDirection.redTop:
            pointIntersect.setY(pointIntersect.y + distance);
            addObjectToScene(objectTypePressed, { position: pointIntersect });
            break;

          case CameraDirection.redBottom:
            pointIntersect.setY(pointIntersect.y - distance);
            addObjectToScene(objectTypePressed, { position: pointIntersect });
            break;

          case CameraDirection.blueFront:
            pointIntersect.setX(pointIntersect.x + distance);
            addObjectToScene(objectTypePressed, { position: pointIntersect });
            break;

          case CameraDirection.blueBack:
            pointIntersect.setX(pointIntersect.x - distance);
            addObjectToScene(objectTypePressed, { position: pointIntersect });
            break;

          case CameraDirection.greenFront:
            pointIntersect.setZ(pointIntersect.z + distance);
            addObjectToScene(objectTypePressed, { position: pointIntersect });
            break;

          case CameraDirection.greenBack:
            pointIntersect.setZ(pointIntersect.z + distance);
            addObjectToScene(objectTypePressed, { position: pointIntersect });
            break;

          default:
            console.log("Unknown object type");
        }
      }
    };

    const handleMouseMove = (event) => {
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      mouseCords.x = event.clientX / sizes.width * 2 - 1
      mouseCords.y = - (event.clientY / sizes.height) * 2 + 1
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isObjectButtonPressed, addObjectToScene, raycaster, world.scene]);

  useFrame(({ gl, scene, camera }) => {
    if(!isObjectButtonPressed){
      setCoordinates([camera.position.x, camera.position.y, camera.position.z])
    }

    if(isObjectButtonPressed){
      raycaster.setFromCamera(mouseCords, camera)
      let objectFound = world.scene.getObjectByName("grid-plane-hidden-helper")
      const intersect = raycaster.intersectObject(objectFound)

      if(intersect.length > 0){
        ActiveToolOverLay(
                          objectTypePressed,
                          intersect[0].point.x,
                          intersect[0].point.y,
                          intersect[0].point.z,
                          scene,
                          currCameraPos,
                          )
      }
    }

    gl.render(scene, camera)

    if(isObjectButtonPressed){
      DestroyActiveToolOverlay(objectTypePressed, scene)
    }
  }, 1);

  return null;
}

function ActiveToolOverLay(currTool: string, pointX: number, pointY: number, pointZ: number, scene: Object, currCameraPos: CameraDirection ){
  switch (currTool){
    
    case "cube": {
      var geometry = new THREE.PlaneGeometry(1, 1); // Width and height of the plane
      var material = new THREE.MeshBasicMaterial({
        color: 0x00ff00, // Green color
        side: THREE.DoubleSide // It's visible from both sides
      });
      var plane = new THREE.Mesh(geometry, material);
          
      plane.name = "temp plane"; // Set the name property of the plane

      if(currCameraPos === CameraDirection.freeDrive
            ||
        currCameraPos === CameraDirection.redTop
            ||
        currCameraPos === CameraDirection.redBottom
        ){
        plane.rotation.x = Math.PI / 2;
      }
      else if(
        currCameraPos === CameraDirection.blueBack
            ||
        currCameraPos === CameraDirection.blueFront ) {
        plane.rotation.y = Math.PI / 2;
      }
      
      let objectPlacePosition: [number, number, number] = objectPlacingPosition(
                                                                        currCameraPos,
                                                                        pointX,
                                                                        pointY,
                                                                        pointZ)

      // Set the position of the plane
      plane.position.set(objectPlacePosition[0], objectPlacePosition[1], objectPlacePosition[2]); 
          
      scene.add(plane);
      break;
    }

    case "sphere": {
      const geometry = new THREE.CircleGeometry(0.7, 32); // Using CircleGeometry for the overlay
      const material = new THREE.MeshBasicMaterial({ 
        color: 0x00ff00, 
        side: THREE.DoubleSide 
      });
      const circle = new THREE.Mesh(geometry, material);
      circle.name = "temp circle";


      if(currCameraPos === CameraDirection.freeDrive
            ||
        currCameraPos === CameraDirection.redTop
            ||
        currCameraPos === CameraDirection.redBottom
        ){
        circle.rotation.x = Math.PI / 2;
      }
      else if(
        currCameraPos === CameraDirection.blueBack
            ||
        currCameraPos === CameraDirection.blueFront ) {
        circle.rotation.y = Math.PI / 2;
      }
      
      let objectPlacePosition: [number, number, number] = objectPlacingPosition(
                                                                        currCameraPos,
                                                                        pointX,
                                                                        pointY,
                                                                        pointZ)

      // Set the position of the plane
      circle.position.set(objectPlacePosition[0], objectPlacePosition[1], objectPlacePosition[2]); 

      scene.add(circle);
      break;
    }

    case "cylinder": {
      const geometry = new THREE.CircleGeometry(0.5, 32); // Adjust the radius based on your cylinder's size
      const material = new THREE.MeshBasicMaterial({ 
        color: 0x00ff00, side: 
        THREE.DoubleSide 
      });
      const circle = new THREE.Mesh(geometry, material);
      circle.name = "temp cylinder";
      circle.rotation.x = Math.PI / 2;
      circle.position.set(pointX, 0.01, pointZ); // Slightly above the grid
      scene.add(circle);
      break;
    }

    case "cone": {
      const geometry = new THREE.CircleGeometry(0.5, 32); // Using CircleGeometry for the cone overlay
      const material = new THREE.MeshBasicMaterial({ 
        color: 0x00ff00, 
        side: THREE.DoubleSide 
      });
      const circle = new THREE.Mesh(geometry, material);
      circle.name = "temp cone-circle";
      circle.rotation.x = Math.PI / 2;
      circle.position.set(pointX, 0.01, pointZ); // Slightly above the grid
      scene.add(circle);
      break;
    }

    case "tetrahedron": {
      const geometry = new THREE.CircleGeometry(0.6, 3); // Using CircleGeometry with 3 segments to represent a triangle
      const material = new THREE.MeshBasicMaterial({ 
        color: 0x00ff00, 
        side: THREE.DoubleSide 
      });
      const triangle = new THREE.Mesh(geometry, material);
      triangle.name = "temp triangle";
      triangle.rotation.x = Math.PI / 2;
      triangle.position.set(pointX, 0.01, pointZ); // Slightly above the grid
      scene.add(triangle);
      break;
    }

    case "pyramid": {
      const geometry = new THREE.PlaneGeometry(1, 1);  // Using PlaneGeometry for a square base
      const material = new THREE.MeshBasicMaterial({ 
        color: 0x00ff00, 
        side: THREE.DoubleSide 
      });
      const pyramidBase = new THREE.Mesh(geometry, material);
      pyramidBase.name = "temp pyramidBase";
      pyramidBase.rotation.x = Math.PI / 2;  // Rotate to lie flat on the grid
      pyramidBase.position.set(pointX, 0.01, pointZ);
      scene.add(pyramidBase);
      break;
    }

    case "hemisphere": {
      const geometry = new THREE.CircleGeometry(0.7, 32); // Using CircleGeometry for the overlay
      const material = new THREE.MeshBasicMaterial({ 
        color: 0x00ff00, 
        side: THREE.DoubleSide 
      });
      const circle = new THREE.Mesh(geometry, material);
      circle.name = "temp hemisphere";
      circle.rotation.x = Math.PI / 2;
      circle.position.set(pointX, 0.01, pointZ); // Slightly above the grid
      scene.add(circle);
      break;
    }
  
    default: {
      console.log("Could not overlay current tool")
      break;
    }
  }
}

function DestroyActiveToolOverlay(currTool: string, scene: Object){
  switch (currTool){

    case "cube":{
      var existingPlane = scene.getObjectByName("temp plane");
      // If it exists, remove it from the scene
      if(existingPlane){
        scene.remove(existingPlane);

        // If you've created the plane using the Mesh object,
        // you'd also want to dispose of the geometry and material to ensure that you're freeing up the memory.
        existingPlane.geometry.dispose();
        existingPlane.material.dispose();
      }
      break;
    }

    case "sphere": {
      const existingCircle = scene.getObjectByName("temp circle");
      if (existingCircle) {
        scene.remove(existingCircle);
        existingCircle.geometry.dispose();
        existingCircle.material.dispose();
      }
      break;
    }

    case "cylinder": {
      const existingCylinder = scene.getObjectByName("temp cylinder");
      if (existingCylinder) {
        scene.remove(existingCylinder);
        existingCylinder.geometry.dispose();
        existingCylinder.material.dispose();
      }
      break;
    }

    case "cone": {
      const existingConeCircle = scene.getObjectByName("temp cone-circle");
      if (existingConeCircle) {
        scene.remove(existingConeCircle);
        existingConeCircle.geometry.dispose();
        existingConeCircle.material.dispose();
      }
      break;
    }

    case "tetrahedron": {
      const existingTriangle = scene.getObjectByName("temp triangle");
      if (existingTriangle) {
        scene.remove(existingTriangle);
        existingTriangle.geometry.dispose();
        existingTriangle.material.dispose();
      }
      break;
    }

    case "pyramid": {
      const existingPyramidBase = scene.getObjectByName("temp pyramidBase");
      if (existingPyramidBase) {
        scene.remove(existingPyramidBase);
        existingPyramidBase.geometry.dispose();
        existingPyramidBase.material.dispose();
      }
      break;
    }

    case "hemisphere": {
      const existingHemisphere = scene.getObjectByName("temp hemisphere");
      if (existingHemisphere) {
        scene.remove(existingHemisphere);
        existingHemisphere.geometry.dispose();
        existingHemisphere.material.dispose();
      }
      break;
    }

    default: {
      console.log(currTool)
      console.log("Could not delete active tool")
      break;
    }
  }
}



function objectPlacingPosition( currCameraPos: CameraDirection,  pointX: number, pointY: number, pointZ: number): [number, number, number] {
    switch (currCameraPos) {

        case CameraDirection.freeDrive: {
            return [pointX, -0.01, pointZ]
        }

        case CameraDirection.redTop: {
            return [pointX, -0.01, pointZ]
        }

        case CameraDirection.redBottom: {
            return [pointX, 0.01, pointZ]
        }

        case CameraDirection.greenFront: {
            return [pointX, pointY, 0]
        }

        case CameraDirection.greenBack: {
            return [pointX, pointY, 0]
        }

        case CameraDirection.blueFront: {
            return [0, pointY, pointZ]
        }

        case CameraDirection.blueBack: {
            return [0, pointY, pointZ]
        }

        default: {

        }
    }
    
    return [1,1,1];
}


function displacementDistance( shapeName: string ): number{
    switch (shapeName) {
      case 'cube':
        return 0.5;
      case 'sphere':
        return 0.7;
      case 'cylinder':
        return 0.5;
      case 'cone':
        return 0.5;
      case 'tetrahedron':
        return 0.5;
      case 'pyramid':
        return 0.5;
      case 'hemisphere':
        return 0.0;
      default:
        console.log("Unknown object type");
        return 0.0;
    }
}
