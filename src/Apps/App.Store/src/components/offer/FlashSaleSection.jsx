import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FarzaaContext } from "../../context/FarzaaContext";

const FlashSaleSection = () => {
  const { isTimerState } = useContext(FarzaaContext);
  return (
    <section className="fz-6-flash">
      <div className="container">
        <h6 className="fz-6-flash-sale-sub-title">
          Hurry up! Discount up to 70%
        </h6>
        <h2 className="fz-6-section-title fz-6-flash-sale-title">
          Attention! <span className="colored">Flash Sales</span>
        </h2>
        <div className="fz-6-flash-countdown">
          <div className="fz-6-flash-countdown-single-box">
            <h4 className="fz-6-value">{isTimerState.days}</h4>
            <h6 className="fz-6-unit">Days</h6>
          </div>
          <div className="fz-6-flash-countdown-single-box">
            <h4 className="fz-6-value">{isTimerState.hours}</h4>
            <h6 className="fz-6-unit">Hours</h6>
          </div>
          <div className="fz-6-flash-countdown-single-box">
            <h4 className="fz-6-value">{isTimerState.minutes}</h4>
            <h6 className="fz-6-unit">Minutes</h6>
          </div>
          <div className="fz-6-flash-countdown-single-box">
            <h4 className="fz-6-value">{isTimerState.seconds}</h4>
            <h6 className="fz-6-unit">Seconds</h6>
          </div>
        </div>
        <Link to="/shop" className="fz-6-sub-banner-btn">
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default FlashSaleSection;
