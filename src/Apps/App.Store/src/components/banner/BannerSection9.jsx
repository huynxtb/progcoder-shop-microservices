import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
const BannerSection9 = () => {
  return (
    <section className="fz-9-banner">
      <Swiper
        className="fz-9-banner-slider owl-carousel"
        loop={true}
        autoplay={true}
        modules={[Autoplay]}
      >
        <SwiperSlide
          className="fz-9-banner-slide pt-30 pb-120 bg-default"
          style={{
            backgroundImage: "url(assets/images/fz-9-banner-bg.png)",
          }}
        >
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-md-3 col-4">
                <div className="fz-9-banner-left-img">
                  <img src="assets/images/fz-9-banner2.png" alt="banner" />
                </div>
              </div>
              <div className="col-md-6 col-12 order-3 order-md-2">
                <div className="fz-9-banner-content">
                  <h4 className="fz-9-banner-subtitle">
                    Flat <span>20%</span> Off
                  </h4>
                  <h1 className="fz-9-banner-title">
                    Beautiful & Latest Baby Clothes
                  </h1>
                  <Link className="fz-9-def-btn fz-9-def-btn-pink" to="/shop">
                    Shop Now
                  </Link>
                </div>
              </div>
              <div className="col-md-3 col-4 order-2 order-md-3">
                <div className="fz-9-banner-right-img">
                  <img src="assets/images/fz-9-banner1.png" alt="banner" />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide
          className="fz-9-banner-slide pt-30 pb-120 bg-default"
          style={{
            backgroundImage: "url(assets/images/fz-9-banner-bg.png)",
          }}
        >
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-md-3 col-4">
                <div className="fz-9-banner-right-img">
                  <img src="assets/images/fz-9-banner1.png" alt="banner" />
                </div>
              </div>
              <div className="col-md-6 col-12 order-3 order-md-2">
                <div className="fz-9-banner-content">
                  <h4 className="fz-9-banner-subtitle">
                    Flat <span>20%</span> Off
                  </h4>
                  <h1 className="fz-9-banner-title">
                    Buy Clothes for Your Baby
                  </h1>
                  <Link className="fz-9-def-btn fz-9-def-btn-pink" to="/shop">
                    Shop Now
                  </Link>
                </div>
              </div>
              <div className="col-md-3 col-4 order-2 order-md-3">
                <div className="fz-9-banner-left-img">
                  <img src="assets/images/fz-9-banner2.png" alt="banner" />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default BannerSection9;
