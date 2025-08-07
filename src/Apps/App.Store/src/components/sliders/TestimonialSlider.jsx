import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

const TestimonialSlider = () => {
  return (
    <section className="fz-2-testimonial-section">
      <div className="container">
        <div className="fz-2-section-heading">
          <h2 className="fz-section-title">Reviews From Customer</h2>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-7 col-9 col-xxs-12 position-relative">
            <div className="fz-testimonial-slider-nav">
              <button type="button" role="presentation" className="owl-prev">
                <i className="fa-solid fa-angle-left"></i>
              </button>
              <button type="button" role="presentation" className="owl-next">
                <i className="fa-solid fa-angle-right"></i>
              </button>
            </div>
            <Swiper
              slidesPerView={1}
              navigation={{
                prevEl: ".owl-prev",
                nextEl: ".owl-next",
              }}
              pagination={{
                el: ".fz-testimonial-slider-dots",
                clickable: true,
                bulletClass: "owl-dot",
                bulletActiveClass: "active",
              }}
              modules={[Navigation, Pagination]}
              className="fz-testimonial-slider-container owl-carousel"
            >
              <SwiperSlide className="fz-single-testimony">
                <span className="quote-icon">
                  <i className="fa-solid fa-quote-right"></i>
                </span>
                <p className="fz-single-testimony-txt">
                  It's important to ensure you're meeting your customers where
                  they are. After all, you're not going to get a lot of
                  informative feedback if you're running your surveys on social
                  media unless your customers are many people heavy the social
                  media users.
                </p>

                <div className="fz-reviewer">
                  <div className="fz-reviewer-img">
                    <img src="assets/images/user-1.png" alt="Person image" />
                  </div>

                  <div className="fz-reviewer-info">
                    <div className="fz-rating">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </div>
                    <h6 className="fz-reviewer-name">Marisa Tomei</h6>
                    <span className="fz-reviewer-label">Fashion Designer</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="fz-single-testimony">
                <span className="quote-icon">
                  <i className="fa-solid fa-quote-right"></i>
                </span>
                <p className="fz-single-testimony-txt">
                  It's important to ensure you're meeting your customers where
                  they are. After all, you're not going to get a lot of
                  informative feedback if you're running your surveys on social
                  media unless your customers are many people heavy the social
                  media users.
                </p>

                <div className="fz-reviewer">
                  <div className="fz-reviewer-img">
                    <img src="assets/images/user-1.png" alt="Person image" />
                  </div>

                  <div className="fz-reviewer-info">
                    <div className="fz-rating">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                    </div>
                    <h6 className="fz-reviewer-name">Kilma Ani</h6>
                    <span className="fz-reviewer-label">Fashion Designer</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="fz-single-testimony">
                <span className="quote-icon">
                  <i className="fa-solid fa-quote-right"></i>
                </span>
                <p className="fz-single-testimony-txt">
                  It's important to ensure you're meeting your customers where
                  they are. After all, you're not going to get a lot of
                  informative feedback if you're running your surveys on social
                  media unless your customers are many people heavy the social
                  media users.
                </p>

                <div className="fz-reviewer">
                  <div className="fz-reviewer-img">
                    <img src="assets/images/user-1.png" alt="Person image" />
                  </div>

                  <div className="fz-reviewer-info">
                    <div className="fz-rating">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                    </div>
                    <h6 className="fz-reviewer-name">Daniel Liv</h6>
                    <span className="fz-reviewer-label">Fashion Designer</span>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
            <div className="fz-testimonial-slider-dots">
              <button role="button" className="owl-dot">
                <span></span>
              </button>
              <button role="button" className="owl-dot">
                <span></span>
              </button>
              <button role="button" className="owl-dot">
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
