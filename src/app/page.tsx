"use client"
import * as THREE from 'three';
import { useEffect, useState } from 'react';
import { ThreeScene, AnimeExample, ReactFiber  } from "../../components/test"
import WebGL from 'three/addons/capabilities/WebGL.js';
import { testSupabase } from '../../server/db/example';
import { BasicScene }  from "../../components/basicScene";
import {CameraSwitch} from "../../components/ui/buttons/cameraSwitch"

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
        </div>

    </>
  );

}
