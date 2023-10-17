import { ThreeElements, useFrame } from '@react-three/fiber';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useCursor } from '@react-three/drei';
import { TransformCustomControls } from "../../components/controls/objectControls/TransformCustomControls";

type CreatePyramidProps = {
  isObjectButtonPressed: boolean;
  color?: string;
  size?: [number, number, number];
} & ThreeElements['mesh'];

export function CreatePyramid({ isObjectButtonPressed, color, size = [1, 1, 1], ...props }: CreatePyramidProps) {
  const pyramidRef = useRef<THREE.Mesh>(null!);
  const outlineRef = useRef<THREE.LineSegments>(null!);

  const [hovered, hover] = useState(false);
  const [transformActive, setTransformActive] = useState(false);
  const meshColor = color ? color : (transformActive ? 'orange' : 'white');
  const groupRef = useRef<THREE.Group>(null);
  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({ color: 0x000000, depthTest: true, opacity: 0.5, transparent: true }), []);

  useCursor(hovered);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.type = "PyramidGroup";
    }
    if (pyramidRef.current && outlineRef.current) {
      outlineRef.current.position.copy(pyramidRef.current.position);
      outlineRef.current.rotation.copy(pyramidRef.current.rotation);
      outlineRef.current.scale.copy(pyramidRef.current.scale);
    }
  });

  return (
    <group ref = { groupRef }>
      <mesh
        {...props}
        ref = { pyramidRef }
        rotation = { [0, Math.PI / 4, 0] }  // Adjust the Y rotation
        onClick = { (event) => {
          if (!isObjectButtonPressed) {
            (event.stopPropagation(), setTransformActive(true))
          }
        } }
        onPointerMissed = { (event) => event.type === 'click' && setTransformActive(false) }
        onPointerOver   = { (event) => (event.stopPropagation(), hover(true)) }
        onPointerOut    = { (event) => hover(false) }
      >
        {/* Create a cone with 4 radial segments to represent a 4-sided pyramid */}
        <coneGeometry args = { [size[0]/1.4, size[1], 4] } />
        <meshStandardMaterial color = { meshColor } />
      </mesh>

      {transformActive && <TransformCustomControls mesh = { pyramidRef } />}

      <lineSegments ref = { outlineRef } material = { lineMaterial }>
        <edgesGeometry attach = "geometry" args = { [new THREE.ConeGeometry(size[0] / 1.4, size[1], 4)] } />
      </lineSegments>
    </group>
  )
}
