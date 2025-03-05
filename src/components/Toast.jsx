import React from 'react';
import './Toast.css';

const Toast = ({ text, color }) => (
  <div className="toast" style={{ backgroundColor: color }}>
    {text}
  </div>
);

export default Toast;
