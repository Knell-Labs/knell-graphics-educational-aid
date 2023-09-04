import React from 'react';

type ToolPanelProps = {
  onAddCube: () => void; // Define a prop for the callback
};

<<<<<<< Updated upstream
export function ToolPanel({ onAddCube }: ToolPanelProps) {  
=======
interface props {
  isObjectButtonPressed: boolean;
  setIsObjectButtonPressed: Dispatch<SetStateAction<boolean>>;
  objectTypePressed: string
  setObjectTypePressed: Dispatch<SetStateAction<string>>;
  onAddCube: () => void; // Define a prop for the callback
}


export function ToolPanel(objectButtonPress: props){
  const { isObjectButtonPressed, 
          setIsObjectButtonPressed, 
          objectTypePressed, 
          setObjectTypePressed,
          onAddCube } = objectButtonPress;

  const toggleButtonPressed = (objectType: string) => {
    setIsObjectButtonPressed(!isObjectButtonPressed);
    setObjectTypePressed(objectType)
  };

  const currObjectTypePressed = (objectType: string) => {
    setObjectTypePressed(objectType)
  }

>>>>>>> Stashed changes
  return (
    <div style={{
      position: 'fixed', // Use fixed position to overlay on the 3D canvas
      top: 10,
      left: '50%', // Move the div to the horizontal center
      transform: 'translateX(-50%)', // Adjust for centering
      background: 'black',
      padding: '5px 10px', // Add some padding around the text
      userSelect: 'none',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center'
    }}>

      <button className = "bg-gray-400 text-white hover:bg-blue-500 rounded-lg p-1"
       onClick = { () => console.log("pressed")}>
         Save
      </button>

<<<<<<< Updated upstream
      <LineSeparator/>

      {/* Temporary butoon to add a cube */}
      <button className = "bg-gray-400 text-white hover:bg-blue-500 rounded-lg p-1"
        onClick={onAddCube} // Attach the passed down callback
      >
        Cube
=======
      <LineSeparator/>

      {/* Temporary butoon to add a cube */}
      <button className = "bg-gray-400 text-white hover:bg-blue-500 rounded-lg p-1"
        onClick={onAddCube} // Attach the passed down callback
      >
        Cube
      </button>

      <LineSeparator/>
      
      <button className="flex items-center hover:bg-blue-500 rounded p-1 h-100">
        <img src="CursorSelect.svg" width="20" />
>>>>>>> Stashed changes
      </button>

      <LineSeparator/>
        <button className="flex items-center hover:bg-blue-500 rounded p-1 h-100">
        <img src="CursorSelect.svg" width="20" />
      </button>

    </div>
  )

}


function LineSeparator(){
  return (
    <div style = {{
      background: 'gray',
      height: '25px',
      width: '3px',
      display: 'inline-block', // Keep the line on the same line as the button
      verticalAlign: 'middle', // Align the line vertically in the middle
      marginLeft: '10px', // Add some spacing between the button and the line
      marginRight: '10px', // Add some spacing between the line and the button
      borderRadius: '20px',
    }}/>
  )
}
