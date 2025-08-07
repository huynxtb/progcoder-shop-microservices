import React from "react";

const GenderSelectFilter = () => {
  return (
    <div className="sidebar-single-area">
      <h3 className="sidebar-single-area__title">Gender</h3>
      <ul className="product-categories">
        <li className="cat-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="gender_0"
            />
            <label className="form-check-label" htmlFor="gender_0">
              Men
            </label>
          </div>
        </li>
        <li className="cat-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="gender_1"
            />
            <label className="form-check-label" htmlFor="gender_1">
              Women
            </label>
          </div>
        </li>
        <li className="cat-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="gender_2"
            />
            <label className="form-check-label" htmlFor="gender_2">
              Kids
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default GenderSelectFilter;
