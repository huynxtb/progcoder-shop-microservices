import React, { useState, useEffect } from "react";

const CustomRangeSlider = ({
  minValue,
  maxValue,
  initialMinValue,
  initialMaxValue,
  onSliderChange,
}) => {
  const [sliderOne, setSliderOne] = useState(initialMinValue);
  const [sliderTwo, setSliderTwo] = useState(initialMaxValue);
  const [minGap] = useState(0);
  const sliderMaxValue = maxValue;
  const [sliderTrackStyle, setSliderTrackStyle] = useState({});

  useEffect(() => {
    onSliderChange({ sliderOne, sliderTwo });
    fillColor();
  }, [sliderOne, sliderTwo]);

  const slideOne = (value) => {
    if (sliderTwo - value <= minGap) {
      setSliderOne(sliderTwo - minGap);
    } else {
      setSliderOne(value);
    }
    fillColor();
  };

  const slideTwo = (value) => {
    if (value - sliderOne <= minGap) {
      setSliderTwo(sliderOne + minGap);
    } else {
      setSliderTwo(value);
    }
    fillColor();
  };

  const fillColor = () => {
    const percent1 = (sliderOne / sliderMaxValue) * 100 - 8;
    const percent2 = (sliderTwo / sliderMaxValue) * 102 - 5;
    const newStyle = {
      background: `linear-gradient(to right, #dadae5 ${percent1}% , #000 ${percent1}% , #000 ${percent2}%, #dadae5 ${percent2}%)`,
    };
    setSliderTrackStyle(newStyle);
  };

  return (
    <div className="wrapper">
      <div className="rv-container">
        <div className="slider-track" style={sliderTrackStyle}></div>
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={sliderOne}
          id="slider-1"
          onChange={(e) => slideOne(parseFloat(e.target.value))}
        />
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={sliderTwo}
          id="slider-2"
          onChange={(e) => slideTwo(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default CustomRangeSlider;
