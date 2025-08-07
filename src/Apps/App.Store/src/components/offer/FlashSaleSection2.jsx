import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FarzaaContext } from "../../context/FarzaaContext";

const FlashSaleSection2 = () => {
  const { isTimerState } = useContext(FarzaaContext);
  return (
    <section className="fz-7-flash pb-120">
      <div className="container">
        <div className="fz-7-flash-bg">
          <div className="row gy-4 align-items-center g-0">
            <div className="col-lg-6">
              <div className="fz-7-flash-txt">
                <h2 className="fz-7-section-title fz-7-flash-title">
                  Deals of The Day
                </h2>
                <p className="fz-7-flash-descr">
                  Using test items of real content and data in designs will help
                  but there's no guarantee that every oddity will be found and
                  corrected. Do you want to be sure or beta.
                </p>
                <div className="fz-6-flash-countdown fz-7-flash-countdown">
                  <div className="fz-7-flash-countdown_box">
                    <h3 className="fz-7-flash-countdown_value">
                      {isTimerState.days}
                    </h3>
                    <h5 className="fz-7-flash-countdown_unit">Days</h5>
                  </div>
                  <div className="fz-7-flash-countdown_box">
                    <h3 className="fz-7-flash-countdown_value">
                      {isTimerState.hours}
                    </h3>
                    <h5 className="fz-7-flash-countdown_unit">Hours</h5>
                  </div>
                  <div className="fz-7-flash-countdown_box">
                    <h3 className="fz-7-flash-countdown_value">
                      {isTimerState.minutes}
                    </h3>
                    <h5 className="fz-7-flash-countdown_unit">Minutes</h5>
                  </div>
                  <div className="fz-7-flash-countdown_box">
                    <h3 className="fz-7-flash-countdown_value">
                      {isTimerState.seconds}
                    </h3>
                    <h5 className="fz-7-flash-countdown_unit">Seconds</h5>
                  </div>
                </div>
                <Link href="/shop" className="fz-6-sub-banner-btn">
                  Shop Now
                </Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="fz-7-flash-img">
                <img
                  src="assets/images/fz-7-flash-img.png"
                  alt="Product Image"
                />
                <span className="fz-7-flash-tag">$550</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSaleSection2;
