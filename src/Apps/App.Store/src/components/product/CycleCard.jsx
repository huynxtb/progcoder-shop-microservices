import React from "react";
import { Link } from "react-router-dom";

const CycleCard = ({ img, slug, title, price, showVariants }) => {
  return (
    <div className="fz-8-product">
      <div className="fz-8-product-img">
        <img src={img} alt="Product Image" />
        <div className="fz-8-product-actions">
          <button type="button" className="fz-8-product-btn add-to-cart-btn">
            Add To Cart
          </button>
        </div>
      </div>

      <div className="fz-8-product-txt">
        <div className="fz-8-product-txt-left">
          <h4 className="fz-8-product-title">
            <Link to={`/${slug}`}>{title}</Link>
          </h4>
          {showVariants && (
            <div className="fz-8-product-clr-variations">
              <button className="fz-8-product-clr-var active" type="button">
                <span className="yellow"></span>
              </button>
              <button className="fz-8-product-clr-var" type="button">
                <span className="gray"></span>
              </button>
            </div>
          )}
        </div>
        <h4 className="fz-8-product-price">${price}.00</h4>
      </div>
    </div>
  );
};

export default CycleCard;
