import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const BannerSection7 = () => {
  return (
    <section className="fz-6-banner fz-7-banner">
      <Swiper
        className="fz-7-banner-slider owl-carousel"
        slidesPerView={1}
        loop={true}
        autoplay={true}
        modules={[Autoplay]}
      >
        <SwiperSlide className="fz-6-banner-slide fz-7-banner-slide bg-default">
          <div className="container">
            <div className="row justify-content-center g-5">
              <div className="col-lg-6 col-md-8">
                <div className="fz-6-banner-txt">
                  <h1 className="fz-6-banner-title">Smart Digital Watch</h1>
                  <a href="#" className="fz-6-banner-btn fz-6-sub-banner-btn">
                    Shop Now
                  </a>
                </div>
              </div>

              <div className="col-lg-6 text-end">
                <img
                  src="assets/images/fz-7-banner-1.jpg"
                  alt="product image"
                  className="fz-7-banner-img"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="fz-6-banner-slide fz-7-banner-slide bg-default">
          <div className="container">
            <div className="row justify-content-center g-5">
              <div className="col-lg-6 col-md-8">
                <div className="fz-6-banner-txt">
                  <h1 className="fz-6-banner-title">Smart Digital Watch</h1>
                  <a href="#" className="fz-6-banner-btn fz-6-sub-banner-btn">
                    Shop Now
                  </a>
                </div>
              </div>

              <div className="col-lg-6 text-end">
                <img
                  src="assets/images/fz-7-banner-1.jpg"
                  alt="product image"
                  className="fz-7-banner-img"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="fz-6-banner-slide fz-7-banner-slide bg-default">
          <div className="container">
            <div className="row justify-content-center g-5">
              <div className="col-lg-6 col-md-8">
                <div className="fz-6-banner-txt">
                  <h1 className="fz-6-banner-title">Smart Digital Watch</h1>
                  <a href="#" className="fz-6-banner-btn fz-6-sub-banner-btn">
                    Shop Now
                  </a>
                </div>
              </div>

              <div className="col-lg-6 text-end">
                <img
                  src="assets/images/fz-7-banner-1.jpg"
                  alt="product image"
                  className="fz-7-banner-img"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="container fz-7-banner-socials-container">
        <div className="fz-6-banner-socials">
          <ul>
            <li>
              <a href="#">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>
          </ul>
          <h6>Follow us</h6>
        </div>
      </div>
    </section>
  );
};

export default BannerSection7;
