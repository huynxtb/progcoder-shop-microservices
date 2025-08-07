import React, { useContext } from "react";
import { FarzaaContext } from "../../context/FarzaaContext";
import { Link } from "react-router-dom";

const BannerSection4 = () => {
  const { isTimerState } = useContext(FarzaaContext);
  return (
    <section className="fz-4-banner-section pt-30 pb-120">
      <div className="container">
        <div className="row fz-4-banner-row g-4">
          <div className="col-xxl-3 col-lg-4 col-md-5">
            <div className="fz-4-banner-product-card">
              <div className="fz-4-banner-product-card-counter">
                <p>Remains until the end of the offer</p>
                <div className="fz-hot-deal-countdown">
                  <div className="fz-4-countdown-box">
                    <div className="fz-4-countdown-value">
                      {isTimerState.days}
                    </div>
                    <div className="fz-4-countdown-unit">Days</div>
                  </div>
                  <div className="fz-4-countdown-box">
                    <div className="fz-4-countdown-value">
                      {isTimerState.hours}
                    </div>
                    <div className="fz-4-countdown-unit">Hours</div>
                  </div>
                  <div className="fz-4-countdown-box">
                    <div className="fz-4-countdown-value">
                      {isTimerState.minutes}
                    </div>
                    <div className="fz-4-countdown-unit">Minutes</div>
                  </div>
                  <div className="fz-4-countdown-box">
                    <div className="fz-4-countdown-value">
                      {isTimerState.seconds}
                    </div>
                    <div className="fz-4-countdown-unit">Seconds</div>
                  </div>
                </div>
              </div>
              <div className="fz-4-banner-product-card-img">
                <img src="assets/images/fz-4-hot-deal.png" alt="image" />
              </div>
              <div className="fz-4-banner-product-card-txt">
                <div className="fz-4-single-product-actions">
                  <a role="button">
                    <i className="fa-light fa-heart"></i>
                  </a>
                  <a role="button">
                    <i className="fa-light fa-eye"></i>
                  </a>
                  <a role="button">
                    <i className="fa-light fa-repeat"></i>
                  </a>
                  <a role="button">
                    <i className="fa-light fa-cart-shopping"></i>
                  </a>
                </div>
                <h3 className="fz-4-banner-product-card__title">
                  <Link to="/shopDetails">1.0mm Grey Cable - 100M</Link>
                </h3>
                <p className="fz-4-banner-product-card__price">
                  $254.00{" "}
                  <span className="text-decoration-line-through">$354.00</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-xxl-9 col-lg-8 col-md-7">
            <div className="fz-4-banner-slider">
              <div className="row align-items-center">
                <div className="col-xxl-6 col-lg-7 col-md-12 col-sm-7">
                  <div className="fz-4-banner-slider-txt">
                    <h1 className="fz-4-banner-slider__title">
                      Power Your Adventures
                    </h1>
                    <p className="fz-4-banner-slider__dscr">
                      The benefit of an electric eCommerce shop is that it
                      provides customers with a convenient
                    </p>
                    <Link to="/shopDetails" className="fz-4-def-btn">
                      Shop Now
                    </Link>
                  </div>
                </div>
                <div className="col-xxl-6 col-lg-5 col-md-12 col-sm-5">
                  <div className="fz-4-banner-slider-img">
                    <img src="assets/images/fz-4-banner-img.png" alt="image" />
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

export default BannerSection4;
