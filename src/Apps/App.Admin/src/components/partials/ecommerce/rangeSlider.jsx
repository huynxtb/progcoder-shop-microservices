//Test

import React, { useState } from "react";

const RangeSlider = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handleMinPriceChange = (e) => {
    setMinPrice(parseInt(e.target.value));
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(parseInt(e.target.value));
  };
  return (
    <div className="p-4">
      <div className="mb-4 relative">
        <input
          type="range"
          className="mt-1 block w-full absolute z-20 rounded-md opacity-0 cursor-pointer "
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        <input
          type="range"
          className="mt-1 block w-full absolute z-20 rounded-md  opacity-0 cursor-pointer"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
        <div className="relative z-10 h-2">
          <div className="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"></div>

          <div
            className="absolute z-20 top-0 bottom-0 rounded-md bg-green-300"
            style={{ right: `${minPrice}%`, left: `${maxPrice}%` }}
          ></div>

          <div
            className="absolute z-30 w-6 h-6 top-0 left-0 bg-green-300 rounded-full -mt-2"
            style={{ left: `${minPrice}%` }}
          ></div>

          <div
            className="absolute z-30 w-6 h-6 top-0 right-0 bg-green-300 rounded-full -mt-2"
            style={{ right: `${maxPrice}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-between pt-5 space-x-4 text-sm text-gray-700">
          <div>
            <input
              type="text"
              maxLength="5"
              value={minPrice}
              onChange={handleMinPriceChange}
              className="w-24 px-3 py-2 text-center border border-gray-200 rounded-lg bg-gray-50 focus:border-yellow-400 focus:outline-hidden"
            />
          </div>
          <div>
            <input
              type="text"
              maxLength="5"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              className="w-24 px-3 py-2 text-center border border-gray-200 rounded-lg bg-gray-50 focus:border-yellow-400 focus:outline-hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
