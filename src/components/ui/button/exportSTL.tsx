import * as THREE from 'three';
import BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
//import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js';

export function mergeGeometriesCustom(scene = new THREE.Scene()) {
    let geometries = [];

    scene.traverse((child) => {
        if (child.isMesh) {
            const clonedGeometry = child.geometry.clone();
            clonedGeometry.applyMatrix4(child.matrixWorld);
            geometries.push(clonedGeometry);
        }
    });

    return mergeGeometries(geometries);
}

export function exportSTL(scene) {

    //const mergedGeometry = mergeGeometries(scene);
    const mergedGeometry = mergeGeometriesCustom(scene);

    if (!mergedGeometry) {
        console.error("Failed to merge geometries");
        return;
    }

    //const mergedGeometry = mergeGeometries(scene);
    const exporter = new STLExporter();
    const stlString = exporter.parse(mergedGeometry);

    // Create a blob from the STL string
    const blob = new Blob([stlString], { type: 'text/plain' });

    // Create a link element to download the blob
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);

    link.href = URL.createObjectURL(blob);
    link.download = 'scene.stl';
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

