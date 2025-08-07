import React from "react";
import { bannerData } from "../../data/Data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
const BannerSection6 = () => {
  return (
    <section className="fz-6-banner">
      <Swiper
        className="fz-6-banner-slider owl-carousel"
        slidesPerView={1}
        loop={true}
        // autoplay={true}
        pagination={{
          el: ".fz-6-slider-dots",
          bulletClass: "fz-6-bullets",
          bulletActiveClass: "active",
          bulletElement: "button",
        }}
        modules={[Autoplay, Pagination]}
      >
        {bannerData.map((item) => (
          <SwiperSlide className="fz-6-banner-slide bg-default" key={item.id}>
            <div className="container">
              <div className="row">
                <div className="col-xxl-6 col-lg-7 col-md-9 col-10 col-xxs-12">
                  <div className="fz-6-banner-txt">
                    <h1 className="fz-6-banner-title">{item.title}</h1>
                    <div className="fz-6-banner-bottom">
                      <p className="fz-6-banner-descr">{item.desc}</p>
                      <a href="#" className="fz-6-banner-btn">
                        Shop Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="fz-6-slider-dots"></div>
      </Swiper>

      <div className="container position-relative">
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

export default BannerSection6;
