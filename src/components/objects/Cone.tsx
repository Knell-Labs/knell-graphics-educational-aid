import { ThreeElements, useFrame  } from '@react-three/fiber';
import { useRef, useState, useMemo } from 'react';
import { Dispatch, SetStateAction } from "react";
import * as THREE from 'three';
import { useCursor  } from '@react-three/drei'
import {TransformCustomControls}  from "../../components/controls/objectControls/TransformCustomControls"

type CreateConeProps = {
  setObjectClicked: Dispatch<SetStateAction<THREE.Mesh | null>>;
  isObjectButtonPressed: boolean;
  color?: string;
  radius?: number;
  height?: number;
  radialSegments?: number;
} & ThreeElements['mesh'];

export function CreateCone({ setObjectClicked,isObjectButtonPressed, color, radius = 0.5, height = 1, radialSegments = 32, ...props }: CreateConeProps) {
  const coneRef = useRef<THREE.Mesh>(null!);
  const outlineRef = useRef<THREE.LineSegments>(null!);

  const [hovered, hover] = useState(false);
  const [transformActive, setTransformActive] = useState(false);
  const meshColor = color ? color : (transformActive ? 'white' : 'white'); 
  const groupRef = useRef<THREE.Group>(null);
  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial( { color: 0x000000, depthTest: true, opacity: 0.5, transparent: true } ), []);

  useCursor(hovered)

  useFrame(() => {
    if (groupRef.current){
      groupRef.current.type = "ConeGroup"
    }
    if (coneRef.current && outlineRef.current) {
      outlineRef.current.position.copy(coneRef.current.position);
      outlineRef.current.rotation.copy(coneRef.current.rotation);
      outlineRef.current.scale.copy(coneRef.current.scale);
    }
  });
  
  return (
    <group ref = { groupRef }>
      <mesh
        {...props}
        ref = { coneRef }
        
        onClick= { (event) => {
            if(!isObjectButtonPressed){
                (event.stopPropagation(), setTransformActive(true))
                setObjectClicked(coneRef.current)
            }
        }}
        onPointerMissed = { (event) => {
          (event.type === 'click' && setTransformActive(false))
          setObjectClicked(null);
       }}
        onPointerOver   = { (event) => (event.stopPropagation(), hover(true)) }
        onPointerOut    = { (event) => hover(false) }
      >
        <coneGeometry args = { [radius, height, radialSegments] } />
        <meshStandardMaterial color = { meshColor } />
      </mesh>

      {transformActive && <TransformCustomControls mesh = { coneRef }/>}

      <lineSegments ref = { outlineRef } material = { lineMaterial }>
        <edgesGeometry attach = "geometry" args = { [new THREE.ConeGeometry(radius, height, radialSegments)] } />
      </lineSegments>
    </group>
  )
}
