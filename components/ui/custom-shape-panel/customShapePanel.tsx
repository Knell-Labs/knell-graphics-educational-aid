import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CustomShapes } from "../../objects/CustomShapes"

enum lineField {
	x,
	y, 
}

enum holeField {
	x,
	y,
  radius,
  startAngle,
  endAngle,
  clockwise, 
}

enum extrudeGeoField {
  steps,
  depth,
  // bevelEnabled,
  bevelThickness,
  bevelSize,
  bevelOffset,
  bevelSegments,
}

interface lineProp{
  x: string | null,
  y: string | null,
}

interface props{
  setLineProperty: Dispatch<SetStateAction<lineProp>>;
}

// export function CustomShapePanel(line: props) {
export function CustomShapePanel( {setLineProperty} : props ) {
  const lineFields = Object.values(lineField).filter(field => isNaN(Number(field)));
  const holeFields = Object.values(holeField).filter(field => isNaN(Number(field)));
  const extrudeGeoFields = Object.values(extrudeGeoField).filter(field => isNaN(Number(field)));

  const [lineHistory, setLineHistory] = useState<{x: string, y: string}[]>([]);
  const [holeHistory, setHoleHistory] = useState<{
    x: string, 
    y: string,
    radius: string,
    startAngle: string,
    endAngle: string,
    clockwise: string,
  }[]>([]);

  const sliderStyle = `
  ::-webkit-slider-runnable-track,
  ::-moz-range-track {
    background: #053a5f;
    height: 0.5rem;
  }
  `;
    
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

	const fieldProperty = (sectionName: string, fields, index: number, colNum: number) => (
		<div className={`grid grid-cols-${colNum} content-evenly items-center`}>
			{ sectionName + " " + index}
			{Object.values(fields).map((field) => (
				<div key={`${sectionName.toLowerCase()}_${field}_${index}`} 
          className="flex bg-graySubFill border-2 border-grayFill hover:border-gray-600 active:border-gray-600 rounded m-1">
					<label className="whitespace-nowrap px-2 text-gray-400"> 
						{field}
					</label>
          {/* TODO: Change to <input> once done? */}
					<div  
          // AS OF NOW, there is only one line of input, thus the id is unique enough
						id={`${sectionName.toLowerCase()}_${field}`}
						contentEditable={true}
						suppressContentEditableWarning={true}
						// onBlur={() => {
							// 	updateProperty(`${sectionName.toLowerCase()}_${field}`,objectClicked,2);
							// }}
							>
						{/* {formatNumber(objectClicked![sectionName.toLowerCase() as keyof typeof objectClicked][field as keyof typeof lineField] * ratio, 2)} */}
						{"0"}
					</div>
				</div>
			))}
		</div>
	);

  const addLine = () => {
    const x = document.getElementById("line_x") as HTMLDivElement;
    const y = document.getElementById("line_y") as HTMLDivElement;
    
    if(x.textContent != null && y.textContent != null){
      setLineHistory([
        ...lineHistory, 
        { x: x.textContent, y: y.textContent }
      ]);
    }

    setLineProperty({x: x.textContent, y: y.textContent});
  };

  const addHole = () => {
    const x = document.getElementById("hole_x") as HTMLDivElement;
    const y = document.getElementById("hole_y") as HTMLDivElement;
    const radius = document.getElementById("hole_radius") as HTMLDivElement;
    const startAngle = document.getElementById("hole_startAngle") as HTMLDivElement;
    const endAngle = document.getElementById("hole_endAngle") as HTMLDivElement;
    const clockwise = document.getElementById("hole_clockwise") as HTMLDivElement;
    
    if(x.textContent != null && y.textContent != null && radius.textContent != null
        && startAngle.textContent != null && endAngle.textContent != null && clockwise.textContent != null
      ){
      setHoleHistory([
        ...holeHistory, 
        { 
          x: x.textContent, 
          y: y.textContent,
          radius: radius.textContent,
          startAngle: startAngle.textContent,
          endAngle: endAngle.textContent,
          clockwise: clockwise.textContent,
        }
      ]);
    }
    console.log("add Hole");
  };

  const slider = (minVal: number, maxVal: number, stepVal: number) => (
    <input
      type="range"
      min="0"
      max=""
      step="10"
      style={{background: 'white'}}
    >
    
    </input>
  );


  // const renderDivs = () => {
  //   const divArray = [];
  //   for(let i = 0; i < lineCount; i++){
  //     divArray.push("Line", fieldProperty(i+1));
  //   }
  //   return divArray;	
  // };

	return (
		<>
			<div>
        <div className="fixed flex flex-col top-5 bottom-5 right-3 text-sm bg-grayFill rounded-lg">
          
          <div 
            id="line_add"
            className="flex flex-col p-4 w-56 h-1/3 overflow-auto">
            <ul id="line_history" className="flex flex-col grow-0 overflow-auto">
            <style>{scrollbarStyles}</style>
              {lineHistory.map((item, index) => (
                <li key={index} className="whitespace-pre">
                  {`Line ${index + 1}:         x: ${item.x}          y: ${item.y}`}
                </li>  
              ))}
            </ul>
            <div>
              {fieldProperty("Line", lineFields, lineHistory.length + 1, 3)}
              {/* {renderDivs()} */}
            </div>

            <button 
              className="bg-graySubFill mt-2 hover:bg-blueHover rounded-lg"
              onClick={addLine}
            >add line</button>
          </div>  {/* end of Add Line */}
          
          <div className = "bg-gray-500 w-full h-0.5 my-3 rounded-lg"/>

          <div id="hole_add"
            className="flex flex-col p-4 w-56 h-full overflow-auto">
              <ul id="hole_history" className="flex flex-col grow-0 overflow-auto">
                <style>{scrollbarStyles}</style>
                {holeHistory.map((item, index) => (
                  <li key={index} className="whitespace-pre">
                    {`Hole ${index + 1}: x: ${item.x},  y: ${item.y}
radius: ${item.radius},  startAngle: ${item.startAngle},
endAngle: ${item.endAngle},  clockwise: ${item.clockwise}\n \n`}
                  </li>  
                ))}
            </ul>
              <div>
                {fieldProperty("Hole", holeFields, holeHistory.length + 1, 2)}
              </div>
          <button 
              className="bg-graySubFill mt-2 hover:bg-blueHover rounded-lg"
              onClick={addHole}
            >add hole</button>
          </div>

        </div>
        
        <div className="fixed flex flex-col top-5 left-3 text-sm bg-grayFill rounded-lg">
          <div 
            id="extrude_geometry"
            className="flex flex-col p-4 w-56 overflow-auto">
              <label>Extrude Geometry</label>
              <div>
                {slider(0,100,10)}
              </div>
          </div>
        </div>
      </div>
		</>);

}



