import React from "react";
import { Link } from "react-router-dom";

const SubBannerSection4 = () => {
  return (
    <section class="fz-12-sub-banner">
      <div class="container p-0">
        <div class="row g-0">
          <div class="col-lg-5">
            <div class="fz-12-sub-banner-area">
              <Link to="/shop">
                <img
                  src="assets/images/fz-12-sub-banner-1.jpg"
                  alt="Sub-Banner Image"
                />
              </Link>
            </div>
          </div>

          <div class="col-lg-7">
            <div class="fz-12-sub-banner-card">
              <div class="row g-0">
                <div class="col-6 col-xxs-12 order-0 order-xxs-1 align-self-center">
                  <div class="fz-12-sub-banner-card-txt">
                    <span class="fz-12-sub-banner-card-sub-title">
                      Save UpTo 30%
                    </span>
                    <h3 class="fz-12-sub-banner-card-title">Mini Handbag</h3>
                    <Link to="/shop">Shop Now</Link>
                  </div>
                </div>
                <div class="col-6 col-xxs-12 order-1 order-xxs-0">
                  <img
                    src="assets/images/fz-12-sub-banner-2.jpg"
                    alt="Sub-Banner Image"
                  />
                </div>
              </div>
            </div>

            <div class="fz-12-sub-banner-card">
              <div class="row g-0">
                <div class="col-6 col-xxs-12">
                  <img
                    src="assets/images/fz-12-sub-banner-3.jpg"
                    alt="Sub-Banner Image"
                  />
                </div>
                <div class="col-6 col-xxs-12 align-self-center">
                  <div class="fz-12-sub-banner-card-txt">
                    <span class="fz-12-sub-banner-card-sub-title">
                      Save UpTo 30%
                    </span>
                    <h3 class="fz-12-sub-banner-card-title">luxury Handbag</h3>
                    <Link to="/shop">Shop Now</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubBannerSection4;
