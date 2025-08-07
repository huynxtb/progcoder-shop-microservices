import React, { useContext } from "react";
import { FarzaaContext } from "../../context/FarzaaContext";

const FlashSaleSection4 = () => {
  const { isTimerState } = useContext(FarzaaContext);

  return (
    <section
      className="fz-9-flash-sale-sction"
      style={{ backgroundImage: "url(assets/images/fz-9-flash-sale-bg.jpg)" }}
    >
      <div className="container">
        <div
          className="fz-9-falsh-banner-area"
          style={{
            backgroundImage: "url(assets/images/fz-9-flash-sale-bg2.jpg)",
          }}
        >
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="fz-9-flash-content-area">
                <div className="fz-9-flash-sale-content">
                  <h4 className="subtitle">Discount Gifts</h4>
                  <h2 className="title">
                    Gifts Under <span>$10</span>
                  </h2>
                  <p className="description">
                    Nisl vel pretium lectus quam id. Mus mauris vitae ultricies{" "}
                    <br />
                    leo integer malesuada.
                  </p>
                </div>
                <div className="fz-9-flash-sale-timer">
                  <div className="fz-hot-deal-countdown">
                    <div className="fz-9-flash-countdown_box">
                      <h3 className="fz-9-flash-countdown_value">
                        {isTimerState.days}
                      </h3>
                      <h5 className="fz-9-flash-countdown_unit">Days</h5>
                    </div>
                    <div className="fz-9-flash-countdown_box">
                      <h3 className="fz-9-flash-countdown_value">
                        {isTimerState.hours}
                      </h3>
                      <h5 className="fz-9-flash-countdown_unit">Hours</h5>
                    </div>
                    <div className="fz-9-flash-countdown_box">
                      <h3 className="fz-9-flash-countdown_value">
                        {isTimerState.minutes}
                      </h3>
                      <h5 className="fz-9-flash-countdown_unit">Minutes</h5>
                    </div>
                    <div className="fz-9-flash-countdown_box">
                      <h3 className="fz-9-flash-countdown_value">
                        {isTimerState.seconds}
                      </h3>
                      <h5 className="fz-9-flash-countdown_unit">Seconds</h5>
                    </div>
                  </div>
                </div>
                <div className="fz-9-flash-sale-btn">
                  <a className="fz-9-btn" href="#">
                    shop now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="fz-9-falsh-img-area">
                <div className="fz-9-flash-img1">
                  <img
                    src="assets/images/fz-9-flash-img1.png"
                    alt="flash-image"
                  />
                </div>
                <div className="fz-9-flash-img2">
                  <img
                    src="assets/images/fz-9-flash-img2.png"
                    alt="flash-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSaleSection4;
