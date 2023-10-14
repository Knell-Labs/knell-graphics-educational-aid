import React from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

interface STLImporterProps {
    addObjectToScene: (type: string, props?: any) => void;
}

const STLImporter: React.FC<STLImporterProps> = ({ addObjectToScene }) => {
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
        
        // Center the geometry
        geometry.center();
    
        const material = new THREE.MeshStandardMaterial();
        const mesh = new THREE.Mesh(geometry, material);
        
        // Set the mesh's position to the origin
        mesh.position.set(0, 0, 0);
    
        // Add the loaded STL object to the main scene
        addObjectToScene('stlObject', { mesh });
    };

    return <input type="file" accept=".stl" onChange={handleFileChange} />;
};

export default STLImporter;
