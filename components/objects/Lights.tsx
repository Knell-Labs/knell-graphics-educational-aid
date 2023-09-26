import { ThreeElements, useFrame  } from '@react-three/fiber';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useCursor  } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { useHelper } from '@react-three/drei';

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
  useHelper(dirLight, THREE.DirectionalLightHelper, 1, "white");

  return (
    <>
      <directionalLight 
        scale={3}
        color={"#FFFFFF"}
        intensity={1}
        position={[5,5,5]}
        ref={dirLight} 
      />
    </>
  );}
