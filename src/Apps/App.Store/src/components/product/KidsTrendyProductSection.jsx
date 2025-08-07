import React from "react";
import { kidsClothingData } from "../../data/Data";
import { Swiper, SwiperSlide } from "swiper/react";
import KidsClothingProductCard from "./KidsClothingProductCard";
import { Autoplay, Navigation } from "swiper/modules";

const KidsTrendyProductSection = () => {
  return (
    <section
      className="fz-9-trendy-product-section"
      style={{ backgroundImage: "url(assets/images/fz-9-tendy-bg.jpg)" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="fz-9-section-title-area text-center">
              <h2 className="fz-9-section-title">Trendy Products</h2>
              <p className="fz-9-section-content">
                Quis auctor elit sed vulputate mi sit amet mauris. Eu turpis{" "}
                <br />
                egestas pretium aenean pharetra magna.
              </p>
            </div>
          </div>
        </div>
        <div className="trendy-product-items">
          <Swiper
            className="fz-9-trendy-slider owl-carousel"
            loop={true}
            autoplay={true}
            navigation={{
              prevEl: ".fz-9-slider-nav-prev",
              nextEl: ".fz-9-slider-nav-next",
            }}
            breakpoints={{
              0: {
                spaceBetween: 20,
                slidesPerView: 1,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                spaceBetween: 20,
                slidesPerView: 3,
              },
              992: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            slidesPerView={4}
            modules={[Autoplay, Navigation]}
          >
            {kidsClothingData.map((item) => (
              <SwiperSlide key={item.id}>
                <KidsClothingProductCard
                  img={item.img}
                  name={item.name}
                  price={item.price}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fz-9-slider-nav">
            <button className="fz-9-slider-nav-prev">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button className="fz-9-slider-nav-next">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KidsTrendyProductSection;
