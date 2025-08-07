import React from "react";
import { Link } from "react-router-dom";

const OfferSection4 = () => {
  return (
    <section className="fz-5-offer-section">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="fz-5-single-offer">
              <div className="fz-5-single-offer-img">
                <img src="assets/images/offer-bg-5.png" alt="Image" />
              </div>
              <div className="fz-5-single-offer-txt">
                <h4 className="fz-5-single-offer__title">Sunglasses</h4>
                <p className="fz-5-single-offer__dscr">
                  It’s likely you have one of the following face shapes: Oval,
                  square, round, heart.
                </p>
                <Link to="/shop" className="fz-5-def-btn fz-5-def-btn-sm">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="fz-5-single-offer">
              <div className="fz-5-single-offer-img">
                <img src="assets/images/offer-bg-6.png" alt="Image" />
              </div>
              <div className="fz-5-single-offer-txt">
                <h4 className="fz-5-single-offer__title">Eyeglasses</h4>
                <p className="fz-5-single-offer__dscr">
                  It’s likely you have one of the following face shapes: Oval,
                  square, round, heart.
                </p>
                <Link to="/shop" className="fz-5-def-btn fz-5-def-btn-sm">
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

export default OfferSection4;
