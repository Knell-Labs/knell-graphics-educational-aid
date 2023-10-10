import React from "react";
import { Plane } from '@react-three/drei';
import { useEffect, useRef, useState} from 'react';
import * as THREE from 'three';

export function CadPlanes(){

  const greenPlaneRef = useRef<THREE.Mesh>(null);

  return (
    <group>
      <Plane args={[20, 20]} receiveShadow rotation={[0, 0, 0]}>
        <meshBasicMaterial
          side={THREE.DoubleSide}
          color="green"
          transparent={true}
          opacity={0.3}
        />
      </Plane>

      <Plane args={[20, 20]} receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial
          side={THREE.DoubleSide}
          color="red"
          transparent={true}
          opacity={0.3}
        />
      </Plane>

      <Plane args={[20, 20]} receiveShadow rotation={[0, Math.PI / 2, 0 ]}>
        <meshBasicMaterial
          side={THREE.DoubleSide}
          color="blue"
          transparent={true}
          opacity={0.3}
        />
      </Plane>


  </group>
      )
}
