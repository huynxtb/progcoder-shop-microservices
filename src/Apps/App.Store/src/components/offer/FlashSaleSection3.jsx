import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FarzaaContext } from "../../context/FarzaaContext";

const FlashSaleSection3 = () => {
  const { isTimerState } = useContext(FarzaaContext);
  return (
    <section className="fz-8-flash">
      <div className="container">
        <div className="row g-0 align-items-center">
          <div className="col-lg-6">
            <div className="fz-8-flash-img">
              <img
                src="assets/images/fz-8-flash-banner.jpg"
                alt="Flash sale banner"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="fz-8-flash-txt">
              <h2 className="fz-8-section-title fz-8-flash-title">
                Deal of The Day
              </h2>
              <p className="fz-8-flash-descr">
                Nisl vel pretium lectus quam id. Mus mauris vitae ultricies leo
                integer malesuada.
              </p>
              <div className="fz-6-flash-countdown fz-7-flash-countdown fz-8-flash-countdown">
                <div className="fz-8-flash-countdown_box">
                  <h3 className="fz-8-flash-countdown_value">
                    {isTimerState.days}
                  </h3>
                  <h5 className="fz-8-flash-countdown_unit">Days</h5>
                </div>
                <div className="fz-8-flash-countdown_box">
                  <h3 className="fz-8-flash-countdown_value">
                    {isTimerState.hours}
                  </h3>
                  <h5 className="fz-8-flash-countdown_unit">Hours</h5>
                </div>
                <div className="fz-8-flash-countdown_box">
                  <h3 className="fz-8-flash-countdown_value">
                    {isTimerState.minutes}
                  </h3>
                  <h5 className="fz-8-flash-countdown_unit">Minutes</h5>
                </div>
                <div className="fz-8-flash-countdown_box">
                  <h3 className="fz-8-flash-countdown_value">
                    {isTimerState.seconds}
                  </h3>
                  <h5 className="fz-8-flash-countdown_unit">Seconds</h5>
                </div>
              </div>
              <Link to="/shop" className="fz-8-product-btn fz-8-flash-btn">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSaleSection3;
