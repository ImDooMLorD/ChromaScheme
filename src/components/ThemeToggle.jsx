import React from "react";
import "./ThemeToggle.css";
import { SunIcon, MoonIcon } from "./icons";

function ThemeToggle({ isDarkMode, toggleTheme }) {
  return (
    <button
      className={`theme-toggle ${isDarkMode ? "dark" : "light"}`}
      onClick={toggleTheme}
      title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      aria-label="Toggle theme"
    >
      <span className="toggle-icon">
        {isDarkMode ? <SunIcon /> : <MoonIcon />}
      </span>
      <span className="toggle-text">
        {isDarkMode ? "Light" : "Dark"}
      </span>
    </button>
  );
}

export default ThemeToggle;