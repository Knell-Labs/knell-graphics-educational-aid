import { useState, useEffect} from 'react';
import { TransformControls ,TransformControlsProps} from '@react-three/drei'//and this
interface TransformCustomControlsProps {
    mesh: THREE.Mesh
}
export function TransformCustomControls<TransformCustomControlsProps>({ mesh }) {
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
    return (
        <TransformControls object={mesh} mode = {mode} onChange={e => console.log(e)}></TransformControls>
    )
}
