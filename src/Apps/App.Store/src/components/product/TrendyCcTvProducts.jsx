import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ccTvShopData } from "../../data/Data";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";

const TrendyCcTvProducts = () => {
  return (
    <section className="fz-11-trendy">
      <div className="container">
        <div className="fz-11-trendy-text-container">
          <div>
            <h2 className="fz-11-trendy-title">Trendy Products</h2>
            <p className="fz-11-trendy-description">
              Quis auctor elit sed vulputate mi sit amet mauris. Eu turpis
              <br />
              egestas pretium aenean pharetra magna.
            </p>
          </div>
          <div className="fz-11-trendy-arrow-container">
            <i className="fa-solid fa-arrow-left fz-11-trendy-arrow arrow-btn-left"></i>
            <i className="fa-solid fa-arrow-right fz-11-trendy-arrow arrow-btn-right"></i>
          </div>
        </div>
      </div>

      <div className="container">
        <Swiper
          className="mySwiper"
          slidesPerView={1}
          spaceBetween={50}
          breakpoints={{
            1200: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            576: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
          }}
          navigation={{
            nextEl: ".arrow-btn-right",
            prevEl: ".arrow-btn-left",
          }}
          modules={[Navigation]}
        >
          {ccTvShopData.map((item) => (
            <SwiperSlide className="fz-11-trendy-cctv" key={item.id}>
              <div className="fz-11-trendy-cctv-img position-relative">
                <div className="fz-11-trendy-img">
                  <img src={item.img} alt="" />
                </div>
                <div className="fz-11-trendy-cart-container">
                  <div>
                    <div className="fz-11-trendy-icon-container">
                      <i className="fa-regular fa-star fz-11-trendy-arrow"></i>
                      <i className="fa-solid fa-arrow-right-arrow-left fz-11-trendy-arrow"></i>
                      <i className="fa-regular fa-eye fz-11-trendy-arrow"></i>
                    </div>
                    <button className="fz-11-trendy-cart-btn">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
              <h2 className="fz-11-trendy-cctv-name">
                <Link to="/shopDetails">{item.name}</Link>
              </h2>
              <p className="fz-11-trendy-cctv-price">${item.price}.00</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TrendyCcTvProducts;
