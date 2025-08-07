import React, { useState } from "react";
import CustomRangeSlider from "../utils/CustomRangeSlider";

const FramePriceFilter = () => {
  const initialMinValue = 200;
  const initialMaxValue = 550;
  const [sliderValues, setSliderValues] = useState({
    sliderOne: initialMinValue,
    sliderTwo: initialMaxValue,
  });
  const [priceRange, setPriceRange] = useState({
    min: initialMinValue,
    max: initialMaxValue,
  }); // Define setPriceRange here

  const handleSliderChange = (values) => {
    setSliderValues(values);
    setPriceRange({ min: values.sliderOne, max: values.sliderTwo });
  };

  return (
    <div className="sidebar-single-area price-filter-area">
      <h3 className="sidebar-single-area__title">Price</h3>
      <div className="slider-keypress">
        <CustomRangeSlider
          minValue={100}
          maxValue={1000}
          initialMinValue={initialMinValue}
          initialMaxValue={initialMaxValue}
          onSliderChange={handleSliderChange}
        />
      </div>
      <div className="price-filter">
        <div className="filtered-price">
          <div className="filtered-price__number d-flex align-items-center justify-content-between">
            <div className="range-start d-flex align-items-center">
              <span className="currency-sign">$</span>
              <span className="input-with-keypress-0">
                {sliderValues.sliderOne}.00
              </span>
            </div>
            <div className="range-end d-flex align-items-center">
              <span className="currency-sign">$</span>
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

export default FramePriceFilter;
