import { ThreeElements } from '@react-three/fiber';
import { useRef, useState, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useCursor  } from '@react-three/drei'
import {TransformCustomControls}  from "../../components/controls/objectControls/TransformCustomControls"

type CreateCubeProps = {
  color?: string;
  size?: [number, number, number];
} & ThreeElements['mesh'];

export function CreateCube({ color, size = [1, 1, 1], ...props }: CreateCubeProps) {
  const [currentPosition, setCurrentPosition] = useState(props.position)
  const cubeRef = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [transformActive, setTransformActive] = useState(false);
  const meshColor = color ? color : (transformActive ? 'orange' : 'white'); 
  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial( { color: 0x000000, depthTest: true, opacity: 0.5, transparent: true } ), []);

  useCursor(hovered)

  useEffect(() => {
    if (cubeRef.current) {
      setCurrentPosition(cubeRef.current.position);
    }
  }, [cubeRef.current?.position]);
  
  return (
    <group>
      <mesh
        {...props}
        position = { currentPosition }
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

      <lineSegments position = { currentPosition } material = { lineMaterial }>
        <edgesGeometry attach = "geometry" args = { [new THREE.BoxGeometry(...size)] } />
      </lineSegments>
    </group>
  )
}