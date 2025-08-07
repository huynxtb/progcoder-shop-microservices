import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

const OfferSection5 = () => {
  return (
    <section className="fz-10-offer-section">
      <Swiper
        className="fz-10-offer-section-carousel"
        autoplay={true}
        loop={true}
        slidesPerView={1.6}
        spaceBetween={30}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 1.1,
          },

          576: {
            slidesPerView: 1.3,
          },
          768: {
            slidesPerView: 1.4,
            spaceBetween: 50,
          },
        }}
      >
        <SwiperSlide className="fz-10-single-offer">
          <div className="fz-10-single-offer-content">
            <p className="fz-10-single-offer__discount-percentage">
              Save UpTo 30%
            </p>
            <h4 className="fz-10-single-offer__title">Travel Bag</h4>
            <Link to="/shop" className="fz-3-single-offer__btn">
              Shop Now
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide className="fz-10-single-offer two-bg">
          <div className="fz-10-single-offer-content">
            <p className="fz-10-single-offer__discount-percentage">
              Save UpTo 30%
            </p>
            <h4 className="fz-10-single-offer__title">Travel Bag</h4>
            <Link to="/shop" className="fz-3-single-offer__btn">
              Shop Now
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide className="fz-10-single-offer">
          <div className="fz-10-single-offer-content">
            <p className="fz-10-single-offer__discount-percentage">
              Save UpTo 30%
            </p>
            <h4 className="fz-10-single-offer__title">Travel Bag</h4>
            <Link to="/shop" className="fz-3-single-offer__btn">
              Shop Now
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default OfferSection5;
