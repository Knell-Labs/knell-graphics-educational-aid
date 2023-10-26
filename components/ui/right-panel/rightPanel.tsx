import React, { Component, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Vector3 } from 'three';

enum fieldToChange {
    x,
    y, 
    z,
}

enum colorToChange {
    r,
    g,
    b,
}

function setWireframeVisibility(objectClicked: THREE.Mesh | null, wireframeStatus: boolean){
    objectClicked.material.wireframe = wireframeStatus; 
}

//Not working correctly ATM, changes color only when its clicked but resets back to 
//default when its unllicked
// function setColorRGB(objectClicked: THREE.Mesh | null, R: number, G: number, B: number){
function setColorRGB(objectClicked: THREE.Mesh | null, colToChange: colorToChange, newValue: number){
  const R = objectClicked?.material.color.r;
  const G = objectClicked?.material.color.g;
  const B = objectClicked?.material.color.b;
  let colorRGB;

  switch (colToChange){
    case colorToChange.r: {
      colorRGB = new THREE.Color("rgb(" + newValue + ", " + G + ", " + B + ")");
      break;
    }
    case colorToChange.g: {
      colorRGB = new THREE.Color("rgb(" + R + ", " + newValue + ", " + B + ")");
      break;
    }
    case colorToChange.b: {
      colorRGB = new THREE.Color("rgb(" + R + ", " + G + ", " + newValue + ")");
      break;
    }
    default: {
      colorRGB = new THREE.Color("rgb(" + R + ", " + G + ", " + B + ")")
      console.log("How the hell did you break me ??");
    }
  }  
  console.log(colorRGB);
  objectClicked?.material.color.set(colorRGB);
  
    // objectClicked?.material.color.setRGB(R, G, B);

}

function setPos( objectClicked: THREE.Mesh | null, posToChange: fieldToChange, posChange: number){
    switch (posToChange){
        case fieldToChange.x: {
            objectClicked?.position.setX(posChange);
            break;
        }
        case fieldToChange.y: {
            objectClicked?.position.setY(posChange);
            break;
        }
        case fieldToChange.z: {
            objectClicked?.position.setZ(posChange);
            break;
        }
        default: {
            console.log("How the hell did you break me ??");
        }
    }
}

function setRotEuler( objectClicked: THREE.Mesh | null, posToChange: fieldToChange, angleChangeDeg: number){

    //Convert to rads
    let angleChangeRad = (angleChangeDeg / 180) * Math.PI

    switch (posToChange){
        case fieldToChange.x: {
            objectClicked?.rotateX(angleChangeRad)
            break;
        }
        case fieldToChange.y: {
            objectClicked?.rotateY(angleChangeRad);
            break;
        }
        case fieldToChange.z: {
            objectClicked?.rotateZ(angleChangeRad);
            break;
        }
        default: {
            console.log("How the hell did you break me ??");
        }
    }
}


function setScale( objectClicked: THREE.Mesh | null, posToChange: fieldToChange, scaleVal: number){

    switch (posToChange){
        case fieldToChange.x: {
            objectClicked?.scale.setX(scaleVal);
            break;
        }
        case fieldToChange.y: {
            objectClicked?.scale.setY(scaleVal);
            break;
        }
        case fieldToChange.z: {
            objectClicked?.scale.setZ(scaleVal);
            break;
        }
        default: {
            console.log("How the hell did you break me ??");
        }
    }
}


interface RightPanelProps {
    objectClicked: THREE.Mesh | null;
}

