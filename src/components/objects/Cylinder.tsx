import { ThreeElements, useFrame } from '@react-three/fiber';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { Dispatch, SetStateAction } from "react";
import { useCursor } from '@react-three/drei'
import { TransformCustomControls } from "../../components/controls/objectControls/TransformCustomControls"

type CreateCylinderProps = {
  setObjectClicked: Dispatch<SetStateAction<THREE.Mesh | null>>;
  isObjectButtonPressed: boolean;
  color?: string;
  height?: number;
  radius?: number;
  radialSegments?: number;
} & ThreeElements['mesh'];

export function CreateCylinder({ setObjectClicked,isObjectButtonPressed, color, height = 1, radius = 0.5, radialSegments = 32, ...props }: CreateCylinderProps) {
  const cylinderRef = useRef<THREE.Mesh>(null!);
  const outlineRef = useRef<THREE.LineSegments>(null!);

  const [hovered, hover] = useState(false);
  const [transformActive, setTransformActive] = useState(false);
  const meshColor = color ? color : (transformActive ? 'white' : 'white');
  const groupRef = useRef<THREE.Group>(null);
  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({ color: 0x000000, depthTest: true, opacity: 0.5, transparent: true }), []);

  useCursor(hovered)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.type = "CylinderGroup"
    }
    if (cylinderRef.current && outlineRef.current) {
      outlineRef.current.position.copy(cylinderRef.current.position);
      outlineRef.current.rotation.copy(cylinderRef.current.rotation);
      outlineRef.current.scale.copy(cylinderRef.current.scale);
    }
  });

  return (
    <group ref = { groupRef }>
      <mesh
        {...props}
        ref = { cylinderRef }

        onClick = { (event) => {
          if (!isObjectButtonPressed) {
            (event.stopPropagation(), setTransformActive(true))
            setObjectClicked(cylinderRef.current)
          }
        } }
        onPointerMissed = { (event) => {
          (event.type === 'click' && setTransformActive(false))
          setObjectClicked(null);
       }}
        onPointerOver   = { (event) => (event.stopPropagation(), hover(true)) }
        onPointerOut    = { (event) => hover(false) }
      >
        <cylinderGeometry args      = { [radius, radius, height, radialSegments] } />
        <meshStandardMaterial color = { meshColor } />
      </mesh>

      { transformActive && <TransformCustomControls mesh = { cylinderRef } />}

      <lineSegments ref = { outlineRef } material = { lineMaterial }>
        <edgesGeometry attach = "geometry" args = { [new THREE.CylinderGeometry(radius, radius, height, radialSegments)] } />
      </lineSegments>
    </group>
  )
}
