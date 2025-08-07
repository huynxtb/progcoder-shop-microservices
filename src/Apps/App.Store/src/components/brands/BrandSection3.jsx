import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { brandData3 } from "../../data/Data";

const BrandSection3 = () => {
  return (
    <section className="fz-7-brands">
      <div className="container">
        <div className="fz-7-brands-bg">
          <div className="fz-7-brands-heading d-flex flex-column">
            <h2 className="fz-7-section-title fz-7-brands-title">
              Explore All New Brands
            </h2>
          </div>

          <div className="fz-7-brands-row">
            <Swiper
              className="fz-7-brands-slider owl-carousel"
              slidesPerView={4}
              loop={true}
              autoplay={true}
              spaceBetween={30}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                },
                576: {
                  slidesPerView: 3,
                },
                992: {
                  spaceBetween: 30,
                  slidesPerView: 4,
                },
              }}
              modules={[Autoplay]}
            >
              {brandData3.map((item) => (
                <SwiperSlide key={item.id}>
                  <Link to={item.slug}>
                    <img src={item.img} alt="Brand logo" />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSection3;
