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


  const mouseCords = new THREE.Vector2()


  useFrame(({ gl, scene, camera }) => {
      if(isObjectButtonPressed){
        document.addEventListener('mousemove', (event) => {
          mouseCords.x = event.clientX / sizes.width * 2 - 1
          mouseCords.y = - (event.clientY / sizes.height) * 2 + 1

        });

        const raycaster = new THREE.Raycaster()
        //rayDirection.normalize()
        raycaster.setFromCamera(mouseCords, camera)

        let objectFound = world.scene.getObjectByName("test-plane")

        const intersect = raycaster.intersectObject(objectFound)
        console.log("intersect")
        console.log(objectFound)
        console.log(intersect)
        console.log(world.scene)

        if(intersect.length > 0){
          var geometry = new THREE.PlaneGeometry(1, 1); // Width and height of the plane
          var material = new THREE.MeshBasicMaterial({
              color: 0x00ff00, // Green color
              side: THREE.DoubleSide // It's visible from both sides
          });
          var plane = new THREE.Mesh(geometry, material);
          
          plane.name = "temp plane"; // Set the name property of the plane
          plane.rotation.x = Math.PI / 2;
         
          plane.position.set(intersect[0].point.x, -.01, intersect[0].point.z);  // Set the position of the plane
          
          scene.add(plane);



        }

      }
      gl.render(scene, camera)

        var existingPlane = scene.getObjectByName("temp plane");
    // If it exists, remove it from the scene
    if (existingPlane) {
        scene.remove(existingPlane);

        // If you've created the plane using the Mesh object, you'd also want to dispose of the geometry and material to ensure that you're freeing up the memory.
        existingPlane.geometry.dispose();
        existingPlane.material.dispose();
    }

    }, 1)



  return null;
}
