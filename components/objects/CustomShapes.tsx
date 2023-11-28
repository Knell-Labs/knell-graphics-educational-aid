import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface lineProp{
  x: string | null,
  y: string | null,
}

interface props{
  lineProperty: lineProp;
}

export function CustomShapes({lineProperty}: props) {
  
  const mesh = useRef();
  
  const length = 4, width = 4;
  // console.log("TEST");
  
  // Create the main shape
  // const shape2 = new THREE.Shape();
  // setShape(shape.moveTo(0,0));
  // const [shape, setShape] = useState(new THREE.Shape());
  const shape = new THREE.Shape();
  
  shape.moveTo(0, 0);
  shape.lineTo(0, 0);
  shape.lineTo(0, width);
  shape.lineTo(width, length);
  shape.lineTo(length, 0);
  
  // shape.moveTo(-2, -2);
  // shape.lineTo(-2, -2);
  // shape.lineTo(-2, -4);
  // shape.lineTo(-4, -4);
  // shape.lineTo(-4, -2);
  
  // let num: number = 0;
  const [num, setNum] = useState<number>(0);

  useEffect( () => {
    if(lineProperty.x != null && lineProperty.y != null){
      
      // console.log(lineProperty.x);
      // console.log(lineProperty.y);
      const newShape = new THREE.Shape();
      // newShape.moveTo(0,0);
      // newShape.curves = shape.curves.slice();
      // shape.lineTo(parseFloat(lineProperty.x),parseFloat(lineProperty.y));
      // shape.lineTo(parseFloat(lineProperty.x),parseFloat(lineProperty.y)+4);
      // shape.lineTo(parseFloat(lineProperty.x)+4,parseFloat(lineProperty.y)+4);
      // shape.lineTo(parseFloat(lineProperty.x)+4,parseFloat(lineProperty.y));
      // setShape(newShape);
      console.log("Before " + (num + 1));
      setNum(num + 1);
      // console.log(shape.curves);
    }
    console.log("After " + num);
  }, [lineProperty]);
  // console.log(shape.curves);

  // Define the hole
  const hole = new THREE.Path();
  hole.moveTo( 0, 2 )
  .quadraticCurveTo( 2, 4, 4, 2)
  //.bezierCurveTo(5, 2.5, 5, 3, 4, 4)
  //.quadraticCurveTo( 2, 6, 0, 4)
  //.quadraticCurveTo(-.5, 3, 0, 2)

  // hole.moveTo( 2, 2 ).absarc( 1, 1, .5, 0, Math.PI , true );
  //const holeRadius = 2; // Set the radius of the hole
  //const holePositionX = length / 2 + 1; // Center of the shape in X
  //const holePositionY = width / 2 + 1;  // Center of the shape in Y
  //hole.absarc(holePositionX, holePositionY, holeRadius, 0, Math.PI * 2, false);

  // Add the hole to the shape
  shape.holes.push(hole);

  // Define the extrude settings
  const extrudeSettings = {
    steps: 1,
    depth: 1,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: 1,
    bevelSegments: 12
  };

  // Create the geometry with the hole
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);


  return (
    <>
      <mesh
        ref={mesh}
        geometry={geometry}
        position={[0, 0, 0]}
      >
        <meshBasicMaterial attach="material" color={0x00ff00} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial attach="material" color={0x000000} />
      </lineSegments>
    </>
  );
};


