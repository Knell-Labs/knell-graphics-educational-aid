import React from 'react';
import {RayCaster} from '../../raycast/raycaster' 
import { Dispatch, SetStateAction } from "react";


interface props {
  isObjectButtonPressed: boolean;
  setIsObjectButtonPressed: Dispatch<SetStateAction<boolean>>;
}


export function ToolPanel(objectButtonPress: props){
  const { isObjectButtonPressed, setIsObjectButtonPressed } = objectButtonPress;

  const toggleOrthographic = () => {
    setIsObjectButtonPressed(!isObjectButtonPressed);
    console.log(isObjectButtonPressed)
  };

  return (
    <div style={{
      position: 'fixed', // Use fixed position to overlay on the 3D canvas
      top: 10,
      left: '50%', // Move the div to the horizontal center
      transform: 'translateX(-50%)', // Adjust for centering
      background: 'black',
      padding: '5px 10px', // Add some padding around the text
      userSelect: 'none',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'  // <-- added this for spacing

    }}>

      <button className = "bg-gray-400 text-white hover:bg-blue-500 rounded-lg p-1"
       onClick = { () => console.log("saved")}>
         Save
      </button>


      <LineSeparator/>
      <button className="flex items-center hover:bg-blue-500 rounded p-1 h-100">
        <img src="CursorSelect.svg" width="20" />
      </button>

      <button className="flex items-center hover:bg-blue-500 rounded p-1 h-100"
        onClick = {toggleOrthographic}>
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
