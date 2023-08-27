import * as THREE from 'three';
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react';

interface props {
  isObjectButtonPressed: boolean;
}


export function RayCaster({isObjectButtonPressed}: props){

  const world = useThree()
  useEffect(() => {
    if(isObjectButtonPressed){
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

  }, [isObjectButtonPressed]);



  return (
    <>
    </>
  )
}
