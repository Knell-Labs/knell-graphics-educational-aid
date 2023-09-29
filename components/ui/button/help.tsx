import React, { useState } from 'react';

export function Help(){

    const [isHovered, setHovered] = useState<boolean>(false);
    const [isClicked, setClicked] = useState<boolean>(false);

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
                    
                    <div className="font-bold italic">
                        Press key to use feature
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

                    <div className={keyBgStyle}>
                        <div className={keyLineStyle}> CTRL </div> Change Camera Position
                    </div>

                    <div className={keyBgStyle}>
                        &nbsp; (&nbsp; <div className={keyLineStyle}> control </div> in macOS&nbsp;)
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