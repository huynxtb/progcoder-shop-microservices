import React from "react";

const SingleBagCard = ({ discount, img, name, price }) => {
  return (
    <div className="fz-10-product">
      <div className="fz-10-product-img-area">
        {discount && (
          <div className="fz-10-product-top-actions">
            <span className="fz-10-product-tag">
              {discount}%
              <br />
              off
            </span>
          </div>
        )}
        <div className="future-product-image">
          <img src={img} alt="product" />
          <div className="fz-10-product-bottom-actions">
            <button type="button" className="add-to-cart-btn">
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
            <button type="button" className="fz-quick-view">
              <i className="fa-solid fa-eye"></i>
            </button>
            <button type="button" className="add-to-cart-btn">
              <i className="fa-regular fa-arrow-right-arrow-left"></i>
            </button>
          </div>
        </div>

        <div className="fz-10-product-txt">
          <h4>
            <a href="#">{name}</a>
          </h4>
          <p>${price}.00</p>
          <ul className="colors-area">
            <li className="color-one"></li>
            <li className="color-two"></li>
            <li className="color-three"></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleBagCard;
