import React, { useEffect, useState, useRef } from 'react';
import { Dispatch, SetStateAction } from "react";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';
import {Tooltip as ReactTooltip} from 'react-tooltip';

import DropdownButton from '../button/dropdown'
import Button from '../button'

import { Session } from '@/types/auth';
import { DropdownItem } from '@/types/components'

interface ToolPanelProps {
  session                   : Session | null
  handleLogout              : () => void;
  handleShowLoginForm       : () => void;
  isObjectButtonPressed     : boolean;
  setIsObjectButtonPressed  : Dispatch<SetStateAction<boolean>>;
  objectTypePressed         : string;
  setObjectTypePressed      : Dispatch<SetStateAction<string>>;
  addObjectToScene          : (type: string, props?: any) => void;
  isSketchButtonPressed     : boolean;
  setIsSketchButtonPressed  : Dispatch<SetStateAction<boolean>>;
}

export function ToolPanel({
  session,
  handleLogout,
  handleShowLoginForm,
  isObjectButtonPressed,
  setIsObjectButtonPressed,
  objectTypePressed,
  setObjectTypePressed,
  addObjectToScene,
  isSketchButtonPressed,
  setIsSketchButtonPressed
}: ToolPanelProps) {

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
  
  const buttonShape = "hover:bg-blueHover rounded-lg p-1 w-8 h-8";
  const buttonShapePressed = "bg-blueHover rounded-lg p-1 w-8 h-8";
  const buttonText = "bg-graySubFill text-white hover:bg-blueHover w-fit px-3 py-1 mx-1 rounded-lg";

  const fileInputRef = useRef(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = (event) => {
            const contents = event.target?.result;
            if (contents) {
                const loader = new STLLoader();
                const geometry = loader.parse(contents as ArrayBuffer);
                addObjectToScene('stlObject', { mesh: new THREE.Mesh(geometry, new THREE.MeshNormalMaterial()) });
            }
        };
    }
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

  const [isBoxButtonPressed, setBoxButtonPressed] = useState<boolean>(true);
  const boxImageSrc = isBoxButtonPressed ? "boxUnpressed.svg" : "boxPressed.svg";

  const handleBoxButtonClick = () => {
    toggleButtonPressed("cube");
    setBoxButtonPressed(!isBoxButtonPressed);
  };

  const handleLoadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const profileMenuOpts : DropdownItem[] = [
    { label: session && session?.user?.email, isText: true },
    { isDivider: true },
    {
      label: "Logout",
      // isFormAction: true,
      // formActionUrl: "/auth/logout",
      // formMethod: "POST"
      callback: handleLogout
    }
  ]

  const Divider = () => <div style={{
    background: 'gray',
    height: '25px',
    width: '3px',
    display: 'inline-block',
    verticalAlign: 'middle',
    margin: '0 5px',
    borderRadius: '20px',
  }}/>

  return (
    <div className="absolute top-0 left-1/2 m-2 flex items-center gap-2  p-2 rounded-lg select-none"
      style={{
        transform: 'translateX(-50%)',
        background: 'rgb(30,29,32)',
        padding: '5px 10px',
        userSelect: 'none',
        borderRadius: '10px',
      }}
    >
      { !!session ? (
        <DropdownButton
          items     = {profileMenuOpts}
          variant   = 'primary-link'
          className = 'ps-2 pe-1 pb-0 pt-0 flex items-center'
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 block">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </DropdownButton>
      ) : (
        <Button type="button" size="small" onClick={handleShowLoginForm}>
          {"Login"}
        </Button>
      )}

      <Divider />

      <Button 
        type="button"
        size="small"
        variant="secondary"
        onClick={() => {
          setIsSketchButtonPressed(!isSketchButtonPressed);
          console.log(isSketchButtonPressed);
        }}
      >
        {"Sketch"}
      </Button>

      <Divider/>

      <Button 
        type = "button"
        size = "small"
        variant = "secondary"
        onClick = { handleLoadButtonClick }>
        {"Load"}

      <input 
        type = "file" 
        ref = { fileInputRef } 
        style = {{ display: 'none' }} 
        accept = ".stl" 
        onChange = { handleFileChange } 
      />
      </Button>
      
      <Divider/>
      
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
        }}
        data-tooltip-id="tooltip" data-tooltip-content="cursor">
        <img src="CursorSelect.svg"/>
      </button>

      <button className={isShapeButtonPressed.cube ? buttonShapePressed : buttonShape}
        onClick = { () => toggleButtonPressed("cube")} 
        data-tooltip-id="tooltip" data-tooltip-content="cube">
        <img src="cube.svg"/>
      </button>


      <button className={isShapeButtonPressed.sphere ? buttonShapePressed : buttonShape}
        onClick = { () => toggleButtonPressed("sphere") }
        data-tooltip-id="tooltip" data-tooltip-content="sphere">
        <img src="sphere.svg"/>
      </button>

      <button className={isShapeButtonPressed.cylinder ? buttonShapePressed : buttonShape}
        onClick = { () => toggleButtonPressed("cylinder") }
        data-tooltip-id="tooltip" data-tooltip-content="cylinder">
        <img src="cylinder.svg"/>
      </button>

      <button className={isShapeButtonPressed.cone ? buttonShapePressed : buttonShape}
        onClick = { () => toggleButtonPressed("cone") }
        data-tooltip-id="tooltip" data-tooltip-content="cone">
        <img src="cone.svg"/>
      </button>

      <button className={isShapeButtonPressed.tetrahedron ? buttonShapePressed : buttonShape}
        onClick = { () => toggleButtonPressed("tetrahedron") }
        data-tooltip-id="tooltip" data-tooltip-content="tetrahedron">
        <img src="tetrahedron.svg"/>
      </button>

      <button className={isShapeButtonPressed.pyramid ? buttonShapePressed : buttonShape}
        onClick = { () => toggleButtonPressed("pyramid") }
        data-tooltip-id="tooltip" data-tooltip-content="pyramid">
        <img src="pyramid.svg"/>
      </button>

      <button className={isShapeButtonPressed.hemisphere ? buttonShapePressed : buttonShape}
        onClick = { () => toggleButtonPressed("hemisphere") }
        data-tooltip-id="tooltip" data-tooltip-content="hemisphere">
        <img src="hemisphere.svg"/>
      </button>
      
      <ReactTooltip 
        id = "tooltip" 
        place="bottom"
        style={{
          borderRadius: '20%',
          padding: '1px 10px 4px 10px',
        }}
      />


    </div>
  )
}
