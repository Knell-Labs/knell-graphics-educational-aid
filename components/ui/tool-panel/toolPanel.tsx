import React from 'react';

export function ToolPanel(){
  return (
    <div style={{
      position: 'fixed', // Use fixed position to overlay on the 3D canvas
      top: 10,
      left: '50%', // Move the div to the horizontal center
      transform: 'translateX(-50%)', // Adjust for centering
      background: 'gray',
      padding: '5px 10px', // Add some padding around the text
    }}>
      Hello
    </div>
  )

}
