import React from "react";

const OfferSection6 = () => {
  return (
    <section className="fz-11-offer">
      <div className="fz-11-offer-container">
        <div className="fz-11-offer-content">
          <div className="mb-0 fz-11-offer-img-container">
            <img
              className="fz-11-offer-img"
              src="assets/images/discount-cctv1.png"
              alt=""
            />
          </div>
          <div className="fz-11-offer-content-txt">
            <h4 className="fz-11-offer-title">30% Big Offer</h4>
            <h2 className="fz-11-offer-name">
              Dome CCTV
              <br />
              Up To 25% Off
            </h2>
            <button className="btn btn-outline-secondary rounded-0 fz-11-offer-btn">
              Shop Now
            </button>
          </div>
        </div>
        <div className="fz-11-offer-content fz-11-offer-right-container">
          <div className="fz-11-offer-content-txt">
            <h4 className="fz-11-offer-title">30% Big Offer</h4>
            <h2 className="fz-11-offer-name">
              Bullet CCTV <br />
              Up To 25% Off
            </h2>
            <button className="btn btn-outline-secondary rounded-0 fz-11-offer-btn">
              Shop Now
            </button>
          </div>
          <div className="mb-0 fz-11-offer-right-img-container ms-3 w-50">
            <img
              className="fz-11-offer-right-img"
              src="assets/images/discount-cctv-2.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection6;
