import React, { useContext } from "react";
import { FarzaaContext } from "../../context/FarzaaContext";

const FlashSaleSection6 = () => {
  const { isTimerState } = useContext(FarzaaContext);

  return (
    <section className="fz-11-flash-sale">
      <div className="fz-11-flash-container">
        <div className="fz-11-flash-img-container">
          <img src="assets/images/flash-sale-cctv.png" alt="" />
          <p className="fz-11-flash-overlay">
            <span className="me-5 pe-4">40%</span> <br />
            <span className="mt-4 pt-xl-5 ms-5 ps-5">OFF</span>
          </p>
        </div>
        <div className="fz-11-flash-text-container">
          <p className="fz-11-flash-description">
            Hurry up! Discount up to 70%
          </p>
          <h3>Deal of the day</h3>
          <div className="fz-11-flash-timer-container">
            <div className="fz-6-flash-countdown fz-11-flash-countdown">
              <div className="fz-11-flash-countdown_box">
                <h3>{isTimerState.days}</h3>
                <h5>Days</h5>
              </div>
              <div className="fz-11-flash-countdown_box">
                <h3>{isTimerState.hours}</h3>
                <h5>Hours</h5>
              </div>
              <div className="fz-11-flash-countdown_box">
                <h3>{isTimerState.minutes}</h3>
                <h5>Minutes</h5>
              </div>
              <div className="fz-11-flash-countdown_box">
                <h3>{isTimerState.seconds}</h3>
                <h5>Seconds</h5>
              </div>
            </div>
          </div>
          <button>Shop Now</button>
        </div>
      </div>
    </section>
  );
};

export default FlashSaleSection6;
