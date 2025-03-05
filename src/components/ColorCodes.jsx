import React from 'react';

const ColorCodes = ({ colors }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .catch(err => console.error('Failed to copy color: ', err));
  };

  return (
    <footer className="color-codes">
      {colors.map((color, index) => (
        <div 
          key={index} 
          className="color-code"
          onClick={() => copyToClipboard(color)}
          title={`Click to copy ${color}`}
        >
          {color}
        </div>
      ))}
    </footer>
  );
};

export default ColorCodes;
