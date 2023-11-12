import { ThreeElements, useFrame } from '@react-three/fiber';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useCursor } from '@react-three/drei'
import { TransformCustomControls } from "../../components/controls/objectControls/TransformCustomControls"

type CreateCylinderProps = {
  isObjectButtonPressed: boolean;
  color?: string;
  height?: number;
  radius?: number;
  radialSegments?: number;
} & ThreeElements['mesh'];

export function CreateCylinder({ isObjectButtonPressed, color, height = 1, radius = 0.5, radialSegments = 32, ...props }: CreateCylinderProps) {
  const cylinderRef = useRef<THREE.Mesh>(null!);
  const outlineRef = useRef<THREE.LineSegments>(null!);

  const [hovered, hover] = useState(false);
  const [transformActive, setTransformActive] = useState(false);
  const meshColor = color ? color : (transformActive ? 'orange' : 'white');
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
          }
        } }
        onPointerMissed = { (event) => event.type === 'click' && setTransformActive(false) }
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
