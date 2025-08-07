import React from "react";
import { Link } from "react-router-dom";

const SubBannerSection2 = () => {
  return (
    <section className="fz-7-sub-banners">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="fz-6-sub-banner fz-7-sub-banner">
              <div className="fz-6-sub-banner-txt">
                <h2 className="fz-6-sub-banner-title">Best Watch Collection</h2>
                <h6 className="fz-7-sub-banner-price">$100.00</h6>
                <Link to="/shop" className="fz-6-sub-banner-btn">
                  Shop Now
                </Link>
              </div>

              <div className="fz-6-sub-banner-img">
                <img
                  src="assets/images/fz-7-sub-banner-1.png"
                  alt="Banner image"
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="fz-6-sub-banner fz-7-sub-banner">
              <div className="fz-6-sub-banner-txt">
                <h2 className="fz-6-sub-banner-title">Amazing Smartwatch</h2>
                <h6 className="fz-7-sub-banner-price">$100.00</h6>
                <Link to="/shop" className="fz-6-sub-banner-btn">
                  Shop Now
                </Link>
              </div>

              <div className="fz-6-sub-banner-img">
                <img
                  src="assets/images/fz-7-sub-banner-2.png"
                  alt="Banner image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubBannerSection2;
