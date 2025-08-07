import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FarzaaContext } from "../../context/FarzaaContext";
import { Link } from "react-router-dom";
const ModernDoorSection = () => {
  const { filteredProducts, addToCart, addToWishlist } =
    useContext(FarzaaContext);

  return (
    <section className="fz-1-modern-door-section">
      <div className="container">
        <div className="fz-1-section-heading">
          <div className="section-heading__txt">
            <h2 className="fz-section-title">Modern Interior Doors</h2>
          </div>
        </div>

        <div className="fz-1-modern-door-slider-container">
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            loop={true}
            autoplay={{ delay: 3000 }}
            navigation={{
              prevEl: ".owl-prev",
              nextEl: ".owl-next",
            }}
            modules={[Navigation, Autoplay]}
            className="fz-1-modern-door-slider owl-carousel"
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
            }}
          >
            {filteredProducts.slice(0, 6).map((item) => (
              <SwiperSlide className="fz-1-single-product" key={item.id}>
                <div className="fz-single-product__img">
                  <img src={item.imgSrc} alt="Product Image" />
                  <div className="fz-single-product__actions">
                    <button
                      className="fz-add-to-wishlist-btn"
                      onClick={() => addToWishlist(item.id)}
                    >
                      <span className="btn-txt">add To wishlist</span>
                      <span className="btn-icon">
                        {item.isInWishlist ? (
                          <i className="fa-solid fa-heart"></i>
                        ) : (
                          <i className="fa-light fa-heart"></i>
                        )}
                      </span>
                    </button>

                    <button
                      className="fz-add-to-cart-btn"
                      onClick={() => addToCart(item.id)}
                    >
                      <span className="btn-txt">add To cart</span>
                      <span className="btn-icon">
                        <i className="fa-light fa-cart-shopping"></i>
                      </span>
                    </button>

                    <button className="fz-add-to-compare-btn">
                      <span className="btn-txt">select to compare</span>
                      <span className="btn-icon">
                        <i className="fa-light fa-arrow-right-arrow-left"></i>
                      </span>
                    </button>
                  </div>
                </div>

                <div className="fz-single-product__txt">
                  <Link to="/shopDetails" className="fz-single-product__title">
                    {item.name}
                  </Link>
                  <p className="fz-single-product__price">
                    <span className="current-price">${item.price}</span>
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="fz-1-modern-door-slider-nav">
            <button className="owl-prev">
              <i className="fa-solid fa-angle-left"></i>
            </button>
            <button className="owl-next">
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernDoorSection;
