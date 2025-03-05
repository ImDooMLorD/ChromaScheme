import React from 'react';

const ColorPalette = ({ colors }) => (
  <div className="color-palette">
    {colors.map((color, index) => (
      <div 
        key={index} 
        className="color" 
        style={{ backgroundColor: color }}
        title={color}
      />
    ))}
  </div>
);

export default ColorPalette;
