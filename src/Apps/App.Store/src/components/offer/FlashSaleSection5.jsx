import React, { useContext } from "react";
import { FarzaaContext } from "../../context/FarzaaContext";
import { Link } from "react-router-dom";

const FlashSaleSection5 = () => {
  const { isTimerState } = useContext(FarzaaContext);

  return (
    <section className="fz-10-flash">
      <div className="container">
        <div className="row align-items-center text-center">
          <div className="col-xxl-4 col-xl-3 d-xl-block d-none align-self-start">
            <div className="fz-10-flash-iamge">
              <img src="assets/images/fz-10-flash-2.png" alt="flash-iamge" />
            </div>
          </div>
          <div className="col-xxl-4 col-xl-5 col-md-8">
            <div className="fz-7-flash-txt fz-10-flash-txt ">
              <h2 className="fz-7-section-title fz-7-flash-title fz-10-flash-title ">
                Deal of the day
              </h2>
              <p className="fz-7-flash-descr fz-10-flash-descr">
                UNisl vel pretium lectus quam id. Mus mauris vitae ultricies leo
                integer malesuada.
              </p>
              <div className="fz-hot-deal-countdown">
                <div className="fz-10-flash-countdown_box">
                  <h3 className="fz-10-flash-countdown_value">
                    {isTimerState.days}
                  </h3>
                  <h5 className="fz-10-flash-countdown_unit">Days</h5>
                </div>
                <div className="fz-10-flash-countdown_box">
                  <h3 className="fz-10-flash-countdown_value">
                    {isTimerState.hours}
                  </h3>
                  <h5 className="fz-10-flash-countdown_unit">Hours</h5>
                </div>
                <div className="fz-10-flash-countdown_box">
                  <h3 className="fz-10-flash-countdown_value">
                    {isTimerState.minutes}
                  </h3>
                  <h5 className="fz-10-flash-countdown_unit">Minutes</h5>
                </div>
                <div className="fz-10-flash-countdown_box">
                  <h3 className="fz-10-flash-countdown_value">
                    {isTimerState.seconds}
                  </h3>
                  <h5 className="fz-10-flash-countdown_unit">Seconds</h5>
                </div>
              </div>
              <Link to="/shop" className="fz-10-sub-banner-btn">
                Shop Now
              </Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="fz-10-flash-iamge fz-10-flash-iamge-2">
              <img src="assets/images/fz-10-flash-1.png" alt="flash-iamge" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSaleSection5;
