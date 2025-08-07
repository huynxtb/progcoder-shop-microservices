import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
const BannerSection5 = () => {
  return (
    <section className="fz-5-banner-section fz-5-banner-slider">
      <Swiper autoplay={true} loop={true} modules={[Autoplay]}>
        <SwiperSlide className="fz-5-banner-slider-1">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="fz-5-banner-txt">
                  <h3>First Purchase</h3>
                  <h1>EXTRA 60% OFF</h1>
                  <Link to="/shop-2" className="fz-5-def-btn">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="fz-5-banner-slider-2">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="fz-5-banner-txt">
                  <h3>First Purchase</h3>
                  <h1>EXTRA 60% OFF</h1>
                  <Link to="/shop-2" className="fz-5-def-btn">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="fz-5-banner-slider-3">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="fz-5-banner-txt">
                  <h3>First Purchase</h3>
                  <h1>EXTRA 60% OFF</h1>
                  <Link to="/shop-2" className="fz-5-def-btn">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default BannerSection5;
