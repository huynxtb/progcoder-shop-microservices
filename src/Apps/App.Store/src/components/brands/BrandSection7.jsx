import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { bagCompanyData } from "../../data/Data";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";

const BrandSection7 = () => {
  return (
    <section className="fz-8-brands py-120">
      <div className="container">
        <Swiper
          className="fz-12-brands-slider"
          speed={1500}
          loop={true}
          autoplay={{
            delay: 0,
          }}
          spaceBetween={40}
          breakpoints={{
            0: {
              slidesPerView: 3,
            },
            576: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 5,
            },
            992: {
              spaceBetween: 65,
              slidesPerView: 5,
            },
          }}
          modules={[Autoplay]}
        >
          {bagCompanyData.map((logo, index) => (
            <SwiperSlide key={index}>
              <Link to="/shop">
                <img src={logo} alt="Brand logo" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BrandSection7;
