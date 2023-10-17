import React, { Component, useEffect, useState } from 'react';

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

  const [isSearching, setIsSearching] = useState<Boolean>(false);
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = (event: Event) => {
    const key = (event.target as HTMLInputElement).value;
    setSearchKey(key);

    if(key == ""){
      setIsSearching(false);
    }
    else{
      setIsSearching(true);
    }
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
    <div className="fixed flex flex-row top-5 bottom-5 left-3 rounded-lg items-center">

      { isCollapsed ? (

        <div className="flex flex-col top-10 bottom-10 left-3 p-4 w-56 h-full bg-grayFill rounded-l-lg items-center">   
            
          {/* Section 1: Panel Header */}
          <div className="flex justify-between w-full"> 
            <div 
              id = "editableTitle"
              className=" max-w-[80%] mr-2 break-all" 
              spellCheck="false"
              onClick={() => handleEditableContent("editableTitle", 60)}
              >
              {sceneTitle} 
            </div>
            
            <button className="p-1 rounded w-7 h-7 hover:bg-blueHover "> 
              <img src="expandMenu.svg" alt="icon" />
            </button>
          </div>
          

          <LineSeparator/>

          {/* Section 2: Scene Info */}
          <div className="flex text-sm text-gray-300 justify-between items-center w-full"> 
            Scene Info

          </div>

          {/* Search Bar */}
          <div className="flex w-full items-center my-2"> 
            <input id="searchBox"
              className="w-full bg-graySubFill p-1.5 rounded text-sm text-white" // padding and rounded corners for styling
              type="text" 
              placeholder="search" 
              value={searchKey}
              onChange={handleSearch}
            />
          </div>

          <div className="w-full h-full flex-grow max-h-5/6 p-1 rounded-lg overflow-auto">
            <div className="w-full rounded-lg">
              
              <ul className="flex flex-col">
                {generateListItems(props, searchKey)}
              </ul>

              <style>{scrollbarStyles}</style>
            </div>
          </div>

          <LineSeparator/>
          
          {/* Section 3: Import Text-Button */}
          <button className="bg-graySubFill hover:bg-blueHover py-1 w-full h-12 items-center rounded-lg"> 
            Import
          </button>

        </div>

      ) : (
        null
      ) }  

      {/* Collapse-Tab Button */}
      <div className="flex justify-end items-center w-8 h-full">
        <button 
          className="bg-graySubFill rounded-r-lg  hover:bg-blueHover h-full"  
          onClick={ () => {
            setIsCollapsed(!isCollapsed);
          }}>
          
          <img 
            src={isCollapsed ? "collapsePanel.svg" : "openPanel.svg"} 
            width="40" alt="icon" />

        </button>
      </div>

    </div>   

    </>
  );
};

