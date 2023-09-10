import { ThreeElements } from '@react-three/fiber';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';

type CreateCubeProps = {
  color?: string;
  size?: [number, number, number];
} & ThreeElements['mesh'];

export function CreateCube({ color, size = [1, 1, 1], ...props }: CreateCubeProps) {
  const position = props.position; 
  const cubeRef = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  // If color prop is provided, use it; otherwise, use existing logic             //depthTest: true  = not-transparent
  const meshColor = color ? color : (hovered ? 'hotpink' : 'orange');             //depthTest: false = transparent
  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial( { color: 0x000000, depthTest: true, opacity: 0.5, transparent: true } ), []);
  const scaleValue = clicked ? 1.5 : 1;

  return (
    <group position = { position }>
      <mesh
        ref = { cubeRef }
        
        scale         = { [scaleValue, scaleValue, scaleValue] }
        onClick       = { (event) => click(!clicked) }
        onPointerOver = { (event) => hover(true) }
        onPointerOut  = { (event) => hover(false) }>

        <boxGeometry args = { size } />
        <meshStandardMaterial color = { meshColor } />
      </mesh>

      <lineSegments scale = { [scaleValue, scaleValue, scaleValue] } material = { lineMaterial }>
        <edgesGeometry attach="geometry" args = { [new THREE.BoxGeometry(...size)] } />
      </lineSegments>
    </group>
  )
}