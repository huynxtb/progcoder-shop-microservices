import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { bagBrandData } from "../../data/Data";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";

const BrandSection6 = () => {
  return (
    <div className="fz-10-brands-row">
      <Swiper
        className="fz-10-brands-slider"
        slidesPerView={5}
        loop={true}
        spaceBetween={65}
        autoplay={true}
        breakpoints={{
          0: {
            slidesPerView: 3,
            spaceBetween: 35,
          },
          480: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 4,
          },
          1199: {
            slidesPerView: 5,
          },
        }}
        modules={[Autoplay]}
      >
        {bagBrandData.map((logo, index) => (
          <SwiperSlide key={index}>
            <Link to="/shop">
              <img src={logo} alt="Brand logo" />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandSection6;