function generateListItems(props: LeftPanelProps, searchKey: string): JSX.Element[] {

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
    
    let objName = displayType;

    return (
      <li key={object.uuid} 
        className={` ${displayType !== "Group" ? "flex-col" : ""}`} 
      >

      {  

      // || ( searchKey !== "" && (displayType.toLowerCase()).includes(searchKey.toLowerCase()) ) )

      // -----------------------------------------------------------------------------------
      // 1. NO search - NON-GROUP
      ( searchKey === "" && displayType !== "Group" )
      ? 
        <div className = "flex items-center">

          <div className="flex shrink-0 items-center w-4 h-7 mr-2">
            <img src="line-object.svg"/>
          </div>
          <div className="shrink-0 w-4 h-4 mr-2 ">
            <img src={threeJsFileMapping[displayType]}/>
          </div>

          <div 
            id = {object.uuid}
            className="whitespace-nowrap text-sm text-gray-400 hover:text-white" 
            spellCheck="false"

            onClick={() => {
              let text = handleEditableContent(object.uuid, 20);
              if(text !== undefined && text !== null){
                object.name = text;
              }
              console.log(object.name + " is on CLICK"); // DEBUG
            }}

            onBlur={() => {
              console.log(object.name + " is on BLUR");  // DEBUG
            }}
          >
            {objName}
          </div>
        </div>       
        
        : 
        // -----------------------------------------------------------------------------------
        // 2. NO search - GROUP
        ( searchKey === "" && displayType === "Group" ) 
        ?
        <div>
            <div className = "flex py-1">
              
              {/* Collapse/Expand Group Button */}
              <div className = "flex items-center">
                <button 
                  className="w-4 h-4"
                  onClick={() => handleOpenGroup(group_id)}
                >
              
                <img src={ openGroupIDs.includes(group_id) ? "expandGroup.svg" : "collapseGroup.svg"}/>
                  
                </button>
              </div>

              {/* Group Folder Icon */}
              <div className="flex items-center">
                <img src="groupFolder.svg" className="w-3.5 h-3.5 mx-2"/>
                <div             
                  className="editableObjectName
                             whitespace-nowrap text-sm text-gray-400 hover:text-white"    
                  spellCheck="false"
                >
                  {objName} {(object.uuid.toString()).substring(0,7)}
                </div>
              </div>
            </div>

            {/* Items of Group */}
            <div className={openGroupIDs.includes(group_id) ? "flex ml-6 items-center" : "hidden"}>
              <ul className="flex flex-col grow-0">
              {generateListItems( { ... props, sceneInfo:children}, searchKey )}
              </ul>
            </div>
            
        </div>
        
        // : 
        // // -----------------------------------------------------------------------------------
        // // 3. SEARCH - FOUND - NON-GROUP
        // ( searchKey !== "" && displayType !== "Group" && (displayType.toLowerCase()).includes(searchKey.toLowerCase()) )
        // ? 
        // <div className = "flex items-center">

        //   <div className="flex shrink-0 items-center w-4 h-7 mr-2">
        //     <img src="line-object.svg"/>
        //   </div>
        //   <div className="shrink-0 w-4 h-4 mr-2 ">
        //     <img src={threeJsFileMapping[displayType]}/>
        //   </div>

        //   <div 
        //     className="editableObjectName
        //               whitespace-nowrap text-sm text-gray-400 hover:text-white" 
        //     spellCheck="false"
        //   >
        //     {objectName}
        //   </div>
        // </div>       

        // :
        // // -----------------------------------------------------------------------------------
        // // 4. SEARCH - FOUND - GROUP
        // ( searchKey !== "" && displayType === "Group" && (displayType.toLowerCase()).includes(searchKey.toLowerCase())) 
        // ?
        // <div>
            
        //   <div className = "flex py-1">
            
        //     {/* Collapse/Expand Group Button */}
        //     <div className = "flex items-center">
        //       <button 
        //         className="w-4 h-4"
        //         onClick={() => handleOpenGroup(group_id)}
        //         >
            
        //       <img src={ openGroupIDs.includes(group_id) ? "expandGroup.svg" : "collapseGroup.svg"}/>
                
        //       </button>
        //     </div>

        //     {/* Group Folder Icon */}
        //     <div className="flex items-center">
        //       <img src="groupFolder.svg" className="w-3.5 h-3.5 mx-2"/>
        //       <div             
        //         className="editableObjectName
        //                     whitespace-nowrap text-sm text-gray-400 hover:text-white"    
        //         spellCheck="false"
        //       >
        //         {objectName} {(object.uuid.toString()).substring(0,7)}
        //       </div>
        //     </div>
        //   </div>

        //   {/* Items of Group */}
        //   <div className={openGroupIDs.includes(group_id) ? "flex ml-6 items-center" : "hidden"}>
        //     <ul className="flex flex-col grow-0">
        //     {generateListItems( { ... props, sceneInfo:children}, searchKey )}
        //     </ul>
        //   </div>
          
        // </div>
      
        : null
  
      }
      
    </li>
  );
  
  
});
}


// ------------------------------------------------------------------
function LineSeparator(){
  return(
    <div className = "bg-gray-500 w-full h-1 my-3 rounded-lg"/>
    )
}

// ------------------------------------------------------------------
  
function handleEditableContent(queryName: string, maxLength: number){
  const activateEdit = ( div: HTMLDivElement) => {
    div.contentEditable = "true";
  }
  const inactivateEdit = ( div: HTMLDivElement) => {
    div.contentEditable = "false";
    
  }
  const limitTextLength = (event: any, div: HTMLDivElement) => {
    if(div !== undefined){
      if(event.keyCode === 13 || (event.keyCode !== 8 && div!.textContent!.length >= maxLength)){
        event.preventDefault();
      }
    }
  }

  // TODO: Only go thru the selected div, not all
  // This code is going thru ALL!!
  // const elements = document.querySelectorAll(queryName);
  const div = document.getElementById(queryName);
  // elements.forEach((div) => {
    
    // "Double Click" makes the text editable
    // Need to "Triple Click" to actually edit the text
    div?.addEventListener('dblclick', () => {
      activateEdit(div as HTMLDivElement);
    });
    
    // Check for maximum of character
    div?.addEventListener('keydown', (event) => {
      limitTextLength(event, div as HTMLDivElement);
    });
    
    // Inactivate Editable Text when not on focus
    div?.addEventListener('blur', () => {
      inactivateEdit(div as HTMLDivElement);
    });
    
    // if(div.textContent !== null && div.textContent !== ""){
      
    //   console.log(">>" + div.textContent + "<<");
    return(div?.textContent);
    // } 

  // });

  // if(text !== ""){
  // }
  // return text;
  
  // text = "testing";

}