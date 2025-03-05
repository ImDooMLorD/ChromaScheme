import React, { useState } from 'react';
import Toast from './Toast';

const ColorCodes = ({ colors }) => {
  const [toast, setToast] = useState({ visible: false, text: '', color: '' });

  const copyToClipboard = (text, color) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        // Show success toast
        setToast({
          visible: true,
          text: `${text} copied!`,
          color: color
        });
        
        // Hide toast after 2 seconds
        setTimeout(() => {
          setToast({ visible: false, text: '', color: '' });
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy color: ', err);
        setToast({
          visible: true,
          text: 'Failed to copy',
          color: ''
        });
        
        setTimeout(() => {
          setToast({ visible: false, text: '', color: '' });
        }, 2000);
      });
  };

  return (
    <footer className="color-codes">
      {colors.map((color, index) => (
        <div 
          key={index} 
          className="color-code"
          onClick={() => copyToClipboard(color, color)}
          title="Click to copy"
        >
          {color}
        </div>
      ))}
      
      {toast.visible && (
        <Toast text={toast.text} color={toast.color} />
      )}
    </footer>
  );
};

export default ColorCodes;
