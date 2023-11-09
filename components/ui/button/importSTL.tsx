import React, { useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { TransformCustomControls } from "../../../components/controls/objectControls/TransformCustomControls";
import { Dispatch, SetStateAction } from "react";

interface STLImporterProps {
    addObjectToScene: (type: string, props?: any) => void;
    color?: string;
    size?: [number, number, number];
    setObjectClicked: Dispatch<SetStateAction<THREE.Mesh | null>>;
    isObjectButtonPressed: boolean;
}

// This hook can now be exported and used by the toolPanel
export const STLImporter = (
    addObjectToScene: (type: string, props?: any) => void,
    setObjectClicked: Dispatch<SetStateAction<THREE.Mesh | null>>,
    isObjectButtonPressed: boolean,
    color = 'white',
    size: [number, number, number] = [0.1, 0.1, 0.1]
) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    const [transformActive, setTransformActive] = useState(false);

    const loadSTL = useCallback((buffer: ArrayBuffer) => {
        const loader = new STLLoader();
        const geometry = loader.parse(buffer);
        const boundingBox = new THREE.Box3().setFromObject(new THREE.Mesh(geometry));
        const center = new THREE.Vector3();
        boundingBox.getCenter(center);
        geometry.translate(-center.x, -center.y, -center.z);
    
        const material = new THREE.MeshStandardMaterial({ color });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(...size);
        mesh.position.set(0, 0, 0);
    
        addObjectToScene('stlObject', { mesh });
        setObjectClicked(mesh);
    }, [addObjectToScene, setObjectClicked, color, size]);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = (event) => {
                const buffer = event.target?.result;
                if (buffer instanceof ArrayBuffer) {
                  loadSTL(buffer);
                } else {
                  // Handle the error case here
                  console.error('File read did not result in an ArrayBuffer.');
                }
              };
        }
    }, [loadSTL]);

    return {
        meshRef,
        transformActive,
        setTransformActive,
        handleFileChange
    };
}
