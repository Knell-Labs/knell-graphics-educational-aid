import { Html } from  '@react-three/drei'
import React from 'react';

export function LeftPanel(props){
  return (
    <div className="fixed top-50 left-5 h-5/6 w-1/7 bg-customGray rounded-lg">
      <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mb-4">
        My Button
      </button>

      <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mb-4">
        My Button
      </button>
    </div>
  );
};
