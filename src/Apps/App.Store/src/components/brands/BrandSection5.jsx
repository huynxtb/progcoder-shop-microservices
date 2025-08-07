import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { kidsBrandData } from "../../data/Data";
import { Link } from "react-router-dom";

const BrandSection5 = () => {
  return (
    <section className="fz-9-brands-section">
      <div className="container">
        <div className="row ">
          <div className="col-md-12">
            <div className="fz-9-brands-row">
              <Swiper
                className="fz-9-brands-slider"
                slidesPerView={3}
                loop={true}
                spaceBetween={30}
                autoplay={true}
                breakpoints={{
                  0: {
                    slidesPerView: 4,
                  },
                  768: {
                    slidesPerView: 5,
                  },
                  992: {
                    slidesPerView: 6,
                  },
                }}
                modules={[Autoplay]}
              >
                {kidsBrandData.map((logo, index) => (
                  <SwiperSlide key={index}>
                    <Link to="/shop">
                      <img src={logo} alt="Brand logo" />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSection5;
