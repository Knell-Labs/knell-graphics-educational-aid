import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import { Plane } from '@react-three/drei';
import { TransformCustomControls }  from "../../components/controls/objectControls/TransformCustomControls"
import { useCursor  } from '@react-three/drei'


type lightProps = {
  isObjectButtonPressed: boolean;
}

export function AmbientLightFunc(){

  const ambientLightRef = useRef<THREE.AmbientLight>(null!);


  return(
    <ambientLight 
      ref = { ambientLightRef }
      intensity = {0.1} position = { [4,4,4] }
    />
 )
}


export function  DirectLightFunc({isObjectButtonPressed}:  lightProps){
  const [hovered, hover] = useState(false);
  const dirLight = useRef<THREE.DirectionalLight>(null);
  const planeRef = useRef<THREE.Mesh>(null);
  const lightHelperRef = useRef<THREE.DirectionalLightHelper | null>(null);
  const [transformActive, setTransformActive] = useState<boolean>(false);
  const groupRef = useRef<THREE.Group>(null);

  useCursor(hovered)

  useEffect(() => {
    if (dirLight.current) {
      lightHelperRef.current = new THREE.DirectionalLightHelper(dirLight.current, 1, "white");
      // Add the helper to the scene
      dirLight.current.parent?.add(lightHelperRef.current);
    }
    
  }, []);


  useFrame(() => {
    if(groupRef.current){
        groupRef.current.type = "DirLightGroup"
    }

    if(lightHelperRef.current && planeRef.current) {
        planeRef.current.matrixWorld = lightHelperRef.current.lightPlane.matrixWorld;
    }
  });

  return (
    <group ref = {groupRef}>
      <Plane
        visible = {false}
        ref={planeRef}




        onClick= { (event) => {
            if(!isObjectButtonPressed){
                (event.stopPropagation(), setTransformActive(true))
            }
        }}
        onPointerMissed = { (event) => event.type === 'click' && setTransformActive(false) }
        onPointerOver   = { (event) => (event.stopPropagation(), hover(true)) }
        onPointerOut    = { (event) => hover(false) }




      />

      {transformActive && <TransformCustomControls mesh = { dirLight }/>}

      <directionalLight 
        color={"#FFFFFF"}
        intensity={1}
        position={[5,5,5]}
        ref={dirLight} 
      />
    </group>
  );
}
