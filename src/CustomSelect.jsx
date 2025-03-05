import React, { useState, useRef, useEffect } from "react";
import "./CustomSelect.css";

function CustomSelect({ options, value, onChange, className, title }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    options.find(opt => opt.value === value) || options[0]
  );
  const selectRef = useRef(null);

  // Update when value prop changes
  useEffect(() => {
    setSelected(options.find(opt => opt.value === value) || options[0]);
  }, [value, options]);

  // Click outside handler
  useEffect(() => {
    if (!isOpen) return;

    const closeDropdown = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, [isOpen]);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onChange({ target: { value: option.value } });
  };

  return (
    <div
      className={`custom-select ${className} ${isOpen ? "open" : ""}`}
      ref={selectRef}
      title={title}
    >
      <div className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span>{selected.label}</span>
        <span className="select-arrow" />
      </div>

      {isOpen && (
        <div className="select-options">
          {options.map(option => (
            <div
              key={option.value}
              className={`select-option ${option.value === selected.value ? "selected" : ""}`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
