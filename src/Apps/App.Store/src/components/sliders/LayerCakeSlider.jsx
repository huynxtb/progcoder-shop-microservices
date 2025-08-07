import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FarzaaContext } from "../../context/FarzaaContext";
import { Link } from "react-router-dom";

const LayerCakeSlider = () => {
  const {
    addToCakeCart,
    addToCakeWishlist,
    handleProductViewOpen,
    cakeListArray,
  } = useContext(FarzaaContext);

  return (
    <section className="fz-3-layer-cake-section">
      <div className="container">
        <div className="fz-3-section-heading">
          <div className="section-heading__txt">
            <h2 className="fz-section-title">Layer Cakes</h2>
            <p className="fz-section-sub-title">
              True Pound Cake is a recipe that dates
            </p>
          </div>

          <div className="section-heading__actions">
            <div className="fz-3-layer-cake-slider-nav fz-3-slider-nav">
              <button className="owl-prev">
                <i className="fa-solid fa-angle-left"></i>
              </button>
              <button className="owl-next">
                <i className="fa-solid fa-angle-right"></i>
              </button>
            </div>
          </div>
        </div>

        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 3000 }}
          navigation={{
            prevEl: ".owl-prev",
            nextEl: ".owl-next",
          }}
          modules={[Navigation, Autoplay]}
          className="fz-3-layer-cake-slider owl-carousel"
          breakpoints={{
            0: {
              slidesPerView: 1,
              centeredSlides: true,
            },

            480: {
              slidesPerView: 2,
              centeredSlides: false,
            },

            576: {
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
          {cakeListArray.slice(0, 6).map((item) => (
            <SwiperSlide className="fz-3-single-product" key={item.id}>
              <div className="fz-3-single-product__img">
                <img src={item.imgSrc} alt="Product Image" />
                <div className="fz-3-single-product__actions">
                  <div className="top-actions">
                    <button
                      className="fz-3-add-to-wishlist"
                      onClick={() => addToCakeWishlist(item.id)}
                    >
                      {item.isInWishlist ? (
                        <i className="fa-solid fa-heart"></i>
                      ) : (
                        <i className="fa-light fa-heart"></i>
                      )}
                    </button>
                  </div>
                  <div className="bottom-actions">
                    <button
                      className="fz-3-add-to-cart"
                      onClick={() => addToCakeCart(item.id)}
                    >
                      Add to cart
                    </button>
                    <button
                      className="fz-3-quick-view"
                      onClick={handleProductViewOpen}
                    >
                      Quick view
                    </button>
                  </div>
                </div>
              </div>

              <div className="fz-3-single-product__txt">
                <Link to="/shopDetails" className="fz-3-single-product__title">
                  {item.name}
                </Link>
                <p className="fz-3-single-product__price">
                  <span className="current-price">${item.price}</span>
                  <span className="prev-price text-decoration-line-through">
                    ${item.oldPrice}
                  </span>
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default LayerCakeSlider;
