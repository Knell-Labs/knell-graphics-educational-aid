import React from "react";
import { Dispatch, SetStateAction } from "react";
import { PerspectiveCamera, OrthographicCamera } from "@react-three/drei";

interface props {
  isOrthographic: boolean;
  setIsOrthographic: Dispatch<SetStateAction<boolean>>;
  cameraCoordinates: number[];
  persCameraRef: React.RefObject<THREE.PerspectiveCamera>;
  orthoCameraRef: React.RefObject<THREE.OrthographicCamera>;
}

// NOTE: you can only chane the "distance" in Perspective mode

function orthographicCameraExport(
  cords: number[],
  ref: React.RefObject<THREE.OrthographicCamera>,
) {
  const distance = Math.pow(
    cords[0] ** 2 + cords[1] ** 2 + cords[2] ** 2,
    1 / 2,
  );

  // NOTE: this equation was obtained based on test case (wild guess) + Excel
  // The math shall corrected anytime be for better performance
  // Without fixing the number of decimals, the result will change slightly every time the math is perfomed
  const zoomDistance = Number((1098.6 * Math.pow(distance, -1.087)).toFixed(5));

  return (
    <OrthographicCamera
      ref={ref}
      makeDefault
      zoom={zoomDistance}
      near={1}
      far={2000}
      position={[cords[0], cords[1], cords[2]]}
    />
  );
}

function perspectiveCameraExport(
  cords: number[],
  ref: React.RefObject<THREE.PerspectiveCamera>,
) {
  return (
    <PerspectiveCamera
      ref={ref}
      makeDefault
      near={1}
      far={2000}
      position={[cords[0], cords[1], cords[2]]}
    />
  );
}

export function SwitchBetweenCameras(orthographicSwitch: props) {
  const {
    isOrthographic,
    setIsOrthographic,
    cameraCoordinates,
    persCameraRef,
    orthoCameraRef,
  } = orthographicSwitch;

  return isOrthographic
    ? orthographicCameraExport(cameraCoordinates, orthoCameraRef)
    : perspectiveCameraExport(cameraCoordinates, persCameraRef);
}
