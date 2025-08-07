import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ccTvCategoryData } from "../../data/Data";
import { Navigation } from "swiper/modules";

const CcTvCategorySection = () => {
  return (
    <section className="fz-11-category position-relative">
      <div className="fz-11-category-container">
        <div className="fz-11-category-sub-container">
          <h2 className="fz-11-category-heading">
            Shop By
            <br />
            <span className="ms-5 ps-3">Categorey</span>
          </h2>
          <p className="fz-11-category-description">
            Using test items of real content and data in the designs will help
            but there's no guarantee that every oddity
          </p>

          <div className="fz-11-category-icon-container">
            <i className="fa-solid fa-arrow-left fz-11-category-arrow arrow-btn-left"></i>
            <i className="fa-solid fa-arrow-right fz-11-category-arrow arrow-btn-right"></i>
          </div>
        </div>
      </div>

      <Swiper
        className="mySwiper fz-11-category-cctv-container"
        slidesPerView={1}
        spaceBetween={50}
        breakpoints={{
          1200: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }}
        navigation={{
          nextEl: ".arrow-btn-right",
          prevEl: ".arrow-btn-left",
        }}
        modules={[Navigation]}
      >
        {ccTvCategoryData.map((item) => (
          <SwiperSlide className="position-relative" key={item.id}>
            <img className="fz-11-category-cctv1" src={item.img} alt="" />
            <div className="fz-11-category-button">
              <button>{item.name}</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CcTvCategorySection;
