import React from 'react';

export function ToolPanel(){
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
    }}>

      <button className = "bg-gray-400 text-white hover:bg-blue-500 rounded p-1"
       onClick = { () => console.log("pressed")}>
         More tools here
      </button>


      <LineSeparator/>
        <button className="inline-flex items-center justify-center bg-blue-500">

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