export function RightPanel({objectClicked}: RightPanelProps) {
  useEffect( () => {
    if(objectClicked){
        objectClicked.geometry.computeBoundingSphere()
        // console.log(objectClicked);
        // console.log(objectClicked.geometry.type);//string
        // console.log(objectClicked.name);//string

        // console.log(objectClicked.material.color);
        // setColorRGB(objectClicked, colorToChange.r, 120);
        // console.log(objectClicked.material.color);


        //setRotEuler(objectClicked, fieldToChange.y, 45);
        // setScale(objectClicked, fieldToChange.x, 2);

        /*The logs below should be things we should display and be able to edit*/
        // console.log(objectClicked.material.color);//vector
        // console.log(objectClicked.material.wireframe);//T or F
        // console.log(objectClicked?.position);//vector
        // console.log(objectClicked?.rotation);//vector
        // console.log(objectClicked?.scale);//vector
        // console.log(objectClicked?.quaternion);//vector
    }
  }, [objectClicked])
  
  const propertyClassName = "flex items-center border-2 border-grayFill hover:border-gray-600 active:border-gray-600 rounded p-1";

  const labelClassName_tight = "px-2 text-gray-400";

  const R_value = 255;
  const G_value = 182;
  const B_value = 193;
  
  const colorDisplay = "rgb(" + objectClicked?.material.color.r + "," + objectClicked?.material.color.g + "," + objectClicked?.material.color.b + ")";
  
  const fields = Object.values(fieldToChange).filter(field => isNaN(Number(field)));
  const rgb = Object.values(colorToChange).filter(field => isNaN(Number(field)));
  
  const [isCollapsed, setIsCollapsed] = useState<Boolean>(true);

  const propertySection = (sectionName: string, fieldName: string) => (
    <div>
      {sectionName }
      {Object.values(fields).map((field) => (
        <div className="flex items-center border-2 border-grayFill hover:border-gray-600 active:border-gray-600 rounded p-1" key={field}>
          <label className="whitespace-nowrap px-4 text-gray-400"> 
            {field.toString().toUpperCase()}{fieldName} 
          </label>
          <input
            id={`${sectionName.toLowerCase()}-${field}`}
            className="p-0.5 w-full bg-grayFill"
            type="text"
            maxLength={15}
            defaultValue={formatNumber(objectClicked![sectionName.toLowerCase() as keyof typeof objectClicked][field as keyof typeof fieldToChange], 2)}
            onBlur={() => updateProperty(`${sectionName.toLowerCase()}-${field}`, objectClicked)}
          />
        </div>
      ))}
    </div>
  );

  return (
    <>
    <div className="fixed flex flex-row top-5 bottom-5 right-3 rounded-lg">

    {/* Collapse-Tab Button */}
    <div className="flex justify-start items-center w-8 h-full">
        <button 
          className="bg-graySubFill rounded-l-lg  hover:bg-blueHover h-full"  
          onClick={ () => {
            setIsCollapsed(!isCollapsed);
          }}>
          
          <img 
            src={isCollapsed ? "openPanel.svg" : "collapsePanel.svg"} 
            width="40" alt="icon" />

        </button>
      </div>

    { isCollapsed ? 
      <div className="flex flex-col space-y-3 top-10 bottom-10 right-3 p-4 w-56 h-full bg-grayFill rounded-r-lg text-sm">
        <h1 className='text-base'>Object Properties</h1>
        <h2 className='italic'> Object name </h2>
        <LineSeparator/>

        <div>
          Color
          <div className='w-48 h-48 justify-self-center p-4'> <img src="color_wheel.png"/> </div>
          <div className='grid grid-cols-3 content-evenly'>
            {Object.values(rgb).map((color_char) => (
              <div className="flex items-center border-2 border-grayFill hover:border-gray-600 active:border-gray-600 rounded p-1" key={color_char}>
                <label className="pr-2 text-gray-400"> {color_char.toString().toUpperCase()} </label>
                <input 
                  id={`color-${color_char}`}
                  className="p-0.5 w-full bg-grayFill"
                  defaultValue={formatNumber(objectClicked?.material.color[color_char as keyof typeof colorToChange],0)}
                  onBlur={() => {
                    updateProperty(`color-${color_char}`, objectClicked);
                    // console.log(objectClicked?.material.color);
                  }}
                  />
              </div>
            ))}
          </div>
          <div className="my-2 h-5" style={{ background: colorDisplay }}/>
        </div>
        
        <LineSeparator/>
        <div>
          {propertySection("Position","")}
          <LineSeparator/>
          {propertySection("Rotation","-axis")}
          <LineSeparator/>
          {propertySection("Scale","")}
        </div>

        <LineSeparator/>

        <div>
          Wireframe 
          { objectClicked?.material.wireframe ?
            <button className='bg-white text-black hover:bg-blueHover ml-5 p-2 rounded-lg w-16' 
              onClick={() => {
                setWireframeVisibility(objectClicked, false);  
                console.log(objectClicked?.material);
              }}> ON </button>
          : 
            <button className='bg-graySubFill hover:bg-blueHover ml-5 p-2 rounded-lg w-16'
              onClick={() => {
                setWireframeVisibility(objectClicked, true);
              }}> OFF </button>
          }
        </div> 

      </div>   
    : null
    }
    </div>

    </>
  );
};


// ------------------------------------------------------------------------------------------------------

function LineSeparator(){
  return(
    <div className = "bg-gray-500 w-full h-0.5 my-3 rounded-lg"/>
  )
}

// ------------------------------------------------------------------------------------------------------

const formatNumber = (number: number, decimal: number) => {
  if(number % 1 === 0){
    return number.toFixed(0);
  }
  return number.toFixed(decimal);
}

// ------------------------------------------------------------------------------------------------------

function updateProperty(id: string, object: THREE.Mesh | null){
  // FORMAT: id = property + "-" + position
  let input = document.getElementById(id) as HTMLInputElement;
  
  if(object !== undefined && input !== undefined){
    const property = id.substring(0,id.length - 2).toLowerCase() as keyof typeof object;
    let pos, prevInput;

    if(property === "color"){
      pos = id.charAt(id.length - 1) as keyof typeof colorToChange;
      prevInput = formatNumber(object!.material[property][pos],0);
    }
    else{
      pos = id.charAt(id.length - 1) as keyof typeof fieldToChange;
      prevInput = formatNumber(object![property][pos],2);
    }
    // console.log(property);
    // console.log(pos);

    //  NOTE: COLOR VALUE IS BETWEEN 0 AND 255

    // Only proceed if input content changes
    if(input.value !== prevInput){
      console.log("old "+ pos + " = " + prevInput); 
      console.log("new "+ pos + " = " + input.value);

      // Remove whitespace
      if(input.value.replace(/\s/g, "") === ""){
        input.value = prevInput;
      }
      // Only accept number
      else if(isNaN(Number(input.value))){
        input.value = prevInput;
      }
      else if(property === "position" && ((Number(input.value) * 10 % 10) !== 0) || parseInt(input.value) < 0 || parseInt(input.value) > 255){
        input.value = prevInput;
      }
      else {
        input.value = formatNumber(parseFloat(input.value),2);
        switch(property){
          case "position": {
            setPos(object,fieldToChange[pos],parseFloat(input.value));
            break;
          }
          case "rotation": {
            setRotEuler(object,fieldToChange[pos],parseFloat(input.value));
            break;
          }
          case "scale": {
            setScale(object,fieldToChange[pos],parseFloat(input.value));
            break;
          }
          case "color": {
            setColorRGB(object, colorToChange[pos],parseInt(input.value));
            break;
          }
          default:
            break;
        }
      }
    }
  }
}
