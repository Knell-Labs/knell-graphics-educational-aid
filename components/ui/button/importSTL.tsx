import React, { useRef, useState } from 'react';
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

export function STLImporter({ 
    addObjectToScene, 
    color = 'white', 
    size = [0.1, 0.1, 0.1], 
    setObjectClicked, 
    isObjectButtonPressed 
}: STLImporterProps) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const [transformActive, setTransformActive] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = (event) => {
                const buffer = event.target?.result as ArrayBuffer;
                loadSTL(new Uint8Array(buffer));
            };
        }
    };

    const loadSTL = (buffer: Uint8Array) => {
        const loader = new STLLoader();
        const geometry = loader.parse(buffer);
        
        // Compute the bounding box of the geometry
        const boundingBox = new THREE.Box3().setFromObject(new THREE.Mesh(geometry));
        
        // Compute the center of the bounding box
        const center = new THREE.Vector3();
        boundingBox.getCenter(center);
        
        // Translate the geometry to move its center to the origin
        geometry.translate(-center.x, -center.y, -center.z);
    
        const material = new THREE.MeshStandardMaterial({ color });
        const mesh = new THREE.Mesh(geometry, material);
        
        // Explicitly set the scale
        mesh.scale.set(...size);
    
        // Set the mesh's position to the origin
        mesh.position.set(0, 0, 0);
    
        // Add the loaded STL object to the main scene
        addObjectToScene('stlObject', { mesh });
    };

    return (
        <>
            <input type="file" accept=".stl" onChange={handleFileChange} />
            <mesh
                ref={meshRef}
                onClick={(event) => {
                    if (!isObjectButtonPressed) {
                        event.stopPropagation();
                        setTransformActive(true);
                        setObjectClicked(meshRef.current);
                    }
                }}
                onPointerMissed={() => {
                    setTransformActive(false);
                    setObjectClicked(null);
                }}
            >
                {transformActive && <TransformCustomControls mesh={meshRef} />}
            </mesh>
        </>
    );
}
