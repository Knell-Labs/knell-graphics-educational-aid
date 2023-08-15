"use client"
import * as THREE from 'three';
import { useEffect, useState } from 'react';
import { ThreeScene, AnimeExample, ReactFiber  } from "../../components/test"
import WebGL from 'three/addons/capabilities/WebGL.js';
import { testSupabase } from '../../server/db/example';
import { BasicScene }  from "../../components/basicScene";
import {Overlay} from "../../components/ui/buttons/cameraSwitch"

export default function Home() {
    const [isWebGLAvailable, setIsWebGLAvailable] = useState(false);  

    useEffect(() => {
     setIsWebGLAvailable(WebGL.isWebGLAvailable());
     testSupabase()
    }, []);

  return (
    <>
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden items-center justify-center">
            <BasicScene/>
                <div className="absolute w-10 h-[19px] mb-10 inset-x-0 bottom-0 flex justify-center items-center z-0 bg-red-200 mx-auto">

                <button className= "cursor-auto select-none absolute justify-center"
                        onClick = {() => console.log("hello there")}>
                        fafa
                </button>

                </div>

        </div>

    </>
  );

}

/*
 
    <div className="h-screen flex">
 * */



