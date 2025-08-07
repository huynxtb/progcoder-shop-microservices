import React from "react";
import { Link } from "react-router-dom";

const CategorySection6 = () => {
  return (
    <section className="fz-7-categories pt-120">
      <div className="container">
        <div className="row g-3 g-sm-0 justify-content-between">
          <div className="col-lg-5 col-6 col-xxs-12">
            <div className="fz-7-category">
              <div className="fz-7-category-txt">
                <h5 className="fz-7-category-sub-title">save 40%</h5>
                <h3 className="fz-7-category-title">Men SmartWatch</h3>
                <Link to="/shop" className="fz-6-sub-banner-btn">
                  Shop Now
                </Link>
              </div>

              <div className="fz-7-category-img">
                <Link to="/shop">
                  <img
                    src="assets/images/fz-7-cat-1.jpg"
                    alt="Category Image"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="col-6 col-xxs-12">
            <div className="fz-7-category">
              <div className="fz-7-category-img">
                <img src="assets/images/fz-7-cat-2.jpg" alt="Category Image" />
              </div>

              <div className="fz-7-category-txt">
                <h5 className="fz-7-category-sub-title">save 40%</h5>
                <h3 className="fz-7-category-title">Women SmartWatch</h3>
                <Link to="/shop" className="fz-6-sub-banner-btn">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection6;
