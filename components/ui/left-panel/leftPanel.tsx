import React, { useEffect } from 'react';

interface LeftPanelProps {
  sceneInfo: Array<any>;
  sceneTitle: string;
}

type StringDictionary = {
    [key: string]: string;
};

const threeJsGeometryMapping: StringDictionary = {
    "BoxGeometry": "Box"
}

const threeJsFileMapping: StringDictionary = {
    "Box": "box.svg",
    "AmbientLight": "AmbientLight.svg" 
}

export function LeftPanel({ sceneInfo, sceneTitle }: LeftPanelProps ) {

  useEffect( () => {
    console.log(sceneInfo)
  }, [])

  if (!sceneInfo) {
    return null;
  }

  return (
      <div className="fixed flex flex-col top-10 bottom-10 left-3 w-64 bg-grayFill rounded-lg items-center">
        <div className="flex justify-between w-full items-center pt-3 px-5"> 
          {sceneTitle} 
          <button className="bg-graySubFill ml-2 hover:bg-blue-500 "> 
              <img src="tab.svg" width="20" alt="icon" />
          </button>
        </div>
        
        <div className="flex items-center pt-3 pb-3"> 
          <input 
            type="text" 
            placeholder="search" 
            className="bg-graySubFill p-1 rounded text-white" // padding and rounded corners for styling
          />
        </div>

        <LineSeparator/>
        <div className="flex justify-between w-full items-center pt-2 px-5"> 
          Scene Info
        </div>

        <div className="w-full flex-grow px-7 pt-1 pb-6">
          <div className="bg-graySubFill h-full rounded-lg">
            <ul className="flex flex-col">
            {generateListItems(sceneInfo)}
            </ul>
          </div>
        </div>

        <LineSeparator/>

        <button className="flex items-center pb-6 px-5 pt-2"> 
          Import
        </button>


      </div>
  );
};


function generateListItems(scene: Array<any>): JSX.Element[] {
  // Step 1: Filter out objects with blank names
  const filteredObjects = scene.filter(object => 
    !object.name.includes('init') 
      && 
    !object.type.includes('Camera') 
      && 
    !object.name.includes('helper')
      &&
    !(object.type.includes('Group') && object.children.length === 0 )
  );

  return filteredObjects.map(object => {
    let displayType;
    
    if (object.isLight) {
      displayType = object.type;
    } else {
      displayType = threeJsGeometryMapping[object.geometry.type] || object.type;
    }

    console.log(displayType)
    return (
      <li key={object.uuid} className="flex items-center space-x-1" onClick={ () => console.log(object.uuid)}>
        <img src="line-object.svg" className="w-6 h-6"  width="20" />
        <img src={threeJsFileMapping[displayType]} className="w-10 h-6"   />
        {displayType}
      </li>
    );
  });
}


function LineSeparator(){
  return(
    <div className = "bg-gray-500 w-11/12 h-1 rounded-lg"/>
  )
}
