import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { brandData4 } from "../../data/Data";
import { Link } from "react-router-dom";
const BrandSection4 = () => {
  return (
    <div className="fz-8-brands py-120">
      <div className="container">
        <Swiper
          className="fz-8-brands-slider owl-carousel"
          slidesPerView={5}
          loop={true}
          spaceBetween={65}
          autoplay={true}
          breakpoints={{
            0: {
              slidesPerView: 3,
            },
            992: {
              slidesPerView: 4,
            },
            1200: {
              slidesPerView: 5,
            },
          }}
          modules={[Autoplay]}
        >
          {brandData4.map((logo, index) => (
            <SwiperSlide key={index}>
              <Link to="/shop">
                <img src={logo} alt="Brand logo" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BrandSection4;
