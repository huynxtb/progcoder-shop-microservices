import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { bannerData2 } from "../../data/Data";
import { Link } from "react-router-dom";
const BannerSection8 = () => {
  return (
    <section className="fz-6-banner fz-8-banner">
      <Swiper
        className="fz-8-banner-slider owl-carousel"
        slidesPerView={1}
        loop={true}
        autoplay={true}
        modules={[Autoplay]}
      >
        {bannerData2.map((item) => (
          <SwiperSlide className="fz-8-banner-slide bg-default" key={item.id}>
            <div className="container">
              <div className="row align-items-center justify-content-between">
                <div className="col-lg-7">
                  <div className="fz-8-banner-txt">
                    <h1 className="fz-8-banner-title">{item.title}</h1>
                    <div className="fz-def_btn_wrapper">
                      <Link to="/shop" className="fz-def-btn">
                        <span></span>
                        Shop Now
                        <i className="fa-solid fa-arrow-up-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <img
                    src={item.img}
                    alt="product image"
                    className="fz-8-banner-img"
                  />
                </div>
              </div>

              <div className="fz-8-banner-prod">
                <div className="fz-8-banner-prod-img">
                  <img src={item.productImg} alt="product image" />
                </div>

                <div className="fz-8-banner-prod-txt">
                  <h5 className="fz-8-banner-prod-title">
                    <Link to="/shopDetails">{item.productName}</Link>
                  </h5>
                  <h6 className="fz-8-banner-prod-price">
                    ${item.productPrice}.00
                  </h6>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="container fz-7-banner-socials-container">
        <div className="fz-8-banner-left-actions">
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

          <div className="fz-banner-search-btn">
            <a role="button" className="fz-header-search-btn fz-2-search-btn">
              <i className="fa-regular fa-magnifying-glass"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection8;
