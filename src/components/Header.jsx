import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="app-header">
      <h1>ChromaScheme</h1>
      <p className="app-description">
        Generate beautiful color schemes with just a few clicks.
      </p>
      <div className="instructions">
        <div className="instruction-step">
          <div className="step-number">1</div>
          <span className="step-text">Choose a seed color</span>
        </div>
        <div className="instruction-step">
          <div className="step-number">2</div>
          <span className="step-text">Select scheme type</span>
        </div>
        <div className="instruction-step">
          <div className="step-number">3</div>
          <span className="step-text">Generate palette</span>
        </div>
        <div className="instruction-step">
          <div className="step-number">4</div>
          <span className="step-text">Click hex to copy</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
