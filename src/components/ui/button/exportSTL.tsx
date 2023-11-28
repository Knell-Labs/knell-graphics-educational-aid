import * as THREE from 'three';

// Custom STL Exporter with parse method
class CustomSTLExporter {
    parse(scene) {
        let output = "solid exported\n";

        scene.traverse(function (object) {
            console.log(`Object Type: ${object.type}, Name: ${object.name}`);

            // Skip specific object types and names
            if (['AmbientLight', 'DirectionalLight', 'PerspectiveCamera', 'GridHelper', 'Group', 'Line', 'Line2'].includes(object.type) ||
                ['init-grid', 'grid-plane-hidden-helper', 'AxesHelperExclude', 'DirLightGroup', 'DirectionalLightHelper', 'axes-helper'].includes(object.name)) {
                console.log(`Skipping: ${object.type}, Name: ${object.name}`);
                return;
            }

            if (object instanceof THREE.Mesh) {
                let geometry = object.geometry; // Changed from const to let
                const matrixWorld = object.matrixWorld.clone(); // Clone the matrix

                // Inverse scale and rotation
                const inverseScale = new THREE.Vector3(10, 10, 10); // Inverse of 0.1 scale
                const inverseRotation = new THREE.Euler(Math.PI / 2, 0, 0, 'XYZ'); // Inverse of -Math.PI / 2 rotation on X
                const quaternion = new THREE.Quaternion().setFromEuler(inverseRotation);

                // Apply inverse transformations to each vertex
                if (geometry instanceof THREE.BufferGeometry) {
                    // Ensure the geometry is non-indexed for simplicity
                    if (geometry.index !== null) {
                        geometry = geometry.toNonIndexed();
                    }

                    const positionAttribute = geometry.attributes.position;
                    const normalAttribute = geometry.attributes.normal;

                    for (let i = 0; i < positionAttribute.count; i += 3) {
                        // Process each triangle
                        let p1 = new THREE.Vector3().fromBufferAttribute(positionAttribute, i);
                        let p2 = new THREE.Vector3().fromBufferAttribute(positionAttribute, i + 1);
                        let p3 = new THREE.Vector3().fromBufferAttribute(positionAttribute, i + 2);

                        // Apply object's world matrix to vertices
                        p1.applyMatrix4(matrixWorld);
                        p2.applyMatrix4(matrixWorld);
                        p3.applyMatrix4(matrixWorld);

                        // Apply inverse scale and rotation
                        p1.multiply(inverseScale).applyQuaternion(quaternion);
                        p2.multiply(inverseScale).applyQuaternion(quaternion);
                        p3.multiply(inverseScale).applyQuaternion(quaternion);

                        let normal = normalAttribute ? new THREE.Vector3().fromBufferAttribute(normalAttribute, i).normalize() :
                            p2.clone().sub(p1).cross(p3.clone().sub(p1)).normalize();

                        output += `\tfacet normal ${normal.x} ${normal.y} ${normal.z}\n`;
                        output += "\t\touter loop\n";
                        output += `\t\t\tvertex ${p1.x} ${p1.y} ${p1.z}\n`;
                        output += `\t\t\tvertex ${p2.x} ${p2.y} ${p2.z}\n`;
                        output += `\t\t\tvertex ${p3.x} ${p3.y} ${p3.z}\n`;
                        output += "\t\tendloop\n";
                        output += "\tendfacet\n";
                    }
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
