import { ThreeElements } from '@react-three/fiber';
import { useRef, useState } from 'react';

export function CreateCube(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>

      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}