import React from "react";
import { Link } from "react-router-dom";

const SubBannerSection = () => {
  return (
    <section className="fz-6-sub-banners">
      <div className="container">
        <div className="row g-4">
          <div className="col-xl-6 col-12">
            <div className="fz-6-sub-banner fz-6-sub-banner-1">
              <div className="fz-6-sub-banner-txt">
                <h6 className="fz-6-sub-banner-sub-title">30% Big Offer</h6>
                <h2 className="fz-6-sub-banner-title">
                  Modern Auto Wheel Up To 25% Offer
                </h2>
                <Link to="/shop" className="fz-6-sub-banner-btn">
                  Shop Now
                </Link>
              </div>

              <div className="fz-6-sub-banner-img">
                <img
                  src="assets/images/fz-6-sub-banner-1.png"
                  alt="Banner image"
                />
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-12">
            <div className="fz-6-sub-banner-right-col">
              <div className="fz-6-sub-banner mb-30">
                <div className="fz-6-sub-banner-txt">
                  <h6 className="fz-6-sub-banner-sub-title">New Arrival</h6>
                  <h2 className="fz-6-sub-banner-title">
                    Moteri raching Rally Gold Custom
                  </h2>
                  <Link to="/shop" className="fz-6-sub-banner-btn">
                    Shop Now
                  </Link>
                </div>

                <div className="fz-6-sub-banner-img">
                  <img
                    src="assets/images/fz-6-sub-banner-2.png"
                    alt="Banner image"
                  />
                </div>
              </div>

              <div className="fz-6-sub-banner">
                <div className="fz-6-sub-banner-txt">
                  <h6 className="fz-6-sub-banner-sub-title">New Arrival</h6>
                  <h2 className="fz-6-sub-banner-title">
                    Car Lighting New Collection
                  </h2>
                  <Link to="/shop" className="fz-6-sub-banner-btn">
                    Shop Now
                  </Link>
                </div>

                <div className="fz-6-sub-banner-img">
                  <img
                    src="assets/images/fz-6-sub-banner-3.png"
                    alt="Banner image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubBannerSection;
