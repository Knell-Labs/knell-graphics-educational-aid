import React, { useEffect, useState } from 'react';

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
    "AmbientLight": "AmbientLight.svg" ,
    "Group": "Group.svg"
}

interface props {
  isCollapsed: boolean;
  setIsCollapsed: boolean;
}

export function LeftPanel({ sceneInfo, sceneTitle }: LeftPanelProps ) {

  useEffect( () => {
    // console.log(sceneInfo)
  }, [])

  if (!sceneInfo) {
    return null;
  }

  const [isCollapsed, setIsCollapsed] = useState<Boolean>(true);

  const collapseTabToggle = () => {
    return setIsCollapsed(!isCollapsed)
  }

  let imageSrc;
  if(!isCollapsed){
    imageSrc = "openPanel.svg"
  }
  else{
    imageSrc = "collapsePanel.svg"
  }

  return (
   <>
    {/* Panel (with Collapse Button) */}
    <div className="fixed flex bg-grayFill top-10 bottom-10 left-5">  
      
      { isCollapsed ? (

      // Panel (without Collapse button)
      <div className="flex flex-col p-5 w-full h-full rounded-lg items-center">
        
        {/* Section 1: Panel Header */}
        <div className="flex justify-start w-full items-center"> 
          {sceneTitle} 
          
          {/* Expand-Tab Buttton */}
          <div className="flex justify-end w-full items-center">   
            <button className="bg-graySubFill hover:bg-blue-500 ">  
              <img 
                src="expandPanel.svg" 
                width="20"
                alt="icon" 
                onClick={() => console.log("Expand Tab")}
              />
            </button>
          </div>

        </div>  
        
        {/* Search Bar */}
        <div className="flex w-full mt-3"> 
          <input 
            type="text" 
            placeholder="search" 
            className="bg-graySubFill p-3 w-full rounded-lg text-white" // padding and rounded corners for styling
          />
        </div>

        <LineSeparator/>

        {/* Section 2: Scene Info */}
        <div className="flex justify-between w-full items-center"> 
          Scene Info
        </div>

        <div className="w-full flex-grow mt-3">
          <div className="bg-graySubFill h-full p-3 rounded-lg">
            <ul className="flex flex-col">
            {generateListItems(sceneInfo)}
            </ul>
          </div>
        </div>

        <LineSeparator/>

        {/* Section 3: Import Text-Button */}
        <div className="flex items-center h-10 w-full rounded-lg">
          <button className=" bg-graySubFill hover:bg-blue-500 w-full h-10 items-center rounded-lg"> 
            Import
          </button>
        </div>
        

      </div>


      ) : null }

      {/* Collapse Tab Button */}
      <div className="items-center h-full">
        <button 
          className="bg-graySubFill hover:bg-blue-500 h-full"  
          onClick={ () => {
            console.log(`Collapse: ${isCollapsed}`);
            setIsCollapsed(!isCollapsed);
          }}>
          <img 
            src={imageSrc} 
            width="40" 
            alt="icon" 
          />
        </button>
      </div>

    </div>
    </>
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
    let children;
    
    if (object.isLight) {
      displayType = object.type;
    } else if (object.isGroup){
        displayType = "Group"
        children = object.children
    } else {
      displayType = threeJsGeometryMapping[object.geometry.type];
    }

    // console.log(displayType)
    return (
      <li key={object.uuid} className="flex items-center space-x-1" onClick={ () => console.log(object.uuid)}>
        <img src="line-object.svg" className="w-8 h-8"  width="20" />
        <img src={threeJsFileMapping[displayType]} className="w-10 h-5"   />
        {displayType}
      </li>
    );
  });
}

function LineSeparator(){
  return(
    <div className = "bg-gray-500 w-11/12 h-1 m-5 rounded-lg"/>
  )
}

function closePanel(collapseToggle: props){
  
  const { isCollapsed, setIsCollapsed } = collapseToggle;

}
