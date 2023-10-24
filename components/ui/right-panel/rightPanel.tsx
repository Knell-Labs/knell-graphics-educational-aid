import React, { Component, useEffect, useState } from 'react';

interface RightPanelProps {
    objectClicked: THREE.Mesh | null;
}

export function RightPanel({objectClicked}: RightPanelProps) {
  useEffect( () => {
    if(objectClicked){
        console.log(objectClicked?.position);
        console.log(objectClicked?.rotation);
        console.log(objectClicked?.quaternion);
    }

  }, [objectClicked])

    return (
        <>

        </>

    )
}
