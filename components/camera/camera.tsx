import React from 'react';
import { Dispatch, SetStateAction } from "react";
import { PerspectiveCamera, OrthographicCamera } from '@react-three/drei'

interface props {
  isOrthographic: boolean;
  setIsOrthographic: Dispatch<SetStateAction<boolean>>;
}

function orthographicCameraExport(){
  return (
    <OrthographicCamera
      makeDefault
      zoom={10}
      top={100}
      bottom={-100}
      left={100}
      right={-100}
      near={1}
      far={2000}
      position={[0, 0, 1]}
    />
  )
}

function perspectiveCameraExport(){
  return (
    <PerspectiveCamera/>
  )
}

export function SwitchBetweenCameras(orthographicSwitch: props) {
  const { isOrthographic, setIsOrthographic } = orthographicSwitch;

  return (
    isOrthographic ? perspectiveCameraExport() : orthographicCameraExport() 
  );
}
