import { ThreeElements, useFrame } from '@react-three/fiber';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { Dispatch, SetStateAction } from "react";
import { useCursor } from '@react-three/drei';
import { TransformCustomControls } from "../../components/controls/objectControls/TransformCustomControls";

type CreateSphereProps = {
  setObjectClicked: Dispatch<SetStateAction<THREE.Mesh | null>>;
  isObjectButtonPressed: boolean;
  color?: string;
  radius?: number;
  radialSegments?: number;
} & ThreeElements['mesh'];


export function CreateSphere({ setObjectClicked,isObjectButtonPressed, color, radius = 0.5, radialSegments = 32, ...props }: CreateSphereProps) {
  const sphereRef = useRef<THREE.Mesh>(null!);
  const outlineRef = useRef<THREE.LineSegments>(null!);

  const [hovered, hover] = useState(false);
  const [transformActive, setTransformActive] = useState(false);
  const meshColor = color ? color : (transformActive ? 'white' : 'white');
  const groupRef = useRef<THREE.Group>(null);
  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({ color: 0x000000, depthTest: true, opacity: 0.5, transparent: true }), []);

  useCursor(hovered)

  useFrame(() => {
    if (groupRef.current){
      groupRef.current.type = "SphereGroup"
    }
    if (sphereRef.current && outlineRef.current) {
      outlineRef.current.position.copy(sphereRef.current.position);
      outlineRef.current.rotation.copy(sphereRef.current.rotation);
      outlineRef.current.scale.copy(sphereRef.current.scale);
    }
  });

  return (
    <group ref = { groupRef }>
      <mesh
        {...props}
        ref = { sphereRef }

        onClick= { (event) => {
            if(!isObjectButtonPressed){
                (event.stopPropagation(), setTransformActive(true))
                setObjectClicked(sphereRef.current)
            }
        }}
        onPointerMissed = { (event) => {
           (event.type === 'click' && setTransformActive(false))
           setObjectClicked(null);
        }}
        onPointerOver   = { (event) => (event.stopPropagation(), hover(true)) }
        onPointerOut    = { (event) => hover(false) }
      >
        <sphereGeometry args = { [radius, radialSegments, radialSegments] } />
        <meshStandardMaterial color = { meshColor } />
      </mesh>

      {transformActive && <TransformCustomControls mesh = { sphereRef } />}

      <lineSegments ref = {outlineRef} material = { lineMaterial }>
        <edgesGeometry attach = "geometry" args = { [new THREE.SphereGeometry(radius, radialSegments, radialSegments)] } />
      </lineSegments>
    </group>
  )
}
