import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { cycleData } from "../../data/Data";
import CycleCard from "./CycleCard";
const NewCycles = () => {
  return (
    <section className="fz-8-new-arrivals py-120" data-aos="fade-up">
      <div className="container">
        <div className="fz-7-section-heading fz-8-section-heading">
          <h2 className="fz-8-section-title">New Arrivals</h2>
          <p className="fz-8-section-descr">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form,
          </p>
        </div>

        <div className="fz-8-products-row">
          <Swiper
            className="fz-8-products-slider owl-carousel"
            slidesPerView={2}
            autoplay={true}
            loop={true}
            navigation={{
              prevEl: ".fz-8-products-prev",
              nextEl: ".fz-8-products-next",
            }}
            modules={[Autoplay, Navigation]}
            breakpoints={{
              0: {
                spaceBetween: 20,
                slidesPerView: 1,
              },
              480: {
                spaceBetween: 20,
                slidesPerView: 2,
              },
              576: {
                slidesPerView: 2,
                spaceBetween: 30,
              },

              1400: {
                spaceBetween: 50,
              },
            }}
          >
            {cycleData.slice(0, 4).map((item) => (
              <SwiperSlide key={item.id}>
                <CycleCard
                  img={item.img}
                  slug={item.slug}
                  title={item.title}
                  price={item.price}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="fz-8-products-slider-nav"
            id="fz-8-products-slider-nav"
          >
            <button
              type="button"
              role="presentation"
              className="fz-8-products-prev"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button
              type="button"
              role="presentation"
              className="fz-8-products-next"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewCycles;
