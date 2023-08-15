import React from 'react';
import { Html } from '@react-three/drei'

export function Overlay() {
  return (
    <div className = "absolute">
        <button 
            onClick={ () => console.log("fadsfa")}
        > 
            Center thing 
        </button>
    </div>
    );
}


/*
 
          <button className="absolute block z-50 left-1/2 top-1/2"> Center fdsafasdf
        </button>
 * */
