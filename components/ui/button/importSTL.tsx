import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { TransformCustomControls } from "../../../components/controls/objectControls/TransformCustomControls";
import { Dispatch, SetStateAction } from "react";
import { useFrame } from '@react-three/fiber';

type STLImporterProps = {
  mesh: THREE.Mesh;
  setObjectClicked: React.Dispatch<React.SetStateAction<THREE.Mesh | null>>;
  setObjectClickedUUID: React.Dispatch<React.SetStateAction<string | null>>;
  isObjectButtonPressed: boolean;
};

export function STLImporter({ mesh, setObjectClicked, setObjectClickedUUID, isObjectButtonPressed }: STLImporterProps) {
  const meshRef = useRef<THREE.Mesh>(mesh);
  const outlineRef = useRef<THREE.LineSegments>(null!);
  const [transformActive, setTransformActive] = useState(false);

  useFrame(() => {
    if (meshRef.current && outlineRef.current) {
      outlineRef.current.position.copy(meshRef.current.position);
      outlineRef.current.rotation.copy(meshRef.current.rotation);
      outlineRef.current.scale.copy(meshRef.current.scale);
    }
  });

  return (
    <group>
      <primitive 
        object  = { meshRef.current } 
        onClick = { (event) => {
          if (!isObjectButtonPressed) {
            event.stopPropagation();
            setTransformActive(true);
            setObjectClicked(meshRef.current);
            setObjectClickedUUID(meshRef.current.uuid);
          }
        }}
        
        onPointerMissed = {(event) => {
          if (event.type === 'click') {
            setTransformActive(false);
            setObjectClicked(null);
          }
        }}
      />
      {transformActive && <TransformCustomControls mesh = { meshRef } />}
    </group>
  );
}
  
export const handleSTLFileChange = (
    addObjectToScene: (type: string, props?: any) => void,
    setObjectClicked: Dispatch<SetStateAction<THREE.Mesh | null>>,
    color: string = 'white'
) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = (e) => {
            const buffer = e.target?.result;
            if (buffer instanceof ArrayBuffer) {
                const loader = new STLLoader();
                const geometry = loader.parse(buffer);
                console.log("STL Geometry:", geometry); // Log the geometry
        
                const material = new THREE.MeshStandardMaterial({ color });
                const mesh = new THREE.Mesh(geometry, material);
                console.log("STL Mesh:", mesh); // Log the mesh
        
                mesh.scale.set(0.1, 0.1, 0.1); // Adjust as needed
                mesh.rotation.x = -Math.PI / 2; // Rotate 90 degrees on the X-axis
        
                addObjectToScene('stlObject', { mesh }); // Ensure this matches the case in your switch statement
                setObjectClicked(mesh);
            } else {
                console.error('File read did not result in an ArrayBuffer.');
            }
        };
        reader.onerror = (e) => {
            console.error('FileReader error: ', e);
        };
    }
};

