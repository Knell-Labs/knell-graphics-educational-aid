import React, { useState } from "react";
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

export function CustomShapePanel() {
  const lineFields = Object.values(lineField).filter(field => isNaN(Number(field)));
  const holeFields = Object.values(holeField).filter(field => isNaN(Number(field)));

  const [lineHistory, setlineHistory] = useState<{x: string, y: string}[]>([]);


	// const renderDivs = () => {
	// 	const divArray = [];
	// 	for(let i = 0; i < lineCount; i++){
	// 		divArray.push("Line", fieldProperty(i+1));
	// 	}
	// 	return divArray;	
	// };

  // console.log("TEST?");

	const fieldProperty = (sectionName: string, fields, index: boolean, colNum: number) => (
		<div className={`grid grid-cols-${colNum} content-evenly items-center`}>
			{ sectionName + " "}{index ? (lineHistory.length + 1) : ""}
			{Object.values(fields).map((field) => (
				<div key={`${sectionName.toLowerCase()}_${field}_${lineHistory.length}`} 
          className="flex bg-graySubFill border-2 border-grayFill hover:border-gray-600 active:border-gray-600 rounded m-1">
					<label className="whitespace-nowrap px-2 text-gray-400"> 
						{field}
					</label>
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
						0
					</div>
				</div>
			))}
		</div>
	);

  const addLine = () => {
    const x = document.getElementById("line_x") as HTMLDivElement;
    const y = document.getElementById("line_y") as HTMLDivElement;
    
    if(x.textContent != null && y.textContent != null){
      setlineHistory([
        ...lineHistory, 
        { x: x.textContent, y: y.textContent }
      ]);
    }
  }

  const addHole = () => {
    console.log("add Hole");
  }

	return (
		<>
			<div className="fixed flex flex-col top-5 bottom-5 right-3 text-sm bg-grayFill rounded-lg">
				
        <div 
					id="line_add"
					className="flex flex-col p-4 w-56 h-full overflow-auto">
				
          <ul id="line_history" className="flex flex-col grow-0">
            {lineHistory.map((item, index) => (
              <li key={index} className="whitespace-pre">
                {`Line ${index + 1}:         x: ${item.x}          y: ${item.y}`}
              </li>
              
            ))}
          </ul>
          <div>
            {fieldProperty("Line", lineFields, true, 3)}
            {/* {renderDivs()} */}
					</div>

					<button 
						className="bg-graySubFill mt-2 hover:bg-blueHover rounded-lg"
						onClick={addLine}
					>add line</button>
				</div>  {/* end of Add Line */}
        
        <div id="hole_add"
					className="flex flex-col p-4 w-56 h-full overflow-auto">
            <div>
              {fieldProperty("Hole", holeFields, false, 2)}
            </div>
        <button 
						className="bg-graySubFill mt-2 hover:bg-blueHover rounded-lg"
						onClick={addHole}
					>add hole</button>
        </div>

			</div>

		</>);

}



