import React, { useState } from 'react';
import { Dispatch, SetStateAction } from "react";

interface props {
  isObjectButtonPressed: boolean;
  setIsObjectButtonPressed: Dispatch<SetStateAction<boolean>>;
  objectTypePressed: string
  setObjectTypePressed: Dispatch<SetStateAction<string>>;
  addObjectToScene: (type: string, props?: any) => void; 
  isSketchButtonPressed: boolean;
  setIsSketchButtonPressed: Dispatch<SetStateAction<boolean>>;
}

export function ToolPanel(objectButtonPress: props){
  const { isObjectButtonPressed, 
          setIsObjectButtonPressed, 
          objectTypePressed, 
          setObjectTypePressed, 
          addObjectToScene,
          isSketchButtonPressed,
          setIsSketchButtonPressed
          } = objectButtonPress;

  const shapePressList: {[key: string]: boolean} = {
    cube:         false,
    sphere:       false,
    cylinder:     false,
    cone:         false,
    tetrahedron:  false,
    pyramid:      false,
    hemisphere:   false,
  };

  const [isShapeButtonPressed, setIsShapeButtonPressed] = useState(shapePressList);


  const toggleButtonPressed = (objectType: string) => {
    // If button A is pressed and the user presses button B
    // --> Button A is automatically unpressed
    let existingPressedButton = false;
    for(let shape in shapePressList){
      if(shape !== objectType && isShapeButtonPressed[shape] === true){
        existingPressedButton = true;
        setIsShapeButtonPressed( prevState => ({
          ...prevState,
          [shape]: false,
        }));
        break;
      }
    }
    if(!existingPressedButton){
      setIsObjectButtonPressed(!isObjectButtonPressed);
    }
    setObjectTypePressed(objectType);
    setIsShapeButtonPressed( prevState => ({
      ...prevState,
      [objectType]: !prevState[objectType],
    }));
  };
  
  
  const buttonShape = "hover:bg-blueHover rounded-lg p-1 w-8 h-8";
  const buttonShapePressed = "bg-blueHover rounded-lg p-1 w-8 h-8";
  const buttonText = "bg-graySubFill text-white hover:bg-blueHover w-fit px-3 py-1 mx-1 rounded-lg";

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

      <button className = {buttonText}
       onClick = { () => console.log("saved")}>
         Save
      </button>

      <button className = {buttonText}
       onClick = { () => { 
        setIsSketchButtonPressed(!isSketchButtonPressed);
        console.log(isSketchButtonPressed);
       }}>
       Sketch
      </button>

      <LineSeparator/>
      
      <button className={ buttonShape }
        onClick = { () => {
          setIsObjectButtonPressed(false);
          for(let shape in shapePressList){
            if(isShapeButtonPressed[shape] === true){
              setIsShapeButtonPressed( prevState => ({
                ...prevState,
                [shape]: false,
              }));
              break;
            }
          }
        }}>
        <img src="CursorSelect.svg"/>
      </button>

      <button className={isShapeButtonPressed.cube ? buttonShapePressed : buttonShape}
        onClick = { () => toggleButtonPressed("cube") }>
        <img src="cube.svg"/>
      </button>

      <button className={isShapeButtonPressed.sphere ? buttonShapePressed : buttonShape}
        onClick = { () => toggleButtonPressed("sphere") }>
        <img src="sphere.svg"/>
      </button>

      <button className={isShapeButtonPressed.cylinder ? buttonShapePressed : buttonShape}
        onClick = { () => toggleButtonPressed("cylinder") }>
        <img src="cylinder.svg"/>
      </button>

      <button className={isShapeButtonPressed.cone ? buttonShapePressed : buttonShape}
        onClick = { () => toggleButtonPressed("cone") }>
        <img src="cone.svg"/>
      </button>

      <button className={isShapeButtonPressed.tetrahedron ? buttonShapePressed : buttonShape}
        onClick = { () => toggleButtonPressed("tetrahedron") }>
        <img src="tetrahedron.svg"/>
      </button>

      <button className={isShapeButtonPressed.pyramid ? buttonShapePressed : buttonShape}
        onClick = { () => toggleButtonPressed("pyramid") }>
        <img src="pyramid.svg"/>
      </button>

      <button className={isShapeButtonPressed.hemisphere ? buttonShapePressed : buttonShape}
        onClick = { () => toggleButtonPressed("hemisphere") }>
        <img src="hemisphere.svg"/>
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
