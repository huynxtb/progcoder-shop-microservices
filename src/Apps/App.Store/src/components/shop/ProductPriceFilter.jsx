import { FarzaaContext } from '../../context/FarzaaContext';
import { Slider } from '@mui/material';
import React, { useContext } from 'react';

const ProductPriceFilter = () => {
    const {price,handlePriceChange,handlePriceFilter} = useContext(FarzaaContext)
    return (
        <section className="sidebar-single-area price-filter-area">
            <h3 className="sidebar-single-area__title">Filter by price</h3>
            <div className="slider-keypress">
                <Slider
                    getAriaLabel={() => 'Price range'}
                    value={price}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(price) => `$${price}`}
                    min={0}
                    max={1000}
                    sx={{
                        color: "#B8860B", // Replace with your desired color
                        '& .MuiSlider-thumb': {
                            border: '1px solid #B8860B',
                            color:'#fff',
                          },
                      }}
                />
            </div>
            <div className="price-filter d-flex align-items-center justify-content-between">
                <div className="filtered-price d-flex align-items-center">
                    <h6 className="filtered-price__title">price:</h6>
                    <div className="filtered-price__number">
                        <div className="range-start d-flex align-items-center">
                            <span className="currency-sign">$</span>
                            <span className="input-with-keypress-0">{price[0]}</span>
                        </div>
                        <span className="hyphen">-</span>
                        <div className="range-end d-flex align-items-center">
                            <span className="currency-sign">$</span>
                            <span className="input-with-keypress-1">{price[1]}</span>
                        </div>
                    </div>

                </div>
                <button type="submit" className="filter-price-btn fz-1-banner-btn" onClick={handlePriceFilter}>
                    Filter
                </button>
            </div>
        </section>
    );
};

export default ProductPriceFilter;
