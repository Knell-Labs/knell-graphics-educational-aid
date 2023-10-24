import React, { Component, useEffect, useState } from 'react';
import * as THREE from 'three';

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
function setColorRGB(objectClicked: THREE.Mesh | null, R: number, B: number, G: number){
    const color = new THREE.Color("rgb(" + R + ", " + B + ", " + G + ")");
    objectClicked?.material.color.set(color);

}

function setPos( objectClicked: THREE.Mesh | null, posToChange: fieldToChange, posChange: number){
    switch (posToChange){
        case fieldToChange.x: {
            objectClicked?.position.setX(objectClicked.position.x + posChange);
            break;
        }
        case fieldToChange.y: {
            objectClicked?.position.setY(objectClicked.position.y + posChange);
            break;
        }
        case fieldToChange.z: {
            objectClicked?.position.setZ(objectClicked.position.z + posChange);
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
            objectClicked?.scale.setX( objectClicked.scale.x * scaleVal);
            break;
        }
        case fieldToChange.y: {
            objectClicked?.scale.setY( objectClicked.scale.y * scaleVal);
            break;
        }
        case fieldToChange.z: {
            objectClicked?.scale.setZ( objectClicked.scale.z * scaleVal);
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
        console.log(objectClicked);
        console.log(objectClicked.geometry.type);//string
        console.log(objectClicked.name);//string

        setColorRGB(objectClicked, 191, 41, 41);


        //setRotEuler(objectClicked, fieldToChange.y, 45);
        setScale(objectClicked, fieldToChange.x, 2);

        /*The logs below should be things we should display and be able to edit*/
        console.log(objectClicked.material.color);//vector
        console.log(objectClicked.material.wireframe);//T or F
        console.log(objectClicked?.position);//vector
        console.log(objectClicked?.rotation);//vector
        console.log(objectClicked?.scale);//vector
        console.log(objectClicked?.quaternion);//vector
    }
  }, [objectClicked])
  

  const coordClassName = "flex border-2 border-grayFill hover:border-gray-600 rounded-l p-1";
  const coordChildClassName = "pl-2 pr-4 text-gray-400";

  const R_value = 255;
  const G_value = 182;
  const B_value = 193;
  const color = "rgb(" + R_value + "," + G_value + "," + B_value + ")";
  // console.log(color);


  const [isCollapsed, setIsCollapsed] = useState<Boolean>(true);

  return (
    <>
    <div className="fixed flex flex-row top-5 bottom-5 right-3 rounded-lg">
    { isCollapsed ? 
      <div className="flex flex-col space-y-5 top-10 bottom-10 right-3 p-4 w-56 h-full bg-grayFill rounded-r-lg text-sm">
      
        <div>
          Color
          <div className='w-5 h-5' 
            style={{
              background: color
            }
            }
          >

          </div>
          <div className='grid grid-cols-3 gap-2 content-evenly'>
            <div className={coordClassName}> 
              <div className={coordChildClassName}> R </div>
              <div className='outline-none' contentEditable={true} suppressContentEditableWarning={true} > {R_value} </div> 
            </div>

            <div className={coordClassName}> 
              <div className={coordChildClassName}> G </div>
              <div className='outline-none' contentEditable={true} suppressContentEditableWarning={true} > {G_value} </div> 
            </div>

            <div className={coordClassName}> 
              <div className={coordChildClassName}> B </div>
              <div className='outline-none' contentEditable={true} suppressContentEditableWarning={true} > {B_value} </div> 
            </div>
          </div>
        </div>
        
        <LineSeparator/>

        <div>
          Position
          <div className='grid grid-cols-2 gap-2 content-evenly'>
            <div className={coordClassName}> 
              <div className={coordChildClassName}> X </div>
              <div className='outline-none' contentEditable={true} suppressContentEditableWarning={true} > 123.45 </div> 
            </div>

            <div className={coordClassName}> 
              <div className={coordChildClassName}> Y </div>
              <div className='outline-none' contentEditable={true} suppressContentEditableWarning={true} > 5.67 </div> 
            </div>
          </div>
        </div>
        
        <LineSeparator/>

        <div>
          Rotation
          <div className='grid grid-cols-1 content-evenly'>
            <div className={coordClassName}> 
              <div className={coordChildClassName}> X-axis </div>
              <div className='outline-none' contentEditable={true} suppressContentEditableWarning={true} > 123.45&deg; </div> 
            </div>

            <div className={coordClassName}> 
              <div className={coordChildClassName}> Y-axis </div>
              <div className='outline-none' contentEditable={true} suppressContentEditableWarning={true} > 5.67&deg; </div> 
            </div>

            <div className={coordClassName}> 
              <div className={coordChildClassName}> Z-axis </div>
              <div className='outline-none' contentEditable={true} suppressContentEditableWarning={true} > 98.67&deg; </div> 
            </div>
          </div>
        </div>

        <LineSeparator/>

        <div>
          Scale
          <div className='grid grid-cols-2 gap-2 content-evenly'>
            <div className={coordClassName}> 
              <div className={coordChildClassName}> X </div>
              <div className='outline-none' contentEditable={true} suppressContentEditableWarning={true} > 123.45 </div> 
            </div>

            <div className={coordClassName}> 
              <div className={coordChildClassName}> Y </div>
              <div className='outline-none' contentEditable={true} suppressContentEditableWarning={true} > 5.67 </div> 
            </div>
          </div>
        </div>

      </div>   
    : 
      <div>

      </div>
    }
      

    </div>

    </>
  );
};


function LineSeparator(){
  return(
    <div className = "bg-gray-500 w-full h-0.5 my-3 rounded-lg"/>
    )
}