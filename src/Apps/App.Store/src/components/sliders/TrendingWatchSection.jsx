import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { watchData } from "../../data/Data";
import SingleWatchCard from "../product/SingleWatchCard";

const TrendingWatchSection = () => {
  return (
    <section className="fz-7-trending-products py-120">
      <div className="container">
        <div className="fz-6-products-heading d-flex flex-column flex-md-row justify-content-between align-items-center align-items-md-end">
          <div className="fz-7-products-heading">
            <h2 className="fz-7-section-title">Trending Products</h2>
            <p className="fz-7-section-descr">
              Using test items of real content and data in designs will help
            </p>
          </div>

          <div
            className="fz-6-blogs-slider-nav"
            id="fz-7-trending-products-slider-nav"
          >
            <button className="fz-7-trending-prev">
              <i className="fa-light fa-angle-left"></i>
            </button>
            <button className="fz-7-trending-next">
              <i className="fa-light fa-angle-right"></i>
            </button>
          </div>
        </div>

        <Swiper
          className="fz-7-trending-products-slider"
          slidesPerView={4}
          loop={true}
          autoplay={true}
          spaceBetween={20}
          navigation={{
            prevEl: ".fz-7-trending-prev",
            nextEl: ".fz-7-trending-next",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            480: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            992: {
              slidesPerView: 4,
            },
            1200: {
              spaceBetween: 30,
            },
          }}
          modules={[Autoplay, Navigation]}
        >
          {watchData.map((item) => (
            <SwiperSlide key={item.id}>
              <SingleWatchCard
                img={item.img}
                category={item.category}
                title={item.title}
                slug={item.slug}
                price={item.price}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TrendingWatchSection;
