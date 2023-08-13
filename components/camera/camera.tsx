import { OrbitControls } from '@react-three/drei'

export function CustomCamera(){
    return (
        orbitContorlsCall()
    )
}

function orbitContorlsCall(){
    return (
        <>
            <OrbitControls enableDamping = { false } 
             position={[ 0, 5, 0]}
            />
        </>
    )
}
