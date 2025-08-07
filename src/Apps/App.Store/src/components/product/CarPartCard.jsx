import React from "react";
import { Link } from "react-router-dom";

const CarPartCard = ({ discount, img, title, price, oldPrice }) => {
  return (
    <div className="fz-6-product">
      <div className="fz-6-product-img">
        <div className="fz-6-product-top-actions">
          <span className="fz-6-product-tag">-{discount}%</span>
          <button type="button" className="fz-6-product-wishlist-btn">
            <i className="fa-solid fa-heart"></i>
          </button>
        </div>
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

      <div className="fz-6-product-txt">
        <div className="fz-6-product-rating">
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-regular fa-star"></i>
        </div>

        <h4 className="fz-6-product-title">
          <Link to="/shopDetails">{title}</Link>
        </h4>

        <p className="fz-6-product-price">
          <span className="price text-decoration-line-through">
            ${oldPrice}.00
          </span>
          <span className="discount-price">${price}.00</span>
        </p>
      </div>
    </div>
  );
};

export default CarPartCard;
