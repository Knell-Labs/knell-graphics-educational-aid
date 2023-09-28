import { ThreeElements, useFrame  } from '@react-three/fiber';
import { useEffect, useRef, useState, useMemo } from 'react';
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
  const lightHelperRef = useRef<THREE.DirectionalLightHelper | null>(null);

  useEffect(() => {
    if (dirLight.current) {
      lightHelperRef.current = new THREE.DirectionalLightHelper(dirLight.current, 1, "white");
      // Add the helper to the scene
      dirLight.current.parent?.add(lightHelperRef.current);
    }
    
    //return () => {
    //  // Cleanup on component unmount
    //  if (lightHelperRef.current) {
    //    lightHelperRef.current.parent?.remove(lightHelperRef.current);
    //    lightHelperRef.current.dispose();
    //  }
    //};
  }, []);


  useFrame(() => {

    if (lightHelperRef.current && planeRef.current) {
    //  //planeRef.matrixWorld
    //  console.log(planeRef.current)
    //  console.log(lightHelperRef.current.lightPlane);
      //planeRef.current.matrixWorld = lightHelperRef.current.lightPlane.matrixWorld;
    //  planeRef.current.matrix = lightHelperRef.current.lightPlane.matrix;
    //  
    //  // Example: Accessing the color property of the helper
    //  //
    //  //lightHelperRef.current.targetLine.visible = false
    //  //lightHelperRef.current.lightPlane.visible = false
    //  //console.log(lightHelperRef.current.targetLine);
    //  let vertices = lightHelperRef.current.lightPlane.geometry.attributes.position.array
    //  //console.log(vertices)
    //  //for (let i = 0; i < vertices.length; i=i+3) {
    //  ////      //a vertex' position is (vertices[i],vertices[i+1],vertices[i+2])
    //  //      console.log(vertices[i],vertices[i+1],vertices[i+2])
    //  //}
    }



    //console.log(lightHelperRef);
    //if (cubeRef.current && outlineRef.current) {
    //  outlineRef.current.position.copy(cubeRef.current.position);
    //  outlineRef.current.rotation.copy(cubeRef.current.rotation);
    //  outlineRef.current.scale.copy(cubeRef.current.scale);
    //}
  });

  return (
    <>

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

      <TransformCustomControls mesh = { planeRef }/>

      <directionalLight 
        onClick={()=>{
            console.log("here")
        }}
        color={"#FFFFFF"}
        intensity={1}
        position={[5,5,5]}
        ref={dirLight} 
      />
    </>
  );
}
