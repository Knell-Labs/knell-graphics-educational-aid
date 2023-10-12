import React from "react";
import { Plane } from '@react-three/drei';
import { useEffect, useRef, useState} from 'react';
import * as THREE from 'three';


interface props {
  persCameraRef: React.RefObject<THREE.PerspectiveCamera>;
}


export function CadPlanes(props: props){
  const { persCameraRef } = props;
    


  function computeCamraPosRedClick(){
    if(persCameraRef.current){
        
        //Gets the camra normal vector
        let vector = new THREE.Vector3( 0, 0, -1 );
        vector.applyQuaternion(persCameraRef.current.quaternion);

        //If our camera is facing the "front" of the red Plane
        //which as a normal vector of [0,1,0] the the sign of the 
        //dot product with the normal vector of the camera 
        //result will always be negative. So we move the camra to 
        //the front of that plane. Other wise move carma to face 
        //The "back"
        if( vector.dot( new THREE.Vector3( 0, 1, 0) ) <  0 ){
            persCameraRef.current.position.set( 0, 25 ,0 ); 
        }else{
            persCameraRef.current.position.set( 0, -25 ,0 ); 
        }
    }
  }

  function computeCamraPosGreenClick(){
    if(persCameraRef.current){
        
        //Gets the camra normal vector
        let vector = new THREE.Vector3( 0, 0, -1 );
        vector.applyQuaternion(persCameraRef.current.quaternion);

        //If our camera is facing the "front" of the green Plane
        //which as a normal vector of [0,0,1] the the sign of the 
        //dot product with the normal vector of the camera 
        //result will always be negative. So we move the camra to 
        //the front of that plane. Other wise move carma to face 
        //The "back"
        if( vector.dot( new THREE.Vector3( 0, 0, 1) ) <  0 ){
            persCameraRef.current.position.set(0, 0, 25); 
        }else{
            persCameraRef.current.position.set(0, 0, -25); 
        }

    }
  }

  function computeCamraPosBlueClick(){
    if(persCameraRef.current){
        
        //Gets the camra normal vector
        let vector = new THREE.Vector3( 0, 0, -1 );
        vector.applyQuaternion(persCameraRef.current.quaternion);

        //If our camera is facing the "front" of the green Plane
        //which as a normal vector of [1,0,0] the the sign of the 
        //dot product with the normal vector of the camera 
        //result will always be negative. So we move the camra to 
        //the front of that plane. Other wise move carma to face 
        //The "back"
        if(vector.dot(new THREE.Vector3(1, 0, 0)) <  0){
            persCameraRef.current.position.set( 25, 0, 0); 
        }else{
            persCameraRef.current.position.set( -25, 0, 0); 
        }

    }
  }







  return (
    <>
      <Plane args={[20, 20]} 
        receiveShadow
        rotation={[0, 0, 0]}
        onClick={(e) => {
            e.stopPropagation();
            console.log("Clicked Green")
            computeCamraPosGreenClick()
        }}
        >
        <meshBasicMaterial
          side={THREE.DoubleSide}
          color="green"
          transparent={true}
          opacity={0.3}
        />
      </Plane>

      <Plane args={[20, 20]} 
        receiveShadow
        rotation={[Math.PI / 2, 0, 0]}
        onClick={(e) => {
            e.stopPropagation();
            console.log("Clicked Red")
            computeCamraPosRedClick()
        }}
        >
        <meshBasicMaterial
          side={THREE.DoubleSide}
          color="red"
          transparent={true}
          opacity={0.3}
        />
      </Plane>

      <Plane args={[20, 20]}
        receiveShadow
        rotation={[0, Math.PI / 2, 0 ]}
        onClick={(e) => {
            e.stopPropagation();
            console.log("Clicked Red")
            computeCamraPosBlueClick()
        }}
        >
        <meshBasicMaterial
          side={THREE.DoubleSide}
          color="blue"
          transparent={true}
          opacity={0.3}
        />
      </Plane>
  </>
  )
}
