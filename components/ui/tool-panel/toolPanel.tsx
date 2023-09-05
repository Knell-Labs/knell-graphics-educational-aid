import React from 'react';
import {RayCaster} from '../../raycast/raycaster' 
import { Dispatch, SetStateAction } from "react";


interface props {
  isObjectButtonPressed: boolean;
  setIsObjectButtonPressed: Dispatch<SetStateAction<boolean>>;
  objectTypePressed: string
  setObjectTypePressed: Dispatch<SetStateAction<string>>;
  onAddCube: () => void; // Define a prop for the callback
}


export function ToolPanel(objectButtonPress: props){
  const { isObjectButtonPressed, 
          setIsObjectButtonPressed, 
          objectTypePressed, 
          setObjectTypePressed, 
          onAddCube } = objectButtonPress;

  const toggleButtonPressed = (objectType: string) => {
    setIsObjectButtonPressed(!isObjectButtonPressed);
    setObjectTypePressed(objectType)
  };

  const currObjectTypePressed = (objectType: string) => {
    setObjectTypePressed(objectType)
  }

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

      <button className = "bg-graySubFill text-white hover:bg-blue-500 rounded-lg p-1"
       onClick = { () => console.log("saved")}>
         Save
      </button>

      <LineSeparator/>

      {/* Temporary butoon to add a cube */}
      <button className = "bg-graySubFill text-white hover:bg-blue-500 rounded-lg p-1"
        onClick={onAddCube} // Attach the passed down callback
      >
        Cube
      </button>

      <LineSeparator/>
      <button className="flex items-center hover:bg-blue-500 rounded p-1 h-100">
        <img src="CursorSelect.svg" width="20" />
      </button>

      <button className="flex items-center hover:bg-blue-500 rounded p-1 h-100"
        onClick = {toggleButtonPressed}>
        <img src="Box.svg" width="20" />
      </button>

    </div>
  )

}


function LineSeparator(){
  return (
    <div style = {{
      background: 'gray',
      height: '25px',
      width: '3px',
      display: 'inline-block', // Keep the line on the same line as the button
      verticalAlign: 'middle', // Align the line vertically in the middle
      marginLeft: '10px', // Add some spacing between the button and the line
      marginRight: '10px', // Add some spacing between the line and the button
      borderRadius: '20px',
    }}/>
  )
}
