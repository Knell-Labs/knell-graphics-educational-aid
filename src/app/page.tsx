"use client"
import * as THREE from 'three';
import { useEffect, useState } from 'react';
import { ThreeScene, AnimeExample, ReactFiber  } from "../../components/test"
import WebGL from 'three/addons/capabilities/WebGL.js';
import { testSupabase } from '../../server/db/example';

export default function Home() {
    const [isWebGLAvailable, setIsWebGLAvailable] = useState(false);  

    useEffect(() => {
     setIsWebGLAvailable(WebGL.isWebGLAvailable());
     testSupabase()
    }, []);

  return (
    <div className="relative flex">
      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-4">
          {isWebGLAvailable ? 'WebGL is working nice !' : 'WebGL is not working :('}
        </h1>
        <AnimeExample/>
        <ThreeScene />
      </div>
    <ReactFiber/>
    </div>
  );

}
