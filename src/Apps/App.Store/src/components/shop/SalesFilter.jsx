import React from "react";

const SalesFilter = () => {
  return (
    <div className="sidebar-single-area">
      <h3 className="sidebar-single-area__title">Sales & Deals</h3>
      <ul className="product-categories">
        <li className="cat-item">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="onSale"
            />
            <label className="form-check-label" htmlFor="onSale">
              On Sale
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SalesFilter;
