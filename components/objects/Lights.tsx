import { ThreeElements, useFrame  } from '@react-three/fiber';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useCursor  } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { useHelper } from '@react-three/drei';
import { Plane } from '@react-three/drei';
import {TransformCustomControls}  from "../../components/controls/objectControls/TransformCustomControls"

export function AmbientLightFunc(){

  const ambientLightRef = useRef<THREE.AmbientLight>(null!);


  return(
    <ambientLight 
      ref = { ambientLightRef }
      intensity = {0.1} position = { [4,4,4] }
    />
 )
}


export function  DirectLightFunc(){
  const dirLight = useRef<THREE.DirectionalLight>(null);

  const planeRef = useRef<THREE.Mesh>(null);

  useHelper(dirLight, THREE.DirectionalLightHelper, 1, "white");


  useFrame(() => {
    //if (cubeRef.current && outlineRef.current) {
    //  outlineRef.current.position.copy(cubeRef.current.position);
    //  outlineRef.current.rotation.copy(cubeRef.current.rotation);
    //  outlineRef.current.scale.copy(cubeRef.current.scale);
    //}
  });

  return (
    <group>

      <Plane
        ref={planeRef}
        visible = {false}
        position = {
          [
            dirLight.current?.position.x || 0,
            dirLight.current?.position.y || 0,
            dirLight.current?.position.z || 0
          ]
        }
        rotation = {
          [
            dirLight.current?.rotation.x || 0,
            dirLight.current?.rotation.y || 0,
            dirLight.current?.rotation.z || 0
          ]
        }
      />


      <directionalLight 
        onClick={()=>{
            console.log("here")
        }}
        color={"#FFFFFF"}
        intensity={1}
        position={[5,5,5]}
        ref={dirLight} 
      />
    </group>
  );
}
