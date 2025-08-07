import React, { useContext, useState } from "react";
import { EffectFade, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";
import { FarzaaContext } from "../../context/FarzaaContext";
const BannerSection10 = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { handleSidebarOpen } = useContext(FarzaaContext);
  return (
    <section className="fz-10-banner fz-2-banner-section">
      <div className="container fz-7-banner-socials-container">
        <div className="fz-8-banner-left-actions fz-10-banner-left-actions">
          <button
            className="fz-12-menu-open-btn fz-hamburger"
            onClick={handleSidebarOpen}
          >
            <img src="assets/images/fz-12-icon.png" alt="Icon" />
            <span>Menu</span>
          </button>

          <div className="fz-banner-search-btn">
            <button className="fz-2-search-btn">
              <i className="fa-regular fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="container position-relative">
        <div className="row g-4 justify-content-xxl-between justify-content-center align-items-center">
          <div className="col-lg-7 col-md-8">
            <div className="fz-banner-left">
              <h1 className="fz-10-heading">New Travel Bag</h1>

              <div className="fz-def_btn_wrapper">
                <Link to="/shop" className="fz-def-btn fz-10-btn">
                  <span></span> Shop Now{" "}
                  <i className="fa-light fa-arrow-up-right"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6 col-8">
            <div className="fz-10-banner-right">
              <Swiper
                className="fz-image-area fz-10-banner-prod-slider"
                navigation={{
                  prevEl: ".fz-10-banner-prod-slider-prev",
                  nextEl: ".fz-10-banner-prod-slider-next",
                }}
                loop={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Navigation, Thumbs]}
              >
                <SwiperSlide className="single-image-box">
                  <img src="assets/images/banner-10-1.png" alt="product" />
                  <div className="single-image-box-content">
                    <h4>Travel Backpack</h4>
                    <span>$380.00</span>
                  </div>
                </SwiperSlide>

                <SwiperSlide className="single-image-box">
                  <img src="assets/images/banner-10-1.png" alt="product" />
                  <div className="single-image-box-content">
                    <h4>Travel Backpack</h4>
                    <span>$380.00</span>
                  </div>
                </SwiperSlide>
              </Swiper>
              <div className="fz-10-banner-prod-slider-nav">
                <button className="fz-10-banner-prod-slider-prev">
                  <i className="fa-light fa-arrow-left-long"></i>
                </button>
                <button className="fz-10-banner-prod-slider-next">
                  <i className="fa-light fa-arrow-right-long"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container fz-7-banner-socials-container">
        <div className="fz-6-banner-socials fz-10-banner-socials">
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

      <Swiper
        className="fz-10-banner-bg-slider"
        id="fz-10-banner-bg-slider"
        effect="fade"
        slidesPerView={1}
        loop={true}
        fadeEffect={{
          crossFade: true,
        }}
        modules={[EffectFade]}
        onSwiper={setThumbsSwiper}
      >
        <SwiperSlide>
          <img src="assets/images/fz-10-banner-img-1.png" alt="banner-img" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="assets/images/fz-10-banner-img-2.png" alt="banner-img" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default BannerSection10;
