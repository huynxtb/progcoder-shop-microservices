import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { bagShopData2 } from "../../data/Data";
import SingleBagCard2 from "./SingleBagCard2";
import { Autoplay, Navigation } from "swiper/modules";

const TreandyBagSection2 = () => {
  return (
    <section className="fz-12-trendy-prods py-120">
      <div className="container">
        <div className="fz-7-section-heading fz-12-section-heading">
          <h2 className="fz-12-section-title">Trendy Products</h2>
          <p className="fz-12-section-descr">
            Quis auctor elit sed vulputate mi sit amet mauris. Eu turpis egestas
            pretium aenean pharetra magna.
          </p>
        </div>

        <div className="fz-12-trendy-products-container position-relative">
          <Swiper
            className="fz-12-trendy-products-slider"
            loop={true}
            autoplay={true}
            slidesPerView={4}
            spaceBetween={20}
            navigation={{
              prevEl: ".fz-8-products-slider-prev",
              nextEl: ".fz-8-products-slider-next",
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
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
                spaceBetweenx: 30,
              },
            }}
            modules={[Autoplay, Navigation]}
          >
            {bagShopData2.map((item) => (
              <SwiperSlide key={item.id}>
                <SingleBagCard2
                  img={item.img}
                  name={item.name}
                  price={item.price}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            className="fz-8-products-slider-nav"
            id="fz-12-trendy-products-slider-nav"
          >
            <button className="fz-8-products-slider-prev">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button className="fz-8-products-slider-next">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreandyBagSection2;
