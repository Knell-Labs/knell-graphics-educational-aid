import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import { Plane } from '@react-three/drei';
import { TransformCustomControls }  from "../../components/controls/objectControls/TransformCustomControls"

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
  const [transformActive, setTransformActive] = useState<boolean>(false);

  useEffect(() => {
    if (dirLight.current) {
      lightHelperRef.current = new THREE.DirectionalLightHelper(dirLight.current, 1, "white");
      // Add the helper to the scene
      dirLight.current.parent?.add(lightHelperRef.current);
    }
    
  }, []);


  useFrame(() => {

    if(lightHelperRef.current && planeRef.current) {
        planeRef.current.matrixWorld = lightHelperRef.current.lightPlane.matrixWorld;
    }
  });

  return (
    <>
      <Plane
        visible = {false}
        ref={planeRef}
        onClick= {() =>{
            setTransformActive(true) 
        }}
        onPointerMissed = { () => {
            setTransformActive(false) 
        }}

      />

      {transformActive && <TransformCustomControls mesh = { dirLight }/>}

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
