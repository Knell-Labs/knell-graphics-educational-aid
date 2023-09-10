import { OrbitControls } from '@react-three/drei'

export function CustomCameraControls(){
    return (
        orbitContorlsCall()
    )
}


function orbitContorlsCall(){
    return (
        <>
            <OrbitControls 
             enableDamping = { false } 
             makeDefault
            />
        </>
    )
}
