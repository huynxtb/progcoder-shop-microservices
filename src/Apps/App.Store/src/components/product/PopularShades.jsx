import React from "react";
import { categoryData } from "../../data/Data";
import { Link } from "react-router-dom";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const PopularShades = () => {
  return (
    <section className="fz-5-category-section pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-4">
            <div className="fz-5-section-heading pe-lg-4">
              <h2 className="fz-section-title">Popular Shapes</h2>
              <p>
                It’s likely you have one of the following face shapes: Oval,
                square, round, heart.
              </p>
            </div>
          </div>
          <div className="col-lg-8">
            <Swiper
              className="fz-5-category-slider owl-carousel"
              slidesPerView={4}
              autoplay={true}
              loop={true}
              spaceBetween={15}
              navigation={{
                prevEl: ".owl-prev",
                nextEl: ".owl-next",
              }}
              modules={[Autoplay, Navigation]}
            >
              <div className="owl-nav">
                <button type="button" role="presentation" className="owl-prev">
                  <i className="fa-solid fa-angle-left"></i>
                </button>
                <button type="button" role="presentation" className="owl-next">
                  <i className="fa-solid fa-angle-right"></i>
                </button>
              </div>
              {categoryData.map((item) => (
                <SwiperSlide className="fz-5-category-slider-box" key={item.id}>
                  <div className="fz-5-category-slider-img">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="fz-5-category-slider-txt">
                    <Link to="/shop-2">{item.category}</Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularShades;
