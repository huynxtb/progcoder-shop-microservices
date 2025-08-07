import React from "react";

const GlassColorFilter = () => {
  return (
    <div className="sidebar-single-area">
      <h3 className="sidebar-single-area__title">Glass Color</h3>
      <ul className="product-categories">
        <li className="cat-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="glassColor_0"
            />
            <label className="form-check-label" htmlFor="glassColor_0">
              Acetate
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default GlassColorFilter;
