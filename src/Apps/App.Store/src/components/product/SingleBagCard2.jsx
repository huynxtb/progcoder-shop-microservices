import React from "react";
import { Link } from "react-router-dom";

const SingleBagCard2 = ({ img, name, price }) => {
  return (
    <div className="fz-12-prod">
      <div className="fz-12-prod-img">
        <img src={img} alt="Product Image" />
        <div className="fz-6-product-bottom-actions">
          <button type="button" className="add-to-cart-btn">
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
          <button type="button" className="fz-quick-view">
            <i className="fa-solid fa-eye"></i>
          </button>
          <button type="button" className="add-to-cart-btn">
            <i className="fa-solid fa-shuffle"></i>
          </button>
        </div>
      </div>

      <div className="fz-12-prod-txt">
        <h5 className="fz-12-prod-title">
          <Link to="/shopDetails">{name}</Link>
        </h5>
        <h6 className="fz-12-prod-price">${price}.00</h6>
      </div>
    </div>
  );
};

export default SingleBagCard2;
