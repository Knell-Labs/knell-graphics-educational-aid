import { ThreeElements, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect, useMemo } from "react";
import { Dispatch, SetStateAction } from "react";
import * as THREE from "three";
import { useCursor } from "@react-three/drei";
import { TransformCustomControls } from "../controls/objectControls/TransformCustomControls";

import { ShapeType, ShapeProps, ShapeObject } from "@/types/scene";

type CreateConeProps = {
  setObjectClicked: Dispatch<SetStateAction<THREE.Mesh | null>>;
  isObjectButtonPressed: () => boolean;
  color?: string;
  radius?: number;
  height?: number;
  radialSegments?: number;
} & ShapeProps &
  ThreeElements["mesh"];

function CreateCone({
  setObjectClicked,
  isObjectButtonPressed,
  color,
  radius = 0.5,
  height = 1,
  radialSegments = 32,
  ...props
}: CreateConeProps) {
  const coneRef = useRef<THREE.Mesh>(null!);
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
      groupRef.current.type = "ConeGroup";
    }
    if (coneRef.current && outlineRef.current) {
      outlineRef.current.position.copy(coneRef.current.position);
      outlineRef.current.rotation.copy(coneRef.current.rotation);
      outlineRef.current.scale.copy(coneRef.current.scale);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        {...props}
        ref={coneRef}
        onClick={(event) => {
          if (!isObjectButtonPressed) {
            event.stopPropagation(), setTransformActive(true);
            setObjectClicked(coneRef.current);
          }
        }}
        onPointerMissed={(event) => {
          event.type === "click" && setTransformActive(false);
          setObjectClicked(null);
        }}
        onPointerOver={(event) => (event.stopPropagation(), hover(true))}
        onPointerOut={(event) => hover(false)}
        onUpdate={(e) => console.log(e)}
      >
        <coneGeometry args={[radius, height, radialSegments]} />
        <meshStandardMaterial color={meshColor} />
      </mesh>

      {transformActive && <TransformCustomControls mesh={coneRef} />}

      <lineSegments ref={outlineRef} material={lineMaterial}>
        <edgesGeometry
          attach="geometry"
          args={[new THREE.ConeGeometry(radius, height, radialSegments)]}
        />
      </lineSegments>
    </group>
  );
}

type CreateCubeProps = {
  // onTransform: (uuid:string, props:ShapeProps) => void;
  setObjectClickedUUID: Dispatch<SetStateAction<string | null>>;
  setObjectClicked: Dispatch<SetStateAction<THREE.Mesh | null>>;
  isObjectButtonPressed: boolean;
  color?: string;
  size?: [number, number, number];
} & ShapeProps &
  ThreeElements["mesh"];

function CreateCube({
  setObjectClickedUUID,
  setObjectClicked,
  isObjectButtonPressed,
  color,
  size = [1, 1, 1],
  ...props
}: CreateCubeProps) {
  const cubeRef = useRef<THREE.Mesh>(null!);
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
      groupRef.current.type = "CubeGroup";
    }
    if (cubeRef.current && outlineRef.current) {
      outlineRef.current.position.copy(cubeRef.current.position);
      outlineRef.current.rotation.copy(cubeRef.current.rotation);
      outlineRef.current.scale.copy(cubeRef.current.scale);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        {...props}
        ref={cubeRef}
        onClick={(event) => {
          if (!isObjectButtonPressed) {
            event.stopPropagation(), setTransformActive(true);
            setObjectClicked(cubeRef.current);

            if (groupRef.current) {
              setObjectClickedUUID(groupRef.current.uuid);
            }
          }
        }}
        onPointerMissed={(event) => {
          event.type === "click" && setTransformActive(false);
          setObjectClicked(null);
        }}
        onPointerOver={(event) => (event.stopPropagation(), hover(true))}
        onPointerOut={(event) => hover(false)}
      >
        <boxGeometry args={size} />
        <meshStandardMaterial color={meshColor} />
      </mesh>

      {transformActive && <TransformCustomControls mesh={cubeRef} />}

      <lineSegments ref={outlineRef} material={lineMaterial}>
        <edgesGeometry
          attach="geometry"
          args={[new THREE.BoxGeometry(...size)]}
        />
      </lineSegments>
    </group>
  );
}

type CreateCylinderProps = {
  setObjectClicked: Dispatch<SetStateAction<THREE.Mesh | null>>;
  isObjectButtonPressed: boolean;
  color?: string;
  height?: number;
  radius?: number;
  radialSegments?: number;
} & ShapeProps &
  ThreeElements["mesh"];

