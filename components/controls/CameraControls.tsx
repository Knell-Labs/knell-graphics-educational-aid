import { OrbitControls } from '@react-three/drei'

export function CustomCameraControls(){
    return (
        orbitContorlsCall()
    )
}


function orbitContorlsCall(){
    return (
        <>
            <OrbitControls enableDamping = { false } 
             position={[ 0, 5, 0]}
             makeDefault
            />
        </>
    )
}
