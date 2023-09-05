import React from 'react';
import { Dispatch, SetStateAction } from "react";
import { PerspectiveCamera, OrthographicCamera } from '@react-three/drei'

interface props {
  isOrthographic: boolean;
  setIsOrthographic: Dispatch<SetStateAction<boolean>>;
  cameraCoordinates: number[];
}

function orthographicCameraExport(cords: number[]){
  return (
    <OrthographicCamera
      makeDefault
      zoom={20}
      near={1}
      far={2000}
      position = { [ cords[0], cords[1], cords[2],]}
    />
  )
}

function perspectiveCameraExport(cords: number[]){
  return (
    <PerspectiveCamera
      makeDefault
      position = { [ cords[0], cords[1], cords[2],]}
    />
  )
}

export function SwitchBetweenCameras(orthographicSwitch: props) {
  const { isOrthographic, setIsOrthographic, cameraCoordinates } = orthographicSwitch;

  console.log(cameraCoordinates)
  return (
    isOrthographic ? perspectiveCameraExport(cameraCoordinates) : orthographicCameraExport(cameraCoordinates) 
  );
}
