import React from "react";
import { Link } from "react-router-dom";

const CtaSection2 = () => {
  return (
    <section className="fz-5-cta-section fz-5-cta-section-2">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-3 col-lg-2 col-md-3">
            <div className="fz-5-cta-logo">
              <img src="assets/images/fz-5-cta-logo.png" alt="image" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="fz-5-cta-txt">
              <h3>Eye-Glasses</h3>
              <h2>Extra 60% off</h2>
              <Link to="/shop-2" className="fz-5-def-btn">
                Shop Now
              </Link>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-3">
            <div className="fz-5-cta-img">
              <img src="assets/images/fz-5-cta-img-2.png" alt="Image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection2;
