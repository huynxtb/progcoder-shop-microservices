import React, { useContext } from "react";
import ProductDetailAction from "../product/ProductDetailAction";
import { FarzaaContext } from "../../context/FarzaaContext";
import { Link } from "react-router-dom";

const ProductViewModal = () => {
  const { isProductViewOpen, handleProductViewClose } =
    useContext(FarzaaContext);
  return (
    <>
      <div
        className={`overlay ${isProductViewOpen ? "open" : ""}`}
        role="button"
        onClick={handleProductViewClose}
      ></div>
      <div className={`fz-quick-view-modal ${isProductViewOpen ? "open" : ""}`}>
        <div className="container p-0">
          <div className="fz-quick-view-modal-content">
            <div className="fz-product-details__img">
              <img
                src="assets/images/fz-1-banner-bg-1.png"
                alt="Product Image"
              />
            </div>
            <div className="fz-product-details__txt">
              <h2 className="fz-product-details__title">
                <Link to="/shopDetails">
                  Bento Cake Ultimate Chocolate 200gm
                </Link>
              </h2>
              <div className="fz-product-details__price-rating">
                <span className="price">$750.00</span>
                <div className="rating">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-light fa-star"></i>
                </div>
              </div>

              <div className="fz-product-details__infos">
                <ul>
                  <li>
                    <span className="info-property"> SKU </span> :{" "}
                    <span className="info-value">D890f</span>
                  </li>
                  <li>
                    <span className="info-property"> Category </span> :{" "}
                    <span className="info-value">Security Door</span>
                  </li>
                  <li>
                    <span className="info-property"> Availablity </span> :{" "}
                    <span className="info-value">in Stock</span>
                  </li>
                </ul>
              </div>

              <p className="fz-product-details__short-descr">
                Each controller comes with adjustable in-built dual shock
                mechanism. They can be toggled on/off and shock setting of 1,2
                and 3 Auxiliary buttons around the home button enable more key
                bindings to be designated.
              </p>

              <ProductDetailAction />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductViewModal;
