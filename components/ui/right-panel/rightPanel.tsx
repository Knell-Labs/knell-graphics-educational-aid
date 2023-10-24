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

    return (
        <>

        </>

    )
}
