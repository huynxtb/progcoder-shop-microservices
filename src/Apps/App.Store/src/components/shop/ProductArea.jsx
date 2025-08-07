import React, { useState } from "react";
import { shopData2 } from "../../data/Data";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

const ProductArea = ({ toggleFilter, sidebarRef }) => {
  const [listView, setListView] = useState(false);
  const toggleListView = () => {
    setListView(true);
  };
  const toggleGridView = () => {
    setListView(false);
  };
  return (
    <div
      className={`fz-inner-products-container ${
        listView ? "list-view-on" : ""
      }`}
    >
      <div className="row g-xl-4 g-lg-3 g-2">
        <div className="col-12">
          <div className="product-view-actions">
            <div className="row gy-3 align-items-center">
              <div className="col-xxl-6 col-xl-6 col-md-6 text-center text-md-start d-flex justify-content-md-start justify-content-center align-items-center gap-3">
                <div className="view-type">
                  <button
                    className={`grid-view ${listView ? "" : "active"}`}
                    onClick={toggleGridView}
                  >
                    <i className="fa-solid fa-grid-2"></i>
                  </button>

                  <button
                    className={`list-view ${listView ? "active" : ""}`}
                    onClick={toggleListView}
                  >
                    <i className="fa-light fa-list"></i>
                  </button>
                </div>
                <p className="text-center text-sm-start">
                  Showing 1-16 OF 25 results
                </p>
              </div>

              <div className="col-xxl-6 col-xl-6 col-md-6">
                <div className="product-view-right-actions text-center text-md-end d-flex justify-content-center justify-content-md-end">
                  <button
                    className="fz-5-def-btn fz-5-def-btn-sm rounded-1 border d-lg-none shop-2-filter-btn"
                    onClick={toggleFilter}
                    id="shop-2-filter-btn"
                    ref={sidebarRef}
                  >
                    Filter
                  </button>
                  <div className="product-sorting d-inline-block">
                    <form className="" action="#">
                      <Form.Select className="nice-select">
                        <option value="">Default</option>
                        <option value="name-az">By Name (A to Z)</option>
                        <option value="name-za">By Name (Z to A)</option>
                        <option value="price-low-high">
                          By Price (Low to High)
                        </option>
                        <option value="price-high-low">
                          By Price (High to Low)
                        </option>
                      </Form.Select>
                    </form>
                  </div>
                  <div className="product-sorting d-inline-block">
                    <form className="" action="#">
                      <Form.Select className="nice-select">
                        <option value="">Show</option>
                        <option value="15">15</option>
                        <option value="18">18</option>
                        <option value="21">21</option>
                        <option value="24">24</option>
                      </Form.Select>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {shopData2.map((item) => (
          <div className="col-xl-4 col-lg-6 col-md-4 col-6" key={item.id}>
            <div className="fz-5-single-product">
              <div className="fz-5-single-product-img">
                <img src={item.img} alt="Image" />
                <div className="fz-5-single-product-actions">
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
              <div className="fz-5-single-product-txt">
                <div className="color-available">
                  <span className="color-1"></span>
                  <span className="color-2"></span>
                  <span className="color-3"></span>
                </div>
                <h3 className="fz-5-single-product-title">
                  <Link to="/shopDetails">{item.name}</Link>
                </h3>
                <p className="fz-5-single-product-dscr">{item.desc}</p>
                <p className="fz-5-single-product-price">${item.price}.00</p>
                {item.offer && (
                  <div className="fz-5-discount-badge">Buy 1 Get 1</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductArea;
