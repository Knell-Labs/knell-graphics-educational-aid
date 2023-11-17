import { useRef, useState, useMemo } from "react";
import { Dispatch, SetStateAction } from "react";
import * as THREE from "three";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { useCursor } from "@react-three/drei";
import { TransformCustomControls } from "../controls/objectControls/TransformCustomControls";

import { ShapeType, ShapeProps, ShapeObject } from "@/types/scene";

type CreateShapeProps = {
  setObjectClicked: Dispatch<SetStateAction<THREE.Mesh | null>>;
  isObjectButtonPressed: boolean;
  shapeType: ShapeType;
  color?: string;
  size?: [number, number, number];
  radius?: number;
  height?: number;
  radialSegments?: number;
} & ShapeProps &
  ThreeElements["mesh"];

function CreateShape({
  setObjectClicked,
  isObjectButtonPressed,
  shapeType,
  color,
  size = [1, 1, 1],
  radius = 0.5,
  height = 1,
  radialSegments = 32,
  ...props
}: CreateShapeProps) {
  const shapeRef = useRef<THREE.Mesh>(null!);
  const outlineRef = useRef<THREE.LineSegments>(null!);

  const [hovered, hover] = useState(false);
  const [transformActive, setTransformActive] = useState(false);
  const meshColor = color ? color : transformActive ? "white" : "white";
  const groupRef = useRef<THREE.Group>(null);
  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: 0x000000,
        depthTest: true,
        opacity: 0.5,
        transparent: true,
      }),
    [],
  );

  useCursor(hovered);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.type = `${shapeType}Group`;
    }
    if (shapeRef.current && outlineRef.current) {
      outlineRef.current.position.copy(shapeRef.current.position);
      outlineRef.current.rotation.copy(shapeRef.current.rotation);
      outlineRef.current.scale.copy(shapeRef.current.scale);
    }
  });

  const geometryArgs = (() => {
    switch (shapeType) {
      case "cube":
        return size;
      case "sphere":
        return [radius, radialSegments, radialSegments];
      case "cylinder":
        return [radius, radius, height, radialSegments];
      case "cone":
        return [radius, height, radialSegments];
      case "tetrahedron":
        return [size[0]];
      case "pyramid":
        return [size[0] / 1.4, size[1], 4];
      case "hemisphere":
        return [radius, radialSegments, radialSegments, 0, Math.PI];
      default:
        return [];
    }
  })();

  const geometryClass = (() => {
    switch (shapeType) {
      case "cube":
        return new THREE.BoxGeometry(...geometryArgs);
      case "sphere":
        return new THREE.SphereGeometry(...geometryArgs);
      case "cylinder":
        return new THREE.CylinderGeometry(...geometryArgs);
      case "cone":
        return new THREE.ConeGeometry(...geometryArgs);
      case "tetrahedron":
        return new THREE.TetrahedronGeometry(...geometryArgs);
      case "pyramid":
        return new THREE.ConeGeometry(...geometryArgs); // Adjust as needed for pyramid
      case "hemisphere":
        return new THREE.SphereGeometry(...geometryArgs);
      default:
        return null;
    }
  })();

  const geometry = (() => {
    switch (shapeType) {
      case "cube":
        return <boxGeometry args={geometryArgs} />;
      case "sphere":
        return <sphereGeometry args={geometryArgs} />;
      case "cylinder":
        return <cylinderGeometry args={geometryArgs} />;
      case "cone":
        return <coneGeometry args={geometryArgs} />;
      case "tetrahedron":
        return <tetrahedronGeometry args={geometryArgs} />;
      case "pyramid":
        return <coneGeometry args={geometryArgs} />;
      case "hemisphere":
        return <sphereGeometry args={geometryArgs} />;
      default:
        return null;
    }
  })();

  const handleMeshClick = (event: THREE.Event) => {
    if (!isObjectButtonPressed) {
      event.stopPropagation();
      setTransformActive(true);
      setObjectClicked(shapeRef.current);
    }
  };

  const handlePointerMissed = (event: THREE.Event) => {
    if (event.type === "click") setTransformActive(false);
    setObjectClicked(null);
  };

  return (
    <group ref={groupRef}>
      <mesh
        {...props}
        ref={shapeRef}
        onClick={handleMeshClick}
        onPointerMissed={handlePointerMissed}
        onPointerOver={(event) => (event.stopPropagation(), hover(true))}
        onPointerOut={(event) => hover(false)}
      >
        {geometry}
        <meshStandardMaterial color={meshColor} />
      </mesh>

      {transformActive && <TransformCustomControls mesh={shapeRef} />}

      <lineSegments ref={outlineRef} material={lineMaterial}>
        <edgesGeometry attach="geometry" args={[geometryClass]} />
      </lineSegments>
    </group>
  );
}

export const getCreateShape = (shapeType: ShapeType) => {
  return (props) => <CreateShape {...props} shapeType={shapeType} />;
};
