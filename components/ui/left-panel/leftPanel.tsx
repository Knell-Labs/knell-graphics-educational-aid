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

  // rgba allows Transparency
  const scrollbarStyles = `
    ::-webkit-scrollbar {
      width: 20px; 
      height: 20px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #1a1a1a ;
      border-radius: 16px;
      border: 4px solid #3a3b3a; 
    }

    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-corner {
      background-color: #3a3b3a;
    }

    ::-webkit-scrollbar-button {
      display:none;
    }
  `;

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
              <style>{scrollbarStyles}</style>
            </div>
          </div>

          <LineSeparator/>
          
          {/* Section 3: Import Text-Button */}
          <button className="bg-graySubFill hover:bg-blue-500 w-full h-12 items-center rounded-lg"> 
            Import
          </button>

        </div>

      ) : (
        <div className="hidden">   
          <ul className="flex flex-col">
            {generateListItems(sceneInfo)}
          </ul>
        </div>
      ) }  

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

  const [isGroupButtonPressed, setGroupButtonPressed] = useState<boolean>(true);

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
              // NON-GROUP
              <div className = "flex items-center">
                <div className="flex items-center w-5 h-5 m-1">
                  <img src="line-object.svg"/>
                </div>
                <div className="ml-1 w-6 h-6">
                  <img src={threeJsFileMapping[displayType]} className="w-6 h-6"/>
                </div>
                <div className="ml-2">
                  {displayType}
                  </div>
              </div>
            : 
              // GROUP
              <div>
                <div className = "flex items-center space-x-1 mt-1">
                  
                  <div className="flex w-4 h-4 items-center">
                    <button 
                      className="w-full h-full"
                      onClick={ () =>
                        setGroupButtonPressed(!isGroupButtonPressed)
                      }
                    >
                      { isGroupButtonPressed ? (
                        <img src="expandGroup.svg"/>
                      ) : (
                        <img src="collapseGroup.svg"/>
                      )}
                    </button>
                  </div>
                  {/* IF THERE IS LONGER/SHORTER TEXT, allignment of line-Object seems fine. WHY?? */}
                  <div className="flex items-center">
                    <img src="group.svg" className="w-4 h-4 mr-2"/>
                      {displayType}
                  </div>
                </div>

                {/* Items of Group */}
                { isGroupButtonPressed ? (
                  <div className="flex ml-6 items-center">
                    <ul className="flex flex-col grow-0">
                    {generateListItems( children )}
                    </ul>
                  </div>
                ) : (
                  <div className="hidden">
                    <ul className="flex flex-col grow-0">
                    {generateListItems( children )}
                    </ul>
                  </div>
                  
                )}
                
                
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
