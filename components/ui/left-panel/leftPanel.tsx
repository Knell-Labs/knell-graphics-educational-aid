import React, { FormEvent, useEffect, useState } from 'react';

interface LeftPanelProps {
  sceneInfo: Array<any>;
  sceneTitle: string;
  openGroupIDs: string[];
  handleOpenGroup: (group_id: string) => void;
}

type StringDictionary = {
    [key: string]: string;
};

const threeJsGeometryMapping: StringDictionary = {
    "BoxGeometry": "Box"
}

const threeJsFileMapping: StringDictionary = {
    "Box": "boxUnpressed.svg",
    "AmbientLight": "AmbientLight.svg",
    "Group": "Group.svg",
    "DirectionalLight" : "DirectionalLight.svg"
}

const groupMapping: StringDictionary = {
    "DirLightGroup":   "DirectionalLight",
    "CubeGroup": "Box"
}

export function LeftPanel(props: LeftPanelProps ) {
  const { sceneInfo, sceneTitle, openGroupIDs, handleOpenGroup } = props;
  useEffect( () => {
    // console.log(sceneInfo)
  }, [])

  if (!sceneInfo) {
    return null;
  }

  const [isCollapsed, setIsCollapsed] = useState<Boolean>(true);

  handleEditableContent(".editableTitle", 50);

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
    <div className="fixed flex flex-row top-10 bottom-10 left-3 rounded-lg items-center">

      { isCollapsed ? (

        <div className="flex flex-col top-10 bottom-10 left-3 p-6 w-64 h-full bg-grayFill rounded-lg items-center">   
            
          {/* Section 1: Panel Header */}
          <div className="flex justify-between w-full items-center"> 
            <div className="editableTitle max-w-[80%]" 
              contentEditable="true" 
              suppressContentEditableWarning={true} 
              spellCheck="false">
              {sceneTitle} 
            </div>
            
            <button className="p-1 rounded w-8 h-8 hover:bg-blue-500 "> 
              <img src="expandMenu.svg" alt="icon" />
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
          <div className="flex justify-between items-center w-full"> 
            Scene Info

            <button className="p-1 rounded w-7 h-7 hover:bg-blue-500 "> 
              <img src="groupAdd.svg" alt="icon" />
            </button>
          </div>

          <div className="w-full h-full bg-graySubFill flex-grow max-h-5/6 p-3 mt-2 rounded-lg overflow-auto">
            <div className="w-full bg-graySubFill rounded-lg">
              <ul className="flex flex-col">
                {generateListItems(props)}
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
        null
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

function generateListItems(props: LeftPanelProps): JSX.Element[] {

  const {sceneInfo:scene, openGroupIDs, handleOpenGroup} = props;
  // Step 1: Filter out objects with blank names
  
  const filteredObjects = scene.filter(object => 
    !object.name.includes('init') 
      && 
    !object.type.includes('Camera') 
      && 
    !object.name.includes('helper')
      &&
    !object.type.includes('Helper')
      &&
    !(object.type.includes('Group') && object.children.length === 0 )
  );

  handleEditableContent(".editableObjectName", 20);
      
  return filteredObjects.map((object, idx) => {
        
    let displayType;
    let children;
    
    const group_id = object.uuid.toString();

    if (object.isLight) {
      displayType = object.type;
    } 
    else if(object.isGroup && object.type != "Group"){
        displayType =  groupMapping[object.type]
    }
    else if (object.isGroup){
        let indexChildFound: number = -1;
        let groupType;
        for(let childIndex = 0; childIndex < object.children.length; childIndex++){
            if(object.children[childIndex].type == "Mesh"){
                indexChildFound = childIndex
            }
            else if(object.children[childIndex].type == "LineSegments"){
                groupType = "LineSegments" 
            }
            else if(object.children[childIndex].isTransformControls){
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

      // onClick={ () => console.log(object.uuid)}
      >
        
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
                <div 
                  className="editableObjectName ml-2"
                  contentEditable="true" 
                  suppressContentEditableWarning={true}
                  spellCheck="false"
                  >
                  {displayType}
                  {/* {objectName} */}
                  
                </div>
              </div>
            : 
              // GROUP
              <div>
                <div className = "flex items-top space-x-1 mt-1">
                  
                  {/* Collapse/Expand Group Button */}
                  <div>
                    <button 
                      className="w-5 h-5"
                      onClick={() => handleOpenGroup(group_id)}
                    >
                      { openGroupIDs.includes(group_id) ? (
                        <img src="expandGroup.svg"/>
                      ) : (
                        <img src="collapseGroup.svg"/>
                      )}
                    </button>
                  </div>

                  {/* Group Folder Icon */}
                  <div className="flex items-top"
                  >
                    <img src="groupFolder.svg" className="w-5 h-5 mr-2"/>
                    <div             
                      className="editableObjectName"        
                      contentEditable="true" 
                      suppressContentEditableWarning={true}>
                        {displayType} {(object.uuid.toString()).substring(0,7)}
                      </div>
                  </div>
                </div>

                {/* Items of Group */}
                <div className={openGroupIDs.includes(group_id) ? "flex ml-7 items-center" : "hidden"}>
                  <ul className="flex flex-col grow-0">
                  {generateListItems( { ... props, sceneInfo:children} )}
                  </ul>
                </div>
                
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

function handleEditableContent(queryName: string, maxLength: number){
  // const maxLength = 20;
  const elements = document.querySelectorAll(queryName);
  const handleObjectName = (event: any, div: HTMLDivElement) => {
    if(div !== undefined){
      if(event.keyCode === 13 || (event.keyCode !== 8 && div!.textContent!.length >= maxLength)){
        event.preventDefault();
      }
      else {
        // console.log(id!.textContent!.length);
      }
    }
  }
  elements.forEach((div) => {
    div.addEventListener('keydown', (event) => {
      handleObjectName(event, div as HTMLDivElement);
    });
  });
}