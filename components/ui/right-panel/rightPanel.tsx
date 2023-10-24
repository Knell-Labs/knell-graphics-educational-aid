import React, { Component, useEffect, useState } from 'react';

interface RightPanelProps {
    objectClicked: THREE.Mesh | null;
}

export function RightPanel({objectClicked}: RightPanelProps) {
  useEffect( () => {
    if(objectClicked){
        objectClicked.geometry.computeBoundingSphere()
        console.log(objectClicked);
        console.log(objectClicked.geometry.type);//string
        

        /*The logs below should be things we should display and be able to edit*/
        console.log(objectClicked.name);//string
        console.log(objectClicked.material.color);//string
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
