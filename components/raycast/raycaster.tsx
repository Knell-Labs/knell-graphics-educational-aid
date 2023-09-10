import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { Dispatch, SetStateAction, useEffect } from "react";

interface props {
  isObjectButtonPressed: boolean;
  setCoordinates: Dispatch<SetStateAction<number[]>>;
  isOrthographic: boolean
}



export function RayCaster({isObjectButtonPressed, setCoordinates, isOrthographic}: props){
  const world = useThree()

  let getCameraCords: boolean = false;

  useEffect(() => {
    getCameraCords = true 
  }, [isOrthographic])

  const mouseCords = new THREE.Vector2()
  useFrame(({ gl, scene, camera }) => {

      if(getCameraCords){
        setCoordinates([camera.position.x, camera.position.y, camera.position.z])
        getCameraCords = false;
      }

      if(isObjectButtonPressed){
        const sizes = {
          width: window.innerWidth,
          height: window.innerHeight
        }

        document.addEventListener('mousemove', (event) => {
          mouseCords.x = event.clientX / sizes.width * 2 - 1
          mouseCords.y = - (event.clientY / sizes.height) * 2 + 1
        });

        const raycaster = new THREE.Raycaster()

        raycaster.setFromCamera(mouseCords, camera)

        let objectFound = world.scene.getObjectByName("grid-plane-hidden-helper")

        const intersect = raycaster.intersectObject(objectFound)

        if(intersect.length > 0){
          ActiveToolOverLay("cube", intersect[0].point.x, intersect[0].point.z, scene)
        }

      }

      gl.render(scene, camera)
      
      if(isObjectButtonPressed){
        DestroyActiveToolOverlay("cube", scene)
      }
    }, 1)

  return null;
}

function ActiveToolOverLay(currTool: string, pointX: number, pointZ: number, scene: Object){
  switch (currTool){
    case "cube": {

      var geometry = new THREE.PlaneGeometry(1, 1); // Width and height of the plane
      var material = new THREE.MeshBasicMaterial({
        color: 0x00ff00, // Green color
        side: THREE.DoubleSide // It's visible from both sides
      });
      var plane = new THREE.Mesh(geometry, material);
          
      plane.name = "temp plane"; // Set the name property of the plane
      plane.rotation.x = Math.PI / 2;
         
      // Set the position of the plane
      plane.position.set(pointX, -.01, pointZ); 
          
      scene.add(plane);
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
    default: {
      console.log(currTool)
      console.log("Could not delete active tool")
      break;
    }
  }
}
