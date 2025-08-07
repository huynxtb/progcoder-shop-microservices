import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { brandList } from "../../data/Data";
import { Link } from "react-router-dom";

const BrandSection = () => {
  return (
    <div className="clients-section fz-1-brands-section">
      <div className="container">
        <div className="fz-1-section-heading">
          <h2 className="fz-section-title">Browse by Brand</h2>
        </div>
        <Swiper
          slidesPerView={5}
          className="clients fz-1-brands"
          autoplay={true}
          loop={true}
          modules={[Autoplay]}
          breakpoints={{
            0: {
              slidesPerView: 3,
            },

            480: {
              slidesPerView: 3,
            },

            768: {
              slidesPerView: 4,
            },

            992: {
              slidesPerView: 5,
            },
          }}
        >
          {brandList.map((item) => (
            <SwiperSlide key={item.id}>
              <Link to="/shop">
                <img src={item.imgSrc} alt="Client logo" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BrandSection;
