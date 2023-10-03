import React, { useState } from 'react';

export function Help(){

    const [isHovered, setHovered] = useState<boolean>(false);
    const [isClicked, setClicked] = useState<boolean>(false);

    const text = `Click on the object, then
    press Key to use feature`

    const textNote = `NOTE: the zooming feature only 
    works in Perspective mode.
    The change will be discarded if you 
    zoom in Orthographic mode then 
    switch to Perspective mode.`

    let ctrlButton;
    if(navigator.userAgent.indexOf("Mac") != -1){
        ctrlButton = "control";
    }
    else {
        ctrlButton = "CTRL";
    }

    const keyBgStyle = "flex flex-row mt-2";

    const keyLineStyle = `self-center text-center text-sm font-bold text-gray-300
                        w-wrap h-wrap mr-2 px-1.5 border-2 border-gray-300 rounded`;

    return (
        <div className="flex flex-col fixed right-3 top-3">

            <div className="flex justify-end">
            
                <button
                    className="flex justify-end p-1 
                    bg-grayFill hover:bg-blue-500 w-10 h-10 rounded-full"
                    onClick     ={() => { setClicked(!isClicked);   }}
                    onMouseEnter={() => { setHovered(true);         }}
                    onMouseLeave={() => { setHovered(false);        }}
                >
                    <img src="help.svg" width={100} alt="icon"/>
                </button>
            
            </div>


            { isClicked ? (
                <div className="flex-grow bg-grayFill text-gray-300
                                px-4 py-2 pb-3 mt-3 w-wrap h-wrap rounded-lg">
                    
                    <div className="font-bold italic whitespace-pre-line mb-3">
                        {text}
                    </div>
                    
                    <div className={keyBgStyle}>
                        <div className={keyLineStyle}> T </div> Translate Object
                    </div>
                    
                    <div className={keyBgStyle}>
                        <div className={keyLineStyle}> S </div> Scale Object
                    </div>

                    <div className={keyBgStyle}>
                        <div className={keyLineStyle}> R </div> Rotate Object
                    </div>



                    <div className="font-bold italic whitespace-pre-line mt-5 mb-3">
                        Or press Key and use Mouse
                    </div>

                    <div className={keyBgStyle}>
                        <div className={keyLineStyle}> {ctrlButton} </div> +&nbsp;
                        <img src="leftMouse.svg" width={23}/>
                        &nbsp;Rotate Camera
                    </div>

                    <div className={keyBgStyle}>
                        <div className={keyLineStyle}> {ctrlButton} </div> +&nbsp;
                        <img src="rightMouse.svg" width={23}/>
                        &nbsp;Pan Camera
                    </div>

                    <div className={keyBgStyle}>
                        <div className={keyLineStyle}> {ctrlButton} </div> +&nbsp;
                        <img src="scrollWheelMouse.svg" width={25}/>
                        &nbsp;Zoom In/Out
                    </div>

                    <div className="text-xs text-gray-400  mt-5 whitespace-pre-line">
                        {textNote}
                    </div>

                </div>    

            ) : null
            } 


            <div className="justify-end flex pt-1">
            { (isHovered && !isClicked) ? (
                <div className="text-gray-400 text-base text-center">
                    Help
                </div>
            ) : null
            }
            </div>
        </div>
    )
}