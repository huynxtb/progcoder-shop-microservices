import React from "react";

const KidsClothingProductCard = ({ img, name, price }) => {
  return (
    <div className="fz-9-single-product">
      <div className="fz-9-product-single-item">
        <div className="fz-9-product-thumb">
          <a href="#">
            <img src={img} alt="product-image" />
          </a>
        </div>
        <div className="fz-9-product-icon-area">
          <span>
            <i className="fa-solid fa-heart"></i>
          </span>
          <span>
            <i className="fa-solid fa-arrow-right-arrow-left"></i>
          </span>
          <span>
            <i className="fa-solid fa-eye"></i>
          </span>
        </div>
        <div className="fz-9-product-btn text-center">
          <a className="fz-9-def-btn fz-9-def-btn-pink" href="#">
            Add To Cart
          </a>
        </div>
      </div>
      <div className="fz-9-product-price text-center">
        <h4 className="product-title">{name}</h4>
        <span className="product-price">${price}.00</span>
      </div>
    </div>
  );
};

export default KidsClothingProductCard;
