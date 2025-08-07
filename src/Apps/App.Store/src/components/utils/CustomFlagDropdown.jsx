import React, { useState, useRef, useEffect } from "react";

const CustomFlagDropdown = () => {
  const [selectedOption, setSelectedOption] = useState("0");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: "0", label: "ENG", flag: "/assets/images/us.png" },
    { value: "1", label: "BAN", flag: "/assets/images/bd.png" },
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (value) => {
    setSelectedOption(value);
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div
        className={`dropdown-toggle custom-dropdown-toggle ${
          dropdownOpen ? "open" : ""
        }`}
        onClick={toggleDropdown}
      >
        <span>
          <img
            src={
              options.find((option) => option.value === selectedOption)?.flag
            }
            alt=""
          />
        </span>
        <span>
          {options.find((option) => option.value === selectedOption)?.label}
        </span>
      </div>
      <div className={`custom-dropdown-menu ${dropdownOpen ? "show" : ""}`}>
        {options.map((option) => (
          <div
            key={option.value}
            className={`dropdown-item ${
              selectedOption === option.value ? "selected" : ""
            }`}
            onClick={() => handleOptionClick(option.value)}
          >
            <img src={option.flag} alt="" />
            <span>{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomFlagDropdown;
