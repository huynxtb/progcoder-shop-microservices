import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { bagShopBannerData } from "../../data/Data";
import { Link } from "react-router-dom";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { FarzaaContext } from "../../context/FarzaaContext";
import RightSideBar from "../sidebar/RightSideBar";

const BannerSection12 = () => {
  const { handleSidebarOpen } = useContext(FarzaaContext);
  return (
    <section className="fz-6-banner fz-12-banner">
      <Swiper
        className="fz-12-banner-slider"
        slidesPerView={1}
        loop={true}
        pagination={{
          el: ".fz-12-banner-slider-dots",
          renderBullet: function (index, className) {
            return (
              '<button class="' +
              className +
              '">' +
              "0" +
              (index + 1) +
              "</button>"
            );
          },
          bulletClass: "fz-12-banner-slider-dot",
          bulletActiveClass: "active",
        }}
        autoplay={true}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        modules={[Pagination, EffectFade, Autoplay]}
      >
        {bagShopBannerData.map((item) => (
          <SwiperSlide className="fz-12-banner-slide bg-default" key={item.id}>
            <div className="container">
              <div className="row gx-0 gy-4 align-items-end justify-content-between">
                <div className="col-md-3 col-5 col-xxs-12">
                  <div className="fz-12-banner-img">
                    <img src={item.img} alt="Banner image" />
                  </div>
                </div>

                <div className="col-md-6 col-7 col-xxs-12 align-self-center">
                  <div className="fz-12-banner-txt">
                    <h1 className="fz-12-banner-title">{item.title}</h1>
                    <div className="fz-def_btn_wrapper">
                      <Link to="/shop" className="fz-def-btn">
                        <span></span>
                        Shop Now
                        <i className="fa-solid fa-arrow-up-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-3 d-none d-md-block">
                  <div className="fz-12-banner-prod">
                    <div className="fz-12-banner-prod-txt">
                      <h5 className="fz-12-banner-prod-title">
                        <Link to="/shopDetails">{item.productName}</Link>
                      </h5>
                      <span className="fz-12-banner-prod-price">
                        ${item.price}.00
                      </span>
                    </div>
                    <div className="fz-12-banner-prod-img">
                      <Link to="/shopDetails">
                        <img src={item.productImg} alt="Product Image" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="fz-12-banner-slider-dots"></div>

      <div className="container fz-7-banner-socials-container">
        <div className="fz-8-banner-left-actions">
          <button
            className="fz-12-menu-open-btn fz-hamburger"
            onClick={handleSidebarOpen}
          >
            <img src="assets/images/fz-12-icon.png" alt="Icon" />
            <span>Menu</span>
          </button>

          <div className="fz-6-banner-socials">
            <ul>
              <li>
                <Link to="#">
                  <i className="fa-brands fa-facebook-f"></i>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="fa-brands fa-linkedin-in"></i>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="fa-brands fa-twitter"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <RightSideBar showMenu />
    </section>
  );
};

export default BannerSection12;
