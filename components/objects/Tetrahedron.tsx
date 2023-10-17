import { ThreeElements, useFrame } from '@react-three/fiber';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useCursor } from '@react-three/drei';
import { TransformCustomControls } from "../../components/controls/objectControls/TransformCustomControls";

type CreateTetrahedronProps = {
  isObjectButtonPressed: boolean;
  color?: string;
  size?: number; // Note: Tetrahedron only needs a single size value (radius)
} & ThreeElements['mesh'];

export function CreateTetrahedron({ isObjectButtonPressed, color, size = 1, ...props }: CreateTetrahedronProps) {
  const tetraRef = useRef<THREE.Mesh>(null!);
  const outlineRef = useRef<THREE.LineSegments>(null!);

  const [hovered, hover] = useState(false);
  const [transformActive, setTransformActive] = useState(false);
  const meshColor = color ? color : (transformActive ? 'orange' : 'white');
  const groupRef = useRef<THREE.Group>(null);
  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({ color: 0x000000, depthTest: true, opacity: 0.5, transparent: true }), []);

  useCursor(hovered);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.type = "TetrahedronGroup";
    }
    if (tetraRef.current && outlineRef.current) {
      outlineRef.current.position.copy(tetraRef.current.position);
      outlineRef.current.rotation.copy(tetraRef.current.rotation);
      outlineRef.current.scale.copy(tetraRef.current.scale);
    }
  });

  return (
    <group ref = { groupRef }>
      <mesh
        {...props}
        ref = { tetraRef }
        rotation = { [Math.PI/4, 0, 0] } // Rotate the tetrahedron to sit flat on one of its faces
        onClick = { (event) => {
          if (!isObjectButtonPressed) {
            (event.stopPropagation(), setTransformActive(true))
          }
        } }
        onPointerMissed = { (event) => event.type === 'click' && setTransformActive(false) }
        onPointerOver   = { (event) => (event.stopPropagation(), hover(true)) }
        onPointerOut    = { (event) => hover(false) }
      >
        <tetrahedronGeometry args = { [size] } />
        <meshStandardMaterial color = { meshColor } />
      </mesh>

      {transformActive && <TransformCustomControls mesh = { tetraRef } />}

      <lineSegments ref = { outlineRef } material = { lineMaterial }>
        <edgesGeometry attach = "geometry" args = { [new THREE.TetrahedronGeometry(size)] } />
      </lineSegments>
    </group>
  )
}
