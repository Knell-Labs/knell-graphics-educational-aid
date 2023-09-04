import { ThreeElements } from '@react-three/fiber';
import { useRef, useState } from 'react';

type CreateCubeProps = {
  color?: string;
  size?: [number, number, number];
} & ThreeElements['mesh'];

export function CreateCube({ color, size = [1, 1, 1], ...props }: CreateCubeProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  // If color prop is provided, use it; otherwise, use existing logic
  const meshColor = color ? color : (hovered ? 'hotpink' : 'orange');

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}

      onClick       = {(event) => click(!clicked)}
      onPointerOver = {(event) => hover(true)}
      onPointerOut  = {(event) => hover(false)}>

      <boxGeometry args={size} />
      <meshStandardMaterial color={meshColor} />
    </mesh>
  )
}
