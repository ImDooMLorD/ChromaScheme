import React from 'react';
import './Toast.css';

const Toast = ({ text, color }) => {
  const style = color ? {
    backgroundColor: color,
    color: getContrastColor(color)
  } : {};
  
  return (
    <div className="toast" style={style}>
      <span>{text}</span>
    </div>
  );
};

// Helper function to determine text color based on background color contrast
const getContrastColor = (hexColor) => {
  // Remove the hash if it exists
  const hex = hexColor.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  // Return white or black based on brightness
  return brightness > 128 ? '#000000' : '#FFFFFF';
};

export default Toast;
