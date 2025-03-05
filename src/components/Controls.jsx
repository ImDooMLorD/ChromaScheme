import React from 'react';
import CustomSelect from './CustomSelect';

const Controls = ({ seedColor, setSeedColor, colorScheme, setColorScheme, fetchColors, colorOptions }) => (
  <header className="controls">
    <input
      type="color"
      value={seedColor}
      onChange={e => setSeedColor(e.target.value)}
      title="Pick a seed color"
      className="color-picker"
    />
    <CustomSelect
      options={colorOptions}
      value={colorScheme}
      onChange={e => setColorScheme(e.target.value)}
      className="scheme-select"
      title="Select color scheme"
    />
    <button
      onClick={fetchColors}
      className="generate-btn"
      title="Generate color scheme"
    >
      Generate
    </button>
  </header>
);

export default Controls;
