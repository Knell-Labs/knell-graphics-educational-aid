import * as THREE from 'three';

// Custom STL Exporter with parse method
class CustomSTLExporter {
    parse(scene) {
        let output = "solid exported\n";

        scene.traverse(function (object) {
    
            // Skip specific object types and names
            if (['Line2'].includes(object.type) || ['grid-plane-hidden-helper'].includes(object.name)) {
                return;
            }

            // Skips Directional Light Mesh
            if (object.parent && object.parent.type === 'DirLightGroup') {
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

function hasActiveTransformControls(scene) {
    let hasControls = false;
    scene.traverse(function (object) {
        if (object.type === 'TransformControlsPlane') {
            hasControls = true;
        }
    });
    return hasControls;
}

export function exportSTL(scene) {

    // Check if Transform Custom Controls are active
    if (hasActiveTransformControls(scene)) {
        console.warn("Aborting export: Transform Custom Controls are active.");
        return; // Abort the export
    }

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

// My attempt at setting up a prompt for the user to choose a file name and then download

/*
export function ExportSTLModal({ onDownload, onCancel }) {
  const [fileName, setFileName] = useState('scene');

  return (
    <div className="export-stl-modal">
      <input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        placeholder="Enter file name"
      />
      <button onClick={() => onDownload(fileName)}>Download</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export function exportSTL(scene) {
  const exporter = new CustomSTLExporter();
  const stlString = exporter.parse(scene);

  const handleDownload = (fileName) => {
    const blob = new Blob([stlString], { type: 'model/stl' });
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);

    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.stl`;
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  // Show the modal to the user
  // You need to integrate this part with your UI framework or library
  showModal(<ExportSTLModal onDownload={handleDownload} onCancel={hideModal} />);
}
*/
