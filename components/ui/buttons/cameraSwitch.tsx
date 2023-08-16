import { Html } from "@react-three/drei";
import { Dispatch, SetStateAction } from "react";
import React from 'react';


interface props {
  isOrthographic: boolean;
  setIsOrthographic: Dispatch<SetStateAction<boolean>>;
}

export function CameraSwitch(orthographicSwitch: props) {
  const { isOrthographic, setIsOrthographic } = orthographicSwitch;

  const toggleOrthographic = () => {
    setIsOrthographic(!isOrthographic);
  };

  const GradientDirection = isOrthographic ? "to right, blue 46%, red 50%" : "to left, blue 54%, white 46%";

  return (
    <div className="absolute w-30 h-[19px] mb-10 inset-x-0 bottom-0 flex justify-center items-center z-0  mx-auto">
      <button className="cursor-auto select-none relative rounded-lg text-black text-lg overflow-hidden"
        onClick={  toggleOrthographic }
        style={{
                background: `linear-gradient(${GradientDirection})`,

                }}>
                    Perspective Orthographic
      </button>
    </div>
  );
}

export function CameraSwitch2(orthographicSwitch: props) {
  const { isOrthographic, setIsOrthographic } = orthographicSwitch;

  const toggleOrthographic = () => {
    setIsOrthographic(!isOrthographic);
  };

  const GradientDirection = isOrthographic ? "to right, blue 46%, red 50%" : "to left, blue 54%, white 46%";
  return (
    <Html position={[0, 0, 0]} fullscreen>
      <div style={{
        position: 'absolute',
        bottom: 10,
        width: '100%',
        textAlign: 'center'
      }}>
        <button
          onClick={  toggleOrthographic }
          style={{
            background: `linear-gradient(${GradientDirection})`,
            userSelect: 'none',
            cursor: 'auto',
            borderRadius: '10px',
            padding: '0 10px',
            color: 'rgb(0, 0, 0)'
          }}>
            Perspective Orthographic
        </button>
      </div>
    </Html>
  )
}



