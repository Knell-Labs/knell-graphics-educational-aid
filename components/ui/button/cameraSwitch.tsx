import { Dispatch, SetStateAction } from "react";
import React from 'react';
import SwitchSelector from "react-switch-selector";

const toggleOptions = [
  {
    label: "Perspective",
    value: "perspective",
    selectedBackgroundColor: "gray"
  },
  {
    label: "Orthographic",
    value: "orthographic",
    selectedBackgroundColor: "gray"
  }
];

interface props {
  isOrthographic: boolean;
  setIsOrthographic: Dispatch<SetStateAction<boolean>>;
}

export function CameraSwitch(orthographicSwitch: props) {
  const { isOrthographic, setIsOrthographic } = orthographicSwitch;

  const toggleOrthographic = () => {
    setIsOrthographic(!isOrthographic);
  };

  const GradientDirection = isOrthographic ? 
      "to right, white 0%, white 49%, gray 49%, gray 100%" : 
      "to left, white 0%, white 53%, gray 53%, gray 100%";

  return (
    <>
      {/* Your Three.js content here */}
      
      <div style={{
        position: 'fixed', // Use fixed position to overlay on the 3D canvas
        bottom: 30,
        width: '30%',
        height: '50px',
        left: '35%',
        textAlign: 'center'
      }}>
        
        <SwitchSelector
          onChange = { toggleOrthographic }
          options = {toggleOptions}
          initialSelectedIndex = {toggleOptions.findIndex(({ value }) => value == "perspective")}
          backgroundColor = {"white"}
          selectionIndicatorMargin = {0}
          fontSize = {20}
        />

      </div>
    </>
  );
}

/*
 * This camera causes "bugs" at least I think, it was fixed with the function on top 
 * I will leave this on here for the a bit just if we need to revert cameras we have it saved
 * here
*/
export function CameraSwitchDup(orthographicSwitch: props) {
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
