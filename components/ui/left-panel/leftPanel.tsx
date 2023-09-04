import React, { useEffect } from 'react';

export function LeftPanel({ sceneInfo, sceneTitle }) {

  useEffect( () => {
    console.log(sceneInfo)
  }, [])

  return (
    <div className="fixed flex flex-col top-10 bottom-10 left-3 w-64 bg-grayFill rounded-lg items-center">
      <div className="flex justify-between w-full items-center pt-3 px-5"> 
        {sceneTitle} 
        <button className="bg-graySubFill ml-2 hover:bg-blue-500 "> 
            <img src="tab.svg" width="20" alt="icon" />
        </button>
      </div>
      
      <div className="flex items-center pt-3"> 
        <input 
          type="text" 
          placeholder="search" 
          className="bg-graySubFill p-1 rounded text-white" // padding and rounded corners for styling
        />
      </div>

      <div className="flex justify-between w-full items-center pt-2 px-5"> 
        Scene Info
      </div>

      <div className="w-full flex-grow px-7 pt-1 pb-6">
        <div className="bg-graySubFill h-full rounded-lg">
        </div>
      </div>

      <div className="flex  items-center pb-6 px-5"> 
        Save Scene
      </div>

    </div>
  );
};
