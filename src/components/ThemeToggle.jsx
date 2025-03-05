import React from 'react';
import './ThemeToggle.css';

const ThemeToggle = ({ isDarkMode, toggleTheme }) => (
  <button 
    className="theme-toggle" 
    onClick={toggleTheme}
    aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
  >
    {isDarkMode ? "Light Mode" : "Dark Mode"}
  </button>
);

export default ThemeToggle;
