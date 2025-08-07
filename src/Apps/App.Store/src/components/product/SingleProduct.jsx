import React from "react";
import { Link } from "react-router-dom";

const SingleProduct = ({ img, name, price, oldPrice }) => {
  return (
    <div className="fz-4-single-product">
      <div className="fz-4-single-product-img">
        <img src={img} alt="Product Image" />

        <div className="fz-4-single-product-actions">
          <a role="button" className="fz-add-to-wishlist">
            <i className="fa-regular fa-heart"></i>
          </a>
          <a role="button" className="fz-quick-view">
            <i className="fa-regular fa-eye"></i>
          </a>
          <a role="button" className="fz-compare">
            <i className="fa-regular fa-repeat"></i>
          </a>
          <a role="button" className="fz-add-to-cart-btn">
            <i className="fa-regular fa-cart-shopping"></i>
          </a>
        </div>
      </div>
      <div className="fz-4-single-product-txt">
        <h5 className="fz-4-single-product-title">
          <Link to="/shopDetails">{name}</Link>
        </h5>
        <span className="fz-4-single-product-price">
          ${price}.00<span className="prev-price">${oldPrice}.00</span>
        </span>
      </div>
    </div>
  );
};

export default SingleProduct;
