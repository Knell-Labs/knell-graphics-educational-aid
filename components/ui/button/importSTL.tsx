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
        
        // Compute the bounding box of the geometry
        const boundingBox = new THREE.Box3().setFromObject(new THREE.Mesh(geometry));
        
        // Compute the center of the bounding box
        const center = new THREE.Vector3();
        boundingBox.getCenter(center);
        
        // Translate the geometry to move its center to the origin
        geometry.translate(-center.x, -center.y, -center.z);
    
        const material = new THREE.MeshStandardMaterial();
        const mesh = new THREE.Mesh(geometry, material);
        
        // Explicitly set the scale
        mesh.scale.set(0.1, 0.1, 0.1);
    
        // Set the mesh's position to the origin
        mesh.position.set(0, 0, 0);
    
        // Add the loaded STL object to the main scene
        addObjectToScene('stlObject', { mesh });
    };

    return <input type="file" accept=".stl" onChange={handleFileChange} />;
};

export default STLImporter;