function CreateCylinder({
  setObjectClicked,
  isObjectButtonPressed,
  color,
  height = 1,
  radius = 0.5,
  radialSegments = 32,
  ...props
}: CreateCylinderProps) {
  const cylinderRef = useRef<THREE.Mesh>(null!);
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
      groupRef.current.type = "CylinderGroup";
    }
    if (cylinderRef.current && outlineRef.current) {
      outlineRef.current.position.copy(cylinderRef.current.position);
      outlineRef.current.rotation.copy(cylinderRef.current.rotation);
      outlineRef.current.scale.copy(cylinderRef.current.scale);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        {...props}
        ref={cylinderRef}
        onClick={(event) => {
          if (!isObjectButtonPressed) {
            event.stopPropagation(), setTransformActive(true);
            setObjectClicked(cylinderRef.current);
          }
        }}
        onPointerMissed={(event) => {
          event.type === "click" && setTransformActive(false);
          setObjectClicked(null);
        }}
        onPointerOver={(event) => (event.stopPropagation(), hover(true))}
        onPointerOut={(event) => hover(false)}
      >
        <cylinderGeometry args={[radius, radius, height, radialSegments]} />
        <meshStandardMaterial color={meshColor} />
      </mesh>

      {transformActive && <TransformCustomControls mesh={cylinderRef} />}

      <lineSegments ref={outlineRef} material={lineMaterial}>
        <edgesGeometry
          attach="geometry"
          args={[
            new THREE.CylinderGeometry(radius, radius, height, radialSegments),
          ]}
        />
      </lineSegments>
    </group>
  );
}

type CreateHemisphereProps = {
  setObjectClicked: Dispatch<SetStateAction<THREE.Mesh | null>>;
  isObjectButtonPressed: boolean;
  color?: string;
  radius?: number;
  radialSegments?: number;
} & ShapeProps &
  ThreeElements["mesh"];

function CreateHemisphere({
  setObjectClicked,
  isObjectButtonPressed,
  color,
  radius = 0.5,
  radialSegments = 32,
  ...props
}: CreateHemisphereProps) {
  const hemisphereRef = useRef<THREE.Mesh>(null!);
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
      groupRef.current.type = "HemisphereGroup";
    }
    if (hemisphereRef.current && outlineRef.current) {
      outlineRef.current.position.copy(hemisphereRef.current.position);
      outlineRef.current.rotation.copy(hemisphereRef.current.rotation);
      outlineRef.current.scale.copy(hemisphereRef.current.scale);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        {...props}
        ref={hemisphereRef}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={(event) => {
          if (!isObjectButtonPressed) {
            event.stopPropagation(), setTransformActive(true);
            setObjectClicked(hemisphereRef.current);
          }
        }}
        onPointerMissed={(event) => {
          event.type === "click" && setTransformActive(false);
          setObjectClicked(null);
        }}
        onPointerOver={(event) => (event.stopPropagation(), hover(true))}
        onPointerOut={(event) => hover(false)}
      >
        <sphereGeometry
          args={[radius, radialSegments, radialSegments, 0, Math.PI]}
        />
        <meshStandardMaterial color={meshColor} side={THREE.FrontSide} />{" "}
        {/* Ensure the material is not double-sided */}
      </mesh>

      {transformActive && <TransformCustomControls mesh={hemisphereRef} />}

      <lineSegments ref={outlineRef} material={lineMaterial}>
        <edgesGeometry
          attach="geometry"
          args={[
            new THREE.SphereGeometry(
              radius,
              radialSegments,
              radialSegments,
              0,
              Math.PI,
            ),
          ]}
        />
      </lineSegments>
    </group>
  );
}

type CreatePyramidProps = {
  setObjectClicked: Dispatch<SetStateAction<THREE.Mesh | null>>;
  isObjectButtonPressed: boolean;
  color?: string;
  size?: [number, number, number];
} & ShapeProps &
  ThreeElements["mesh"];

function CreatePyramid({
  setObjectClicked,
  isObjectButtonPressed,
  color,
  size = [1, 1, 1],
  ...props
}: CreatePyramidProps) {
  const pyramidRef = useRef<THREE.Mesh>(null!);
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
      groupRef.current.type = "PyramidGroup";
    }
    if (pyramidRef.current && outlineRef.current) {
      outlineRef.current.position.copy(pyramidRef.current.position);
      outlineRef.current.rotation.copy(pyramidRef.current.rotation);
      outlineRef.current.scale.copy(pyramidRef.current.scale);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        {...props}
        ref={pyramidRef}
        rotation={[0, Math.PI / 4, 0]} // Adjust the Y rotation
        onClick={(event) => {
          if (!isObjectButtonPressed) {
            event.stopPropagation(), setTransformActive(true);
            setObjectClicked(pyramidRef.current);
          }
        }}
        onPointerMissed={(event) => {
          event.type === "click" && setTransformActive(false);
          setObjectClicked(null);
        }}
        onPointerOver={(event) => (event.stopPropagation(), hover(true))}
        onPointerOut={(event) => hover(false)}
      >
        {/* Create a cone with 4 radial segments to represent a 4-sided pyramid */}
        <coneGeometry args={[size[0] / 1.4, size[1], 4]} />
        <meshStandardMaterial color={meshColor} />
      </mesh>

      {transformActive && <TransformCustomControls mesh={pyramidRef} />}

      <lineSegments ref={outlineRef} material={lineMaterial}>
        <edgesGeometry
          attach="geometry"
          args={[new THREE.ConeGeometry(size[0] / 1.4, size[1], 4)]}
        />
      </lineSegments>
    </group>
  );
}

