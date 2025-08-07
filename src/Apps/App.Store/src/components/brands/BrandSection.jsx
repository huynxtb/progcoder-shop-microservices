import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { brandData } from "../../data/Data";
import { Link } from "react-router-dom";

const BrandSection = () => {
  return (
    <div className="clients-section fz-1-brands-section">
      <div className="container">
        <div className="fz-4-section-heading">
          <div className="row justify-content-center">
            <div className="col-sm-6">
              <div className="section-heading__txt text-center">
                <h2 className="fz-section-title">Trusted Brands</h2>
              </div>
            </div>
          </div>
        </div>
        <Swiper
          className="clients fz-4-brands owl-carousel"
          loop={true}
          autoplay={true}
          slidesPerView={5}
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            992: {
              slidesPerView: 5,
            },
          }}
          modules={[Autoplay]}
        >
          {brandData.map((brandImg, index) => (
            <SwiperSlide className="fz-4-brand-img-container" key={index}>
              <Link to="/shop">
                <img src={brandImg} alt="Client logo" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BrandSection;
