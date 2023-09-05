import { ThreeElements } from '@react-three/fiber'
import { useRef, useState, useEffect} from 'react';
import { useCursor  } from '@react-three/drei'

import TransformCustomControls  from "../../components/controls/objectControls/TransformCustomControls"

export function TestBox(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  const [transformActive, setTransformActive] = useState(false);
  

  return ( 
    <>
    <mesh
      {...props}
      ref={ref}
      onClick={(event) => (event.stopPropagation(),setTransformActive(true))}
      onPointerMissed={(event) => event.type === 'click' && setTransformActive(false)}
      //onClick={() => setTransformActive(!transformActive)}
      //onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}
      >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={transformActive ? 'orange' : 'white'} />
    </mesh>
    {transformActive && <TransformCustomControls mesh = {ref}/>}
    </>
  )
}
