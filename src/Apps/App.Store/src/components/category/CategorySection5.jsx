import React from "react";
import { Link } from "react-router-dom";

const CategorySection5 = () => {
  return (
    <section className="fz-6-categories">
      <div className="container">
        <h2 className="fz-6-section-title">Top Categories</h2>

        <div className="fz-6-categories-bg">
          <div className="row fz-6-categories-row">
            <div className="col-xl-3 col-lg-4 col-6">
              <Link to="/shop" className="fz-6-category">
                <div className="fz-6-category-txt">
                  <h6 className="fz-6-category-title">Stoptech</h6>
                  <span className="fz-6-category-amount">5 products</span>
                </div>

                <div className="fz-6-category-img">
                  <img
                    src="assets/images/fz-6-cat-1.jpg"
                    alt="Category Image"
                  />
                </div>
              </Link>
            </div>

            <div className="col-xl-3 col-lg-4 col-6">
              <Link to="/shop" className="fz-6-category">
                <div className="fz-6-category-txt">
                  <h6 className="fz-6-category-title">Wheel & Tire</h6>
                  <span className="fz-6-category-amount">5 products</span>
                </div>

                <div className="fz-6-category-img">
                  <img
                    src="assets/images/fz-6-cat-2.jpg"
                    alt="Category Image"
                  />
                </div>
              </Link>
            </div>

            <div className="col-xl-3 col-lg-4 col-6">
              <Link to="/shop" className="fz-6-category">
                <div className="fz-6-category-txt">
                  <h6 className="fz-6-category-title">Camera</h6>
                  <span className="fz-6-category-amount">5 products</span>
                </div>

                <div className="fz-6-category-img">
                  <img
                    src="assets/images/fz-6-cat-3.jpg"
                    alt="Category Image"
                  />
                </div>
              </Link>
            </div>

            <div className="col-xl-3 col-lg-4 col-6">
              <Link to="/shop" className="fz-6-category">
                <div className="fz-6-category-txt">
                  <h6 className="fz-6-category-title">Turbo</h6>
                  <span className="fz-6-category-amount">5 products</span>
                </div>

                <div className="fz-6-category-img">
                  <img
                    src="assets/images/fz-6-cat-4.jpg"
                    alt="Category Image"
                  />
                </div>
              </Link>
            </div>

            <div className="col-xl-3 col-lg-4 col-6">
              <Link to="/shop" className="fz-6-category">
                <div className="fz-6-category-txt">
                  <h6 className="fz-6-category-title">Steering</h6>
                  <span className="fz-6-category-amount">5 products</span>
                </div>

                <div className="fz-6-category-img">
                  <img
                    src="assets/images/fz-6-cat-5.jpg"
                    alt="Category Image"
                  />
                </div>
              </Link>
            </div>

            <div className="col-xl-3 col-lg-4 col-6">
              <Link to="/shop" className="fz-6-category">
                <div className="fz-6-category-txt">
                  <h6 className="fz-6-category-title">Lighting</h6>
                  <span className="fz-6-category-amount">5 products</span>
                </div>

                <div className="fz-6-category-img">
                  <img
                    src="assets/images/fz-6-cat-6.jpg"
                    alt="Category Image"
                  />
                </div>
              </Link>
            </div>

            <div className="col-xl-3 col-lg-4 col-6">
              <Link to="/shop" className="fz-6-category">
                <div className="fz-6-category-txt">
                  <h6 className="fz-6-category-title">Body Parts</h6>
                  <span className="fz-6-category-amount">5 products</span>
                </div>

                <div className="fz-6-category-img">
                  <img
                    src="assets/images/fz-6-cat-7.jpg"
                    alt="Category Image"
                  />
                </div>
              </Link>
            </div>

            <div className="col-xl-3 col-lg-4 col-6">
              <Link to="/shop" className="fz-6-category">
                <div className="fz-6-category-txt">
                  <h6 className="fz-6-category-title">Repair parts</h6>
                  <span className="fz-6-category-amount">5 products</span>
                </div>

                <div className="fz-6-category-img">
                  <img
                    src="assets/images/fz-6-cat-8.jpg"
                    alt="Category Image"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection5;
