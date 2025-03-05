import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import ThemeToggle from "./components/ThemeToggle";
import Controls from "./components/Controls";
import ColorPalette from "./components/ColorPalette";
import ColorCodes from "./components/ColorCodes";

const COLOR_MODES = [
  { value: "monochrome", label: "Monochrome" },
  { value: "monochrome-dark", label: "Monochrome-dark" },
  { value: "monochrome-light", label: "Monochrome-light" },
  { value: "analogic", label: "Analogic" },
  { value: "complement", label: "Complement" },
  { value: "analogic-complement", label: "Analogic-complement" },
  { value: "triad", label: "Triad" }
];

function App() {
  const [seedColor, setSeedColor] = useState("#24b1e0");
  const [colorScheme, setColorScheme] = useState("triad");
  const [colors, setColors] = useState(Array(5).fill("#ffffff"));
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchColors = useCallback(async () => {
    try {
      const hex = seedColor.replace("#", "");
      const url = `https://www.thecolorapi.com/scheme?hex=${hex}&mode=${colorScheme}&count=5`;
      const response = await fetch(url);
      
      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      setColors(data.colors.map(c => c.hex.value));
    } catch (error) {
      console.error("Failed to fetch colors:", error);
    }
  }, [seedColor, colorScheme]);

  // Initialize app
  useEffect(() => {
    // Theme setup
    const savedTheme = localStorage.getItem("colorTheme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(savedTheme ? savedTheme === "dark" : prefersDark);
    
    // Viewport height fix
    const setViewportHeight = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    
    // Initial color fetch
    fetchColors();
    
    return () => window.removeEventListener('resize', setViewportHeight);
  }, [fetchColors]);

  // Apply theme changes
  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("colorTheme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => setIsDarkMode(prev => !prev), []);

  return (
    <>
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="app">
        <div className="container">
          <Controls 
            seedColor={seedColor}
            setSeedColor={setSeedColor}
            colorScheme={colorScheme}
            setColorScheme={setColorScheme}
            fetchColors={fetchColors}
            colorOptions={COLOR_MODES}
          />
          <ColorPalette colors={colors} />
          <ColorCodes colors={colors} />
        </div>
      </div>
    </>
  );
}

export default App;
