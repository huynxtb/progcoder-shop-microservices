import React from "react";
import { Link } from "react-router-dom";

const OfferSection3 = () => {
  return (
    <section className="fz-4-offer-section pb-120">
      <div className="container">
        <div className="row g-4">
          <div className="col-sm-6">
            <div className="fz-4-single-offer">
              <p className="fz-4-single-offer__discount-percentage">
                Minimum 30% Off
              </p>
              <h4 className="fz-4-single-offer__title">Light Switch Timer</h4>
              <Link to="/shop" className="fz-4-def-btn fz-4-def-btn-sm">
                Shop Now
              </Link>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="fz-4-single-offer fz-4-single-offer-2">
              <p className="fz-4-single-offer__discount-percentage">
                Minimum 30% Off
              </p>
              <h4 className="fz-4-single-offer__title">LED Bulb Cool 6500K </h4>
              <Link to="/shop" className="fz-4-def-btn fz-4-def-btn-sm">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection3;
