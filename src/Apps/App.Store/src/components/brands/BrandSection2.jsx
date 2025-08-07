import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { brandData2 } from "../../data/Data";

const BrandSection2 = () => {
  return (
    <div className="clients-section fz-1-brands-section p-0">
      <div className="container">
        <div className="fz-5-section-heading fz-5-section-heading-2">
          <div className="row justify-content-center">
            <div className="col-sm-6">
              <div className="section-heading__txt text-center">
                <h2 className="fz-section-title">Our Brands</h2>
              </div>
            </div>
          </div>
        </div>
        <Swiper
          className="clients-2 fz-5-brands"
          slidesPerView={6}
          spaceBetween={15}
          autoplay={true}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 3,
            },

            480: {
              slidesPerView: 4,
            },

            768: {
              slidesPerView: 5,
            },

            1200: {
              slidesPerView: 6,
            },
          }}
          // modules={[Autoplay]}
        >
          {brandData2.map((item, index) => (
            <SwiperSlide key={index}>
              <Link to="/shop">
                <img src={item} alt="Brand logo" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BrandSection2;
