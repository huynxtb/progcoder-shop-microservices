import React from "react";

const FrameColorFilter = () => {
  const colors = [
    "B57912",
    "000000",
    "0059AB",
    "CFA385",
    "70462A",
    "E1F1F5",
    "D0AF4A",
    "7B2BCC",
    "C9C9C9",
    "7ACB7A",
    "827A71",
    "612C15",
    "ED7E1C",
    "CD201F",
    "CBCBCB",
    "008080",
    "ECECEC",
    "DD7400",
    "FFD700",
  ];
  return (
    <div className="sidebar-single-area">
      <h3 className="sidebar-single-area__title">Frame Color</h3>
      <ul className="frame-color">
        {colors.map((color, index) => (
          <li
            key={index}
            data-color={color}
            style={{ backgroundColor: `#${color}` }}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default FrameColorFilter;
