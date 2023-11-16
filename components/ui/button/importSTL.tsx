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
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current){
      groupRef.current.type = "stlObjectGroup";
    }
    if (meshRef.current && outlineRef.current) {
      outlineRef.current.position.copy(meshRef.current.position);
      outlineRef.current.rotation.copy(meshRef.current.rotation);
      outlineRef.current.scale.copy(meshRef.current.scale);
    }
  });

  return (
    <group ref = { groupRef }>
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
    fileInputRef: React.RefObject<HTMLInputElement>,
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
                //console.log("STL Geometry:", geometry); // Log the geometry

                // Center the geometry
                geometry.computeBoundingBox();
                const center = new THREE.Vector3();
                geometry.boundingBox!.getCenter(center);
                const offset = center.negate();
                geometry.translate(offset.x, offset.y, offset.z);

                const material = new THREE.MeshStandardMaterial({ color });
                const mesh = new THREE.Mesh(geometry, material);
                mesh.userData = {
                    type: 'stlObject',
                    fileName: file.name // Store the file name
                };
                //console.log("STL Mesh:", mesh); // Log the mesh

                mesh.scale.set(0.1, 0.1, 0.1);
                mesh.rotation.x = -Math.PI / 2; // Rotate 90 degrees on the X axis

                addObjectToScene('stlObject', { mesh });
                setObjectClicked(mesh);
            } else {
                console.error('File read did not result in an ArrayBuffer.');
            }
        };
        reader.onerror = (e) => {
            console.error('FileReader error: ', e);
        };
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
    }
};

