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
    "Box": "boxUnpressed.svg",
    "AmbientLight": "AmbientLight.svg" ,
    "Group": "Group.svg"
}

export function LeftPanel({ sceneInfo, sceneTitle }: LeftPanelProps ) {

  useEffect( () => {
    console.log(sceneInfo)
  }, [])

  if (!sceneInfo) {
    return null;
  }

  const [isCollapsed, setIsCollapsed] = useState<Boolean>(true);

  let imageSrc;
  if(!isCollapsed){
    imageSrc = "openPanel.svg"
  }
  else{
    imageSrc = "collapsePanel.svg"
  }

  return (
    <>
    <div className="fixed flex flex-row top-10 bottom-10 left-3 w-72 rounded-lg items-center">

      { isCollapsed ? (

        <div className="flex flex-col top-10 bottom-10 left-3 p-6 w-64 h-full bg-grayFill rounded-lg items-center">   
            
          {/* Section 1: Panel Header */}
          <div className="flex justify-between w-full items-center"> 
            {sceneTitle} 

            <button className="ml-2 hover:bg-blue-500 "> 
              <img src="expandPanel.svg" width="20" alt="icon" />
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="flex w-full items-center pt-3 pb-1 "> 
            <input 
              type="text" 
              placeholder="search" 
              className="w-full bg-graySubFill p-2 rounded text-white" // padding and rounded corners for styling
            />
          </div>

          <LineSeparator/>

          {/* Section 2: Scene Info */}
          <div className="flex justify-between w-full"> 
            Scene Info
          </div>

          <div className="w-full h-full bg-graySubFill flex-grow max-h-5/6 p-3 mt-3 rounded-lg overflow-auto">
            <div className="w-full bg-graySubFill rounded-lg">
              <ul className="flex flex-col">
                {generateListItems(sceneInfo)}
              </ul>
            </div>
          </div>

          <LineSeparator/>
          
          {/* Section 3: Import Text-Button */}
          <button className="bg-graySubFill hover:bg-blue-500 w-full h-12 items-center rounded-lg"> 
            Import
          </button>

        </div>

      ) : null }  

      {/* Collapse-Tab Button */}
      <div className="flex justify-end items-center w-8 h-full">
        <button 
          className="bg-graySubFill hover:bg-blue-500 h-full"  
          onClick={ () => {
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
    } 
    else if (object.isGroup){
        let indexChildFound;
        let groupType;
        for(let childIndex = 0; childIndex < object.children.length; childIndex++){
            if(object.children[childIndex].type == "Mesh"){
                indexChildFound = childIndex
            }
            else if(object.children[childIndex].type == "LineSegments"){
                groupType = "LineSegments" 
            }
        }
        
        switch(groupType){
            case "LineSegments":
                displayType = threeJsGeometryMapping[object.children[indexChildFound].geometry.type];
                break;
            default:
                break;
        }
        if(groupType == undefined){
          displayType = "Group"
          children = object.children
        }

    } 
    else {
      displayType = threeJsGeometryMapping[object.geometry.type];
    }

    return (
      <li key={object.uuid} className={` 
                                        ${displayType !== "Group" ? "flex-col" : ""}`
                                        } 


      onClick={ () => console.log(object.uuid)}>
        
        { displayType !== "Group" 
            ? 
              <div className = "flex items-center space-x-1">
                <img src="line-object.svg" className="w-6 h-6"  width="20" />
                <img src={threeJsFileMapping[displayType]} className="w-10 h-6"/>
                    {displayType}
              </div>
            : 
              <div>
                <div className = "flex items-center space-x-1">
                  <img src="line-object.svg" className="w-6 h-6"  width="20" />
                      {displayType}
                  <img src={"group.svg"} className="w-4 h-4 ms-auto"/>
                </div>
                <ul className="flex flex-col pl-6 grow-0">
                {generateListItems( children )}
                </ul>
              </div>
        }
      </li>
    );
  });
}


function LineSeparator(){
  return(
    <div className = "bg-gray-500 w-11/12 h-1 my-3 rounded-lg"/>
  )
}
