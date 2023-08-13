"use client"
import * as THREE from 'three';
import { useEffect, useState } from 'react';
import { ThreeScene, AnimeExample, ReactFiber  } from "../../components/test"
import WebGL from 'three/addons/capabilities/WebGL.js';
import { testSupabase } from '../../server/db/example';
import { BasicScene }  from "../../components/basicScene";

export default function Home() {
    const [isWebGLAvailable, setIsWebGLAvailable] = useState(false);  

    useEffect(() => {
     setIsWebGLAvailable(WebGL.isWebGLAvailable());
     testSupabase()
    }, []);

  return (
    <div className="h-screen bg-blue-500 flex items-center justify-center">
    <BasicScene/>
    </div>
  );

}
