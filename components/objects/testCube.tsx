import { ThreeElements } from '@react-three/fiber'
import { useRef, useState, useEffect} from 'react';
import { OrbitControls, TransformControls } from '@react-three/drei'
import { TransformControlsProps } from '@react-three/drei';// need this


export function TestBox(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  //constants for scale rotate and translate in clude below
  const [mode, setMode] = useState<TransformControlsProps["mode"]>('translate')
//need a seperate file for controls
  useEffect(()=>{
    const onKeyPress = (e)=>{
      switch ( e.keyCode ) {

        case 84: // T
          setMode( 'translate' );
          break;

        case 82: // R
          setMode( 'rotate' );
          break;

        case 83: // S
          setMode( 'scale' );
          break;
      }
    }
    window.addEventListener( 'keydown', onKeyPress )
    
    return()=> window.removeEventListener('keydown',onKeyPress)
  },[])
//end of selection node
  return (
    //Transform Controls( add this to every shape)
    <TransformControls mode = {mode} >
    
    <mesh
      {...props}
      ref={ref}
      //scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  </TransformControls>
  )
}
