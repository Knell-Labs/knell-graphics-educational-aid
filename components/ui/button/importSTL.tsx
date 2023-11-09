import React, { useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { TransformCustomControls } from "../../../components/controls/objectControls/TransformCustomControls";
import { Dispatch, SetStateAction } from "react";
import { useCursor } from '@react-three/drei';

interface STLImporterProps {
    addObjectToScene: (type: string, props?: any) => void;
    setObjectClicked: Dispatch<SetStateAction<THREE.Mesh | null>>;
    isObjectButtonPressed: boolean;
    color?: string;
}

export const useSTLImporter = (
    addObjectToScene: (type: string, props?: any) => void,
    setObjectClicked: Dispatch<SetStateAction<THREE.Mesh | null>>,
    isObjectButtonPressed: boolean,
    color = 'white',
    size: [number, number, number] = [0.1, 0.1, 0.1]
) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [transformActive, setTransformActive] = useState(false);

    const loadSTL = useCallback((buffer: ArrayBuffer) => {
        const loader = new STLLoader();
        const geometry = loader.parse(buffer);
        const material = new THREE.MeshStandardMaterial({ color });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(...size);
        mesh.rotation.x = -Math.PI / 2; // Rotate 90 degrees on the X-axis
        addObjectToScene('stlObject', { mesh });
        setObjectClicked(mesh);
    }, [addObjectToScene, setObjectClicked, color, size]);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = (e) => {
                const buffer = e.target?.result;
                if (buffer instanceof ArrayBuffer) {
                    loadSTL(buffer);
                } else {
                    console.error('File read did not result in an ArrayBuffer.');
                }
            };
            reader.onerror = (e) => {
                console.error('FileReader error: ', e);
            };
        }
    }, [loadSTL]);

    return {
        meshRef,
        transformActive,
        setTransformActive,
        handleFileChange
    };
};

export function STLImporter({ 
    addObjectToScene, 
    setObjectClicked, 
    isObjectButtonPressed, 
    color = 'white'
}: STLImporterProps) {
    const {
        meshRef,
        transformActive,
        setTransformActive,
        handleFileChange
    } = useSTLImporter(addObjectToScene, setObjectClicked, isObjectButtonPressed, color);

    const [hovered, hover] = useState(false);
    useCursor(hovered);

    return (
        <group>
            <mesh
                ref={meshRef}
                onClick={(event) => {
                    console.log("Mesh clicked");
                    if (!isObjectButtonPressed) {
                        event.stopPropagation();
                        setTransformActive(true);
                        setObjectClicked(meshRef.current);
                    }
                }}
                onPointerMissed={() => {
                    console.log("Pointer missed");
                    setTransformActive(false);
                    setObjectClicked(null);
                }}
                onPointerOver={(event) => {
                    console.log("Pointer over");
                    event.stopPropagation();
                    hover(true);
                }}
                onPointerOut={() => {
                    console.log("Pointer out");
                    hover(false);
                }}
            >
            </mesh>

            {transformActive && <TransformCustomControls mesh={meshRef.current} setTransformActive={setTransformActive} />}

            <input type="file" onChange={handleFileChange} style={{ display: 'none' }} ref={element => element && element.click()} />
        </group>
    );
}
