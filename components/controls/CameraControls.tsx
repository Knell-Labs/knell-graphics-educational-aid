import { OrbitControls } from '@react-three/drei'

import React, { useEffect, useRef } from 'react';

import * as THREE from 'three'

export function CustomCameraControls(){
    return (
        orbitContorlsCall()
    )
}

function orbitContorlsCall() {
    const controlsRef = useRef();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Control' && controlsRef.current) {
                controlsRef.current.enabled = true;
            }
        };

        const handleKeyUp = (event) => {
            if (event.key === 'Control' && controlsRef.current) {
                controlsRef.current.enabled = false;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <OrbitControls
            ref={controlsRef}
            enableDamping={false}
            enabled={false}  // Initially set to false
            makeDefault
            mouseButtons={{ LEFT: THREE.MOUSE.PAN, RIGHT: THREE.MOUSE.ROTATE }}
        />
    );
}

