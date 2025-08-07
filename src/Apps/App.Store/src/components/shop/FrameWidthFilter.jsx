import React, { useState } from "react";
import CustomRangeSlider from "../utils/CustomRangeSlider";

const FrameWidthFilter = () => {
  const [sliderValues, setSliderValues] = useState({
    sliderOne: 250,
    sliderTwo: 550,
  });

  const handleSliderChange = (values) => {
    setSliderValues(values);
  };

  return (
    <div className="sidebar-single-area price-filter-area">
      <h3 className="sidebar-single-area__title">
        Frame Width <span className="text-lowercase">(mm)</span>
      </h3>
      <div className="slider-keypress">
        <CustomRangeSlider
          minValue={100}
          maxValue={1000}
          initialMinValue={sliderValues.sliderOne}
          initialMaxValue={sliderValues.sliderTwo}
          onSliderChange={handleSliderChange}
        />
      </div>
      <div className="price-filter">
        <div className="filtered-price">
          <div className="filtered-price__number d-flex align-items-center justify-content-between">
            <div className="range-start d-flex align-items-center">
              <span className="input-with-keypress-0">
                {sliderValues.sliderOne}.00
              </span>
            </div>
            <div className="range-end d-flex align-items-center">
              <span className="input-with-keypress-1">
                {sliderValues.sliderTwo}.00
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameWidthFilter;
