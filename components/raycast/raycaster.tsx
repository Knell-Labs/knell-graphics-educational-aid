import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, MouseEvent } from 'react';

interface props {
  isObjectButtonPressed: boolean;
}

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

export function RayCaster({isObjectButtonPressed}: props){

  const world = useThree()


  //const mouseCords = new THREE.Vector2()

  //document.addEventListener('mousemove', (event) => {
  //      mouseCords.x = event.clientX / sizes.width * 2 - 1
  //      mouseCords.y = - (event.clientY / sizes.height) * 2 + 1

  //      console.log("made ite ")
  //      console.log(mouseCords)
  //});

  useFrame(({ gl, scene, camera }) => {
      if(false){
        const raycaster = new THREE.Raycaster()
        const rayOrigin = new THREE.Vector3( 0, 2, 0)
        const rayDirection = new THREE.Vector3( 0, -1, 0)
        //rayDirection.normalize()
        raycaster.set(rayOrigin, rayDirection)

        let objectFound = world.scene.getObjectByName("test-plane")

        const intersect = raycaster.intersectObject(objectFound)
        console.log("intersect")
        console.log(objectFound)
        console.log(intersect)
        console.log(world.scene)
      }
    gl.render(scene, camera)

    }, 1)



  return null;
}
