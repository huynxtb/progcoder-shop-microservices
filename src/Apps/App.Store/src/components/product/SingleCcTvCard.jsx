import React from "react";
import { Link } from "react-router-dom";

const SingleCcTvCard = ({ img, name, price }) => {
  return (
    <div className="fz-11-feature-cctv">
      <div className="fz-11-feature-cctv-img position-relative">
        <div className="fz-11-feature-img">
          <img src={img} alt="" />
        </div>
        <div className="fz-11-feature-cart-container">
          <div>
            <div className="fz-11-feature-icon-container">
              <i className="fa-regular fa-star fz-11-feature-arrow"></i>
              <i className="fa-solid fa-arrow-right-arrow-left fz-11-feature-arrow"></i>
              <i className="fa-regular fa-eye fz-11-feature-arrow"></i>
            </div>
            <button className="fz-11-feature-cart-btn">ADD TO CART</button>
          </div>
        </div>
      </div>
      <h2 className="fz-11-feature-cctv-name">
        <Link to="/shopDetails">{name}</Link>
      </h2>
      <p className="fz-11-feature-cctv-price">${price}.00</p>
    </div>
  );
};

export default SingleCcTvCard;
