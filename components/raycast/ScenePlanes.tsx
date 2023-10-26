import React from "react";
import { Plane } from '@react-three/drei';
import { useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import { Dispatch, SetStateAction } from "react";
import { TwoDimPlaneRotation, CameraDirection } from "../basicScene";


interface props {
  isOrthographic: boolean;
  orthoCameraRef: React.RefObject<THREE.OrthographicCamera>;
  persCameraRef: React.RefObject<THREE.PerspectiveCamera>;
  planeOrientation: TwoDimPlaneRotation;
  setPlaneOrientation:  Dispatch<SetStateAction<TwoDimPlaneRotation>>;
  girdOrientation: TwoDimPlaneRotation;
  setGirdOrientation:  Dispatch<SetStateAction<TwoDimPlaneRotation>>;
  setCurrCameraPos: Dispatch<SetStateAction<CameraDirection>>;
}


export function CadPlanes(props: props){
  const { 
          isOrthographic,
          orthoCameraRef,
          persCameraRef,
          planeOrientation,
          setPlaneOrientation,
          girdOrientation,
          setGirdOrientation,
          setCurrCameraPos
  } = props;
    


  function computeCamraPosRedClick(){
    if( ( !isOrthographic && persCameraRef.current) || ( isOrthographic && orthoCameraRef.current) ){
        
        //Gets the camera normal vector
        let vector = new THREE.Vector3( 0, 0, -1 );

        if( !isOrthographic && persCameraRef.current){
            vector.applyQuaternion(persCameraRef.current.quaternion);
        }
        else if(isOrthographic && orthoCameraRef.current){
            vector.applyQuaternion(orthoCameraRef.current.quaternion);
        }

        //If our camera is facing the "front" of the red Plane
        //which as a normal vector of [0,1,0] the the sign of the 
        //dot product with the normal vector of the camera 
        //result will always be negative. So we move the camera to 
        //the front of that plane. Other wise move camera to face 
        //The "back"
        if( vector.dot( new THREE.Vector3( 0, 1, 0) ) <  0 ){
            if( !isOrthographic && persCameraRef.current){
            persCameraRef.current.position.set( 0, 25 ,0 ); 
            }
            else if(isOrthographic && orthoCameraRef.current){
                orthoCameraRef.current?.position.set(0, 25,0);
            }
            setPlaneOrientation( [-Math.PI/2, 0, 0] );
            setGirdOrientation( [0, 0, 0] );
            setCurrCameraPos(CameraDirection.redTop)

        }else{

            if( !isOrthographic && persCameraRef.current){
            persCameraRef.current.position.set( 0, -25 ,0 ); 
            }
            else if(isOrthographic && orthoCameraRef.current){
                orthoCameraRef.current?.position.set(0, -25,0);
            }
            setPlaneOrientation( [Math.PI/2, 0, 0] );
            setGirdOrientation( [0, 0, 0] );
            setCurrCameraPos(CameraDirection.redBottom)
        }
    }
  }

  function computeCamraPosGreenClick(){
    if( ( !isOrthographic && persCameraRef.current) || ( isOrthographic && orthoCameraRef.current) ){
        
        //Gets the camera normal vector
        let vector = new THREE.Vector3( 0, 0, -1 );

        if( !isOrthographic && persCameraRef.current){
            vector.applyQuaternion(persCameraRef.current.quaternion);
        }
        else if(isOrthographic && orthoCameraRef.current){
            vector.applyQuaternion(orthoCameraRef.current.quaternion);
        }

        //If our camera is facing the "front" of the green Plane
        //which as a normal vector of [0,0,1] the the sign of the 
        //dot product with the normal vector of the camera 
        //result will always be negative. So we move the camera to 
        //the front of that plane. Other wise move camera to face 
        //The "back"
        if( vector.dot( new THREE.Vector3( 0, 0, 1) ) <  0 ){

            if( !isOrthographic && persCameraRef.current){
                persCameraRef.current.position.set(0, 0, 25); 
            }
            else if(isOrthographic && orthoCameraRef.current){
                orthoCameraRef.current?.position.set(0, 0,25);
            }

            setPlaneOrientation( [0, 0, 0] );
            setGirdOrientation( [Math.PI / 2, 0, 0] );
            setCurrCameraPos(CameraDirection.greenFront)
        }else{
            if( !isOrthographic && persCameraRef.current){
                persCameraRef.current.position.set(0, 0, -25); 
            }
            else if(isOrthographic && orthoCameraRef.current){
                orthoCameraRef.current?.position.set(0, 0,-25);
            }
            setPlaneOrientation( [-Math.PI, 0, 0] );
            setGirdOrientation( [Math.PI / 2, 0, 0] );
            setCurrCameraPos(CameraDirection.greenBack)
        }

    }
  }

  function computeCamraPosBlueClick(){
    if( ( !isOrthographic && persCameraRef.current) || ( isOrthographic && orthoCameraRef.current) ){
        
        //Gets the camra normal vector
        let vector = new THREE.Vector3( 0, 0, -1 );

        if( !isOrthographic && persCameraRef.current){
            vector.applyQuaternion(persCameraRef.current.quaternion);
        }
        else if(isOrthographic && orthoCameraRef.current){
            vector.applyQuaternion(orthoCameraRef.current.quaternion);
        }

        //If our camera is facing the "front" of the blue Plane
        //which as a normal vector of [1,0,0] the the sign of the 
        //dot product with the normal vector of the camera 
        //result will always be negative. So we move the camera to 
        //the front of that plane. Other wise move camera to face 
        //The "back"
        if(vector.dot(new THREE.Vector3(1, 0, 0)) <  0){

            if( !isOrthographic && persCameraRef.current){
                persCameraRef.current.position.set(25, 0, 0); 
            }
            else if(isOrthographic && orthoCameraRef.current){
                orthoCameraRef.current?.position.set(25, 0, 0);
            }

            setPlaneOrientation( [0, Math.PI / 2, 0] );
            setGirdOrientation( [0, 0, Math.PI / 2] );
            setCurrCameraPos(CameraDirection.blueFront)
        }else{
            if( !isOrthographic && persCameraRef.current){
                persCameraRef.current.position.set(-25, 0, 0); 
            }
            else if(isOrthographic && orthoCameraRef.current){
                orthoCameraRef.current?.position.set(-25, 0, 0);
            }

            setPlaneOrientation( [0, -Math.PI / 2, 0] );
            setGirdOrientation( [0, 0, -Math.PI / 2] );
            setCurrCameraPos(CameraDirection.blueBack)
        }

    }
  }



  return (
    <>
      <Plane args={[20, 20]} 
        receiveShadow
        rotation={[0, 0, 0]}
        onClick={(e) => {
            e.stopPropagation();
            console.log("Clicked Green")
            computeCamraPosGreenClick()
        }}
        >
        <meshBasicMaterial
          side={THREE.DoubleSide}
          color="green"
          transparent={true}
          opacity={0.3}
        />
      </Plane>

      <Plane args={[20, 20]} 
        receiveShadow
        rotation={[Math.PI / 2, 0, 0]}
        onClick={(e) => {
            e.stopPropagation();
            console.log("Clicked Red")
            computeCamraPosRedClick()
        }}
        >
        <meshBasicMaterial
          side={THREE.DoubleSide}
          color="red"
          transparent={true}
          opacity={0.3}
        />
      </Plane>

      <Plane args={[20, 20]}
        receiveShadow
        rotation={[0, Math.PI / 2, 0 ]}
        onClick={(e) => {
            e.stopPropagation();
            console.log("Clicked Red")
            computeCamraPosBlueClick()
        }}
        >
        <meshBasicMaterial
          side={THREE.DoubleSide}
          color="blue"
          transparent={true}
          opacity={0.3}
        />
      </Plane>
  </>
  )
}
