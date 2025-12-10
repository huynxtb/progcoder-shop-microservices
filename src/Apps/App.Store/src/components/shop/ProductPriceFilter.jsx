import { FarzaaContext } from '../../context/FarzaaContext';
import { Slider } from '@mui/material';
import React, { useContext } from 'react';
import { useTranslation } from "react-i18next";
import { formatCurrency } from '../../utils/format';

const ProductPriceFilter = () => {
    const { t } = useTranslation();
    const {price, maxPrice, handlePriceChange, handlePriceFilter} = useContext(FarzaaContext)
    return (
        <section className="sidebar-single-area price-filter-area">
            <h3 className="sidebar-single-area__title">{t("shop.filterByPrice", "Filter by price")}</h3>
            <div className="slider-keypress">
                <Slider
                    getAriaLabel={() => t("shop.priceRange", "Price range")}
                    value={price}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => formatCurrency(value)}
                    min={0}
                    max={maxPrice || 10000000}
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
                    <h6 className="filtered-price__title">{t("common.price")}:</h6>
                    <div className="filtered-price__number">
                        <div className="range-start d-flex align-items-center">
                            <span className="input-with-keypress-0">{formatCurrency(price[0])}</span>
                        </div>
                        <span className="hyphen">-</span>
                        <div className="range-end d-flex align-items-center">
                            <span className="input-with-keypress-1">{formatCurrency(price[1])}</span>
                        </div>
                    </div>

                </div>
                <button type="submit" className="filter-price-btn fz-1-banner-btn" onClick={handlePriceFilter}>
                    {t("common.filter")}
                </button>
            </div>
        </section>
    );
};

export default ProductPriceFilter;