type CreateSphereProps = {
  setObjectClicked: Dispatch<SetStateAction<THREE.Mesh | null>>;
  isObjectButtonPressed: boolean;
  color?: string;
  radius?: number;
  radialSegments?: number;
} & ShapeProps &
  ThreeElements["mesh"];

function CreateSphere({
  setObjectClicked,
  isObjectButtonPressed,
  color,
  radius = 1,
  radialSegments = 32,
  ...props
}: CreateSphereProps) {
  const sphereRef = useRef<THREE.Mesh>(null!);
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
      groupRef.current.type = "SphereGroup";
    }
    if (sphereRef.current && outlineRef.current) {
      outlineRef.current.position.copy(sphereRef.current.position);
      outlineRef.current.rotation.copy(sphereRef.current.rotation);
      outlineRef.current.scale.copy(sphereRef.current.scale);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        {...props}
        ref={sphereRef}
        onClick={(event) => {
          if (!isObjectButtonPressed) {
            event.stopPropagation(), setTransformActive(true);
            setObjectClicked(sphereRef.current);
          }
        }}
        onPointerMissed={(event) => {
          event.type === "click" && setTransformActive(false);
          setObjectClicked(null);
        }}
        onPointerOver={(event) => (event.stopPropagation(), hover(true))}
        onPointerOut={(event) => hover(false)}
      >
        <sphereGeometry args={[radius, radialSegments, radialSegments]} />
        <meshStandardMaterial color={meshColor} />
      </mesh>

      {transformActive && <TransformCustomControls mesh={sphereRef} />}

      <lineSegments ref={outlineRef} material={lineMaterial}>
        <edgesGeometry
          attach="geometry"
          args={[
            new THREE.SphereGeometry(radius, radialSegments, radialSegments),
          ]}
        />
      </lineSegments>
    </group>
  );
}

type CreateTetrahedronProps = {
  setObjectClicked: Dispatch<SetStateAction<THREE.Mesh | null>>;
  isObjectButtonPressed: boolean;
  color?: string;
  size?: number; // Note: Tetrahedron only needs a single size value (radius)
} & ShapeProps &
  ThreeElements["mesh"];

function CreateTetrahedron({
  setObjectClicked,
  isObjectButtonPressed,
  color,
  size = 0.6,
  ...props
}: CreateTetrahedronProps) {
  const tetraRef = useRef<THREE.Mesh>(null!);
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
      groupRef.current.type = "TetrahedronGroup";
    }
    if (tetraRef.current && outlineRef.current) {
      outlineRef.current.position.copy(tetraRef.current.position);
      outlineRef.current.rotation.copy(tetraRef.current.rotation);
      outlineRef.current.scale.copy(tetraRef.current.scale);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        {...props}
        ref={tetraRef}
        rotation={[(2 * Math.PI) / 3 + 0.08, Math.PI / 4, 0]} // Rotate the tetrahedron to sit flat on one of its faces
        onClick={(event) => {
          if (!isObjectButtonPressed) {
            event.stopPropagation(), setTransformActive(true);
            setObjectClicked(tetraRef.current);
          }
        }}
        onPointerMissed={(event) => {
          event.type === "click" && setTransformActive(false);
          setObjectClicked(null);
        }}
        onPointerOver={(event) => (event.stopPropagation(), hover(true))}
        onPointerOut={(event) => hover(false)}
      >
        <tetrahedronGeometry args={[size]} />
        <meshStandardMaterial color={meshColor} />
      </mesh>

      {transformActive && <TransformCustomControls mesh={tetraRef} />}

      <lineSegments ref={outlineRef} material={lineMaterial}>
        <edgesGeometry
          attach="geometry"
          args={[new THREE.TetrahedronGeometry(size)]}
        />
      </lineSegments>
    </group>
  );
}

export const getCreateShape = (shapeType: ShapeType) => {
  switch (shapeType) {
    case "cube":
      return CreateCube;
    case "sphere":
      return CreateSphere;
    case "cylinder":
      return CreateCylinder;
    case "cone":
      return CreateCone;
    case "tetrahedron":
      return CreateTetrahedron;
    case "pyramid":
      return CreatePyramid;
    case "hemisphere":
      return CreateHemisphere;
    default:
      return null;
  }
};
