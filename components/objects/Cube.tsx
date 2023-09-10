import { ThreeElements, useFrame  } from '@react-three/fiber';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useCursor  } from '@react-three/drei'
import {TransformCustomControls}  from "../../components/controls/objectControls/TransformCustomControls"

type CreateCubeProps = {
  color?: string;
  size?: [number, number, number];
} & ThreeElements['mesh'];

export function CreateCube({ color, size = [1, 1, 1], ...props }: CreateCubeProps) {
  const cubeRef = useRef<THREE.Mesh>(null!);
  const outlineRef = useRef<THREE.LineSegments>(null!);

  const [hovered, hover] = useState(false);
  const [transformActive, setTransformActive] = useState(false);
  const meshColor = color ? color : (transformActive ? 'orange' : 'white'); 
  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial( { color: 0x000000, depthTest: true, opacity: 0.5, transparent: true } ), []);

  useCursor(hovered)

  useFrame(() => {
    if (cubeRef.current && outlineRef.current) {
      outlineRef.current.position.copy(cubeRef.current.position);
    }
  });
  
  return (
    <group>
      <mesh
        {...props}
        ref = { cubeRef }
        
        onClick         = { (event) => (event.stopPropagation(),setTransformActive(true)) }
        onPointerMissed = { (event) => event.type === 'click' && setTransformActive(false) }
        onPointerOver   = { (event) => (event.stopPropagation(), hover(true)) }
        onPointerOut    = { (event) => hover(false) }
      >
        <boxGeometry args = { size } />
        <meshStandardMaterial color = { meshColor } />
      </mesh>

      {transformActive && <TransformCustomControls mesh = { cubeRef }/>}

      <lineSegments ref = { outlineRef } material = { lineMaterial }>
        <edgesGeometry attach = "geometry" args = { [new THREE.BoxGeometry(...size)] } />
      </lineSegments>
    </group>
  )
}