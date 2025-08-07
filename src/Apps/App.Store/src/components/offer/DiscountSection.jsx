import React, { useContext } from "react";
import VideoModal from "../modal/VideoModal";
import { FarzaaContext } from "../../context/FarzaaContext";

const DiscountSection = () => {
  const { handleVideoShow } = useContext(FarzaaContext);

  return (
    <section className="fz-11-discount">
      <div className="fz-11-top-discount-container">
        <div className="fz-11-discount-left">
          <div>
            <h2 className="fz-11-discount-tittle">Dome CCTV Up To 25% Off</h2>
            <p className="fz-11-discount-description">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum.
            </p>
            <div className="fz-11-discount-btn">
              <button>Shop Now</button>
            </div>
          </div>
        </div>
        <div className="fz-11-discount-right">
          <img className="w-100" src="assets/images/offer-cctv1.png" alt="" />
          <div className="fz-11-discount-overlay">
            <a role="button" onClick={handleVideoShow}>
              <i className="fa-thin fa-circle-play fz-11-discount-icon"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="fz-11-bottom-discount-container">
        <div className="fz-11-discount-right">
          <img className="w-100" src="assets/images/offer-cctv2.png" alt="" />
          <div className="fz-11-discount-overlay">
            <a role="button" onClick={handleVideoShow}>
              <i className="fa-thin fa-circle-play fz-11-discount-icon"></i>
            </a>
          </div>
        </div>
        <div className="fz-11-discount-left">
          <div>
            <h2 className="fz-11-discount-tittle">
              Day/Night CCTV Up To 25% Off
            </h2>
            <p className="fz-11-discount-description">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum.
            </p>
            <div className="fz-11-discount-btn">
              <button>Shop Now</button>
            </div>
          </div>
        </div>
      </div>
      <VideoModal />
    </section>
  );
};

export default DiscountSection;
