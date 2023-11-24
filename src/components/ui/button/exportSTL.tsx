import * as THREE from 'three';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js';

// Custom STL Exporter with parse method
class CustomSTLExporter {
    parse(scene) {
        let output = "solid exported\n";

        scene.traverse(function (object) {
            if (object instanceof THREE.Mesh) {
                const geometry = object.geometry;
                const matrixWorld = object.matrixWorld;
                const normalMatrixWorld = new THREE.Matrix3().getNormalMatrix(matrixWorld);

                if (geometry instanceof THREE.BufferGeometry) {
                    // Need to adapt the logic to handle BufferGeometry
                }
            }
        });

        output += "endsolid exported\n";
        return output;
    }
}

export function exportSTL(scene) {
    const exporter = new CustomSTLExporter();
    const stlString = exporter.parse(scene);

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
