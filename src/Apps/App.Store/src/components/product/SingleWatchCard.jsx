import React from "react";
import { Link } from "react-router-dom";

const SingleWatchCard = ({ img, category, title, slug, price }) => {
  return (
    <div className="fz-7-product">
      <div className="fz-7-product-img">
        <img src={img} alt="Product Image" />
      </div>

      <div className="fz-7-product-txt">
        <h6 className="fz-7-product-cat">{category}</h6>
        <h4 className="fz-7-product-title">
          <Link to={slug}>{title}</Link>
        </h4>
        <span className="fz-7-product-price">${price}.00</span>
        <div className="fz-7-product-actions">
          <button type="button" className="add-to-cart-btn">
            Add To Cart
          </button>
          <div className="right">
            <button type="button" className="add-to-wishlist-btn">
              <i className="fa-light fa-heart"></i>
            </button>
            <button type="button" className="fz-quick-view">
              <i className="fa-light fa-eye"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleWatchCard;
