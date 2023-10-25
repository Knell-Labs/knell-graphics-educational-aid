import React, { useState } from 'react';
import { Dispatch, SetStateAction } from "react";
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
  }} />

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
          className = 'px-0 py-0 flex items-center'
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 block">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </DropdownButton>
      ) : (
        <Button type="button" onClick={handleShowLoginForm}>
          Login
        </Button>
      )}

      <Divider />

      <button className="bg-graySubFill text-white hover:bg-blue-500 w-20 rounded-lg p-1" onClick={() => {
        setIsSketchButtonPressed(!isSketchButtonPressed);
        console.log(isSketchButtonPressed);
      }}>
        Sketch
      </button>

      <Divider />

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
