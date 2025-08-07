import React from "react";

const BannerSection11 = () => {
  return (
    <section className="fz-11-banner">
      <div className="fz-11-banner-container">
        <div className="positon-relative">
          <img
            className="fz-11-banner-image1"
            src="assets/images/banner-cctv-1.png"
            alt=""
          />
        </div>

        <div className="fz-11-banner-text-container">
          <div className="fz-11-banner-sub-container">
            <div>
              <h2 className="fz-11-banner-heading">
                A Better Life Better World
              </h2>
              <p className="fz-11-banner-description">
                Quis auctor elit sed vulputate mi sit amet mauris. Eu turpis
                egestas pretium aenean pharetra magna.
              </p>
              <button className="fz-11-banner-button">Shop Now</button>
            </div>
            <div>
              <img
                className="fz-11-banner-image2"
                src="assets/images/banner-cctv-2.png"
                alt=""
              />
            </div>
          </div>
          <div className="fz-11-banner-sub-container2 position-relative">
            <div className="fz-11-banner-image3 position-relative">
              <img src="assets/images/banner-cctv-3.png" alt="" />

              <div className="fz-11-banner-cctv fz-1-banner-img-container">
                <div>
                  <img src="assets/images/cctv.png" alt="" />
                </div>
              </div>

              <div className="fz-11-banner-sticker">
                <img src="assets/images/banner-sticker.png" alt="" />
              </div>
            </div>
            <div className="fz-11-banner-social-media">
              <span>Facebook / </span>
              <span>Linkedin / </span>
              <span>Twitter </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection11;
