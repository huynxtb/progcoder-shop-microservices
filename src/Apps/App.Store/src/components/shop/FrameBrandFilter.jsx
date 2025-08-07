import React from "react";

const FrameBrandFilter = () => {
  return (
    <div className="sidebar-single-area">
      <h3 className="sidebar-single-area__title">Brands</h3>
      <ul className="product-categories">
        <li className="cat-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="brand_0"
            />
            <label className="form-check-label" htmlFor="brand_0">
              Ray-Ban
            </label>
          </div>
        </li>
        <li className="cat-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="brand_1"
            />
            <label className="form-check-label" htmlFor="brand_1">
              Boss
            </label>
          </div>
        </li>
        <li className="cat-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="brand_2"
            />
            <label className="form-check-label" htmlFor="brand_2">
              Gucci
            </label>
          </div>
        </li>
        <li className="cat-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="brand_3"
            />
            <label className="form-check-label" htmlFor="brand_3">
              Dolce & Gabbana
            </label>
          </div>
        </li>
        <li className="cat-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="brand_4"
            />
            <label className="form-check-label" htmlFor="brand_4">
              Ralph Lauren
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FrameBrandFilter;
