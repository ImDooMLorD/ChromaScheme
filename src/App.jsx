import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import ThemeToggle from "./components/ThemeToggle";
import Header from "./components/Header";
import Controls from "./components/Controls";
import ColorPalette from "./components/ColorPalette";
import ColorCodes from "./components/ColorCodes";

const COLOR_MODES = [
  { value: "monochrome", label: "Monochrome" },
  { value: "monochrome-dark", label: "Monochrome-dark" },
  { value: "monochrome-light", label: "Monochrome-light" },
  { value: "analogic", label: "Analogic" },
  { value: "complement", label: "Complement" },
  { value: "analogic-complement", label: "Analogic" },
  { value: "triad", label: "Triad" }
];

function App() {
  const [seedColor, setSeedColor] = useState("#24b1e0");
  const [colorScheme, setColorScheme] = useState("triad");
  const [colors, setColors] = useState(Array(5).fill("#ffffff"));
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Optimized fetchColors function - only fetches when explicitly called
  const fetchColors = useCallback(async (color, scheme) => {
    try {
      const hex = color.replace("#", "");
      const url = `https://www.thecolorapi.com/scheme?hex=${hex}&mode=${scheme}&count=5`;
      const response = await fetch(url);
      
      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      setColors(data.colors.map(c => c.hex.value));
    } catch (error) {
      console.error("Failed to fetch colors:", error);
    }
  }, []);

  // Combined setup effect
  useEffect(() => {
    // Theme setup
    const savedTheme = localStorage.getItem("colorTheme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(savedTheme ? savedTheme === "dark" : prefersDark);
    
    // Viewport height and layout handler
    const handleViewportAndLayout = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      const appElement = document.querySelector('.app');
      if (appElement) {
        const contentHeight = appElement.scrollHeight;
        // Use side layout only on wider screens
        const needsSideLayout = contentHeight > window.innerHeight && window.innerWidth > 600;
        
        if (needsSideLayout) {
          document.body.classList.add('needs-side-layout');
        } else {
          document.body.classList.remove('needs-side-layout');
        }
        // Removed forced dispatch causing jitter:
        // setTimeout(() => window.dispatchEvent(new Event('resize')), 10);
      }
    };

    handleViewportAndLayout();
    window.addEventListener('resize', handleViewportAndLayout);
    
    fetchColors(seedColor, colorScheme);
    
    return () => window.removeEventListener('resize', handleViewportAndLayout);
  }, [fetchColors]);

  // Apply theme changes
  useEffect(() => {
    // Don't remove the needs-side-layout class when toggling theme
    const currentClasses = document.body.className.split(' ');
    const needsSideLayout = currentClasses.includes('needs-side-layout');
    
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
    if (needsSideLayout) {
      document.body.classList.add('needs-side-layout');
    }
    
    localStorage.setItem("colorTheme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Handlers
  const toggleTheme = useCallback(() => setIsDarkMode(prev => !prev), []);
  const handleGenerateColors = () => fetchColors(seedColor, colorScheme);

  return (
    <>
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className={`app ${document.body.classList.contains('needs-side-layout') ? 'two-column-layout' : ''}`}>
        <div className="header-wrapper">
          <Header />
        </div>
        <div className="container">
          <Controls 
            seedColor={seedColor}
            setSeedColor={setSeedColor}
            colorScheme={colorScheme}
            setColorScheme={setColorScheme}
            fetchColors={handleGenerateColors}
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
