import React, { useState } from 'react';
import { Dispatch, SetStateAction } from "react";
import Button from '../button'

interface ToolPanelProps {
  isObjectButtonPressed: boolean;
  setIsObjectButtonPressed: Dispatch<SetStateAction<boolean>>;
  objectTypePressed: string;
  setObjectTypePressed: Dispatch<SetStateAction<string>>;
  addObjectToScene: (type: string, props?: any) => void;
  isSketchButtonPressed: boolean;
  setIsSketchButtonPressed: Dispatch<SetStateAction<boolean>>;
}

export function ToolPanel({
  isObjectButtonPressed,
  setIsObjectButtonPressed,
  objectTypePressed,
  setObjectTypePressed,
  addObjectToScene,
  isSketchButtonPressed,
  setIsSketchButtonPressed
}: ToolPanelProps) {

  const toggleButtonPressed = (objectType: string) => {
    setIsObjectButtonPressed(!isObjectButtonPressed);
    setObjectTypePressed(objectType);
  };

  const [isBoxButtonPressed, setBoxButtonPressed] = useState<boolean>(true);
  const boxImageSrc = isBoxButtonPressed ? "boxUnpressed.svg" : "boxPressed.svg";

  const handleBoxButtonClick = () => {
    toggleButtonPressed("cube");
    setBoxButtonPressed(!isBoxButtonPressed);
  };

  const handleSphereButtonClick = () => {
    toggleButtonPressed("sphere");
  };

  return (
    <div style={{
      position: 'fixed',
      top: 10,
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgb(30,29,32)',
      padding: '5px 10px',
      userSelect: 'none',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    }}>
      <Button>Profile</Button>
      <button className="bg-graySubFill text-white hover:bg-blue-500 w-20 rounded-lg p-1" onClick={() => console.log("saved")}>
        Save
      </button>

      <button className="bg-graySubFill text-white hover:bg-blue-500 w-20 rounded-lg p-1" onClick={() => {
        setIsSketchButtonPressed(!isSketchButtonPressed);
        console.log(isSketchButtonPressed);
      }}>
        Sketch
      </button>

      <div style={{
        background: 'gray',
        height: '25px',
        width: '3px',
        display: 'inline-block',
        verticalAlign: 'middle',
        margin: '0 10px',
        borderRadius: '20px',
      }} />

      <button className="flex items-center hover:bg-blue-500 rounded p-1 h-100">
        <img src="CursorSelect.svg" width="25" />
      </button>

      <button className={`flex items-center hover:bg-blue-500 ${!isBoxButtonPressed ? "bg-white" : ""} rounded p-1 h-100`} onClick={handleBoxButtonClick}>
        <img src={boxImageSrc} width="25" />
      </button>

      <button className="flex items-center hover:bg-blue-500 rounded p-1 h-100" onClick={handleSphereButtonClick}>
        <img src="sphere.svg" width="20" />
      </button>
    </div>
  );
}
