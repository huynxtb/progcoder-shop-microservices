import React, { useContext } from "react";
import { FarzaaContext } from "../../context/FarzaaContext";
import { Link } from "react-router-dom";

const FlashSaleSection7 = () => {
  const { isTimerState } = useContext(FarzaaContext);

  return (
    <section className="fz-12-flash">
      <div className="container">
        <div className="row g-0 align-items-center">
          <div className="col-lg-6 align-self-stretch">
            <div className="fz-8-flash-img">
              <img
                src="assets/images/fz-12-flash-banner.jpg"
                alt="Flash sale banner"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="fz-8-flash-txt">
              <div className="fz-12-flash-sub-title">Discount Gifts</div>
              <h2 className="fz-12-section-title">Gifts Under $50</h2>
              <p className="fz-12-section-descr">
                Nisl vel pretium lectus quam id. Mus mauris vitae ultricies leo
                integer malesuada.
              </p>
              <div className="fz-6-flash-countdown fz-12-flash-countdown">
                <div className="fz-12-flash-countdown_box">
                  <h3>{isTimerState.days}</h3>
                  <h5>Days</h5>
                </div>
                <div className="fz-12-flash-countdown_box">
                  <h3>{isTimerState.hours}</h3>
                  <h5>Hours</h5>
                </div>
                <div className="fz-12-flash-countdown_box">
                  <h3>{isTimerState.minutes}</h3>
                  <h5>Minutes</h5>
                </div>
                <div className="fz-12-flash-countdown_box">
                  <h3>{isTimerState.seconds}</h3>
                  <h5>Seconds</h5>
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

export default FlashSaleSection7;
