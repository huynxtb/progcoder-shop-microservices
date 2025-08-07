import React from "react";

const MaterialFilter = () => {
  return (
    <div className="sidebar-single-area">
      <h3 className="sidebar-single-area__title">Frame Material</h3>
      <ul className="product-categories">
        <li className="cat-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="frMaterial_0"
            />
            <label className="form-check-label" htmlFor="frMaterial_0">
              Acetate
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MaterialFilter;
