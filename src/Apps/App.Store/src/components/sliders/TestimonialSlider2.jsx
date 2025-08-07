import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { testimonialData } from "../../data/Data";

const TestimonialSlider2 = () => {
  return (
    <section className="fz-4-testimonial-section pb-60">
      <div className="container position-relative">
        <div className="fz-4-section-heading">
          <div className="row justify-content-center">
            <div className="col-sm-6">
              <div className="section-heading__txt text-center">
                <h2 className="fz-section-title">People Trust Us</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="fz-4-testimonial-slider-nav">
          <button className="owl-prev">
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <button className="owl-next">
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>

        <Swiper
          className="fz-4-testimonial-slider owl-carousel"
          loop={true}
          spaceBetween={30}
          navigation={{
            prevEl: ".owl-prev",
            nextEl: ".owl-next",
          }}
          pagination={{
            el: ".fz-4-testimonial-pagination",
            bulletElement: "button",
            bulletClass: "fz-4-bullet",
            bulletActiveClass: "active",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 15,
            },

            480: {
              slidesPerView: 2,
              spaceBetween: 15,
            },

            992: {
              slidesPerView: 2.3,
            },
          }}
          modules={[Navigation, Pagination]}
        >
          {testimonialData.map((item) => (
            <SwiperSlide className="fz-4-testimonial-single" key={item.id}>
              <div className="fz-4-reviwer">
                <div className="fz-4-reviwer-img">
                  <img src={item.img} alt="image" />
                </div>
                <div className="fz-4-reviwer-info">
                  <div className="fz-4-rate-star">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <h5 className="fz-4-reviwer-name">{item.name}</h5>
                </div>
              </div>
              <div className="fz-4-testimonial-txt">
                <p>"{item.testimony}</p>
              </div>
            </SwiperSlide>
          ))}
          <div className="fz-4-testimonial-pagination"></div>
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSlider2;
