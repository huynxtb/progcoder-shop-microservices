import React, { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FarzaaContext } from "../../context/FarzaaContext";
import { Link } from "react-router-dom";

const CollectionSection = () => {
  const { addToCart, addToWishlist, paginatedProducts, slides } =
    useContext(FarzaaContext);
  const [activeTab, setActiveTab] = useState("all");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const filteredItemList =
    activeTab === "all"
      ? paginatedProducts
      : paginatedProducts.filter((item) => item.category === activeTab);
  return (
    <section className="fz-1-latest-collection">
      <div className="container">
        <div className="fz-1-section-heading">
          <h2 className="fz-section-title">Latest Collection</h2>
        </div>

        <div className="filter-navs">
          <button onClick={() => handleTabChange("all")}>
            <span className="filter-nav-order">01</span>
            <span className="filter-nav-name">All Door</span>
          </button>

          <button onClick={() => handleTabChange("Solid Color Door")}>
            <span className="filter-nav-order">02</span>
            <span className="filter-nav-name">Solid Color Door</span>
          </button>

          <button onClick={() => handleTabChange("Double Layer Door")}>
            <span className="filter-nav-order">03</span>
            <span className="filter-nav-name">Double Layer Door</span>
          </button>

          <button onClick={() => handleTabChange("Chinese Door")}>
            <span className="filter-nav-order">04</span>
            <span className="filter-nav-name">Chinese Door</span>
          </button>

          <button onClick={() => handleTabChange("Plastic Door")}>
            <span className="filter-nav-order">05</span>
            <span className="filter-nav-name">Plastic Door</span>
          </button>

          <div className="fz-1-latest-products-slider-nav">
            <button type="button" className="product-prev">
              <i className="fa-regular fa-angle-left"></i>
            </button>
            <button type="button" className="product-next">
              <i className="fa-regular fa-angle-right"></i>
            </button>
          </div>
        </div>

        <Swiper
          slidesPerView={4}
          className="fz-1-products-container"
          navigation={{
            prevEl: ".product-prev",
            nextEl: ".product-next",
          }}
          modules={[Navigation]}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            480: {
              slidesPerView: 2,
            },
            769: {
              slidesPerView: 3,
            },
            993: {
              slidesPerView: 4,
            },
          }}
        >
          {filteredItemList.slice(0, 5).map((item) => (
            <SwiperSlide
              className="fz-1-single-product wood-door"
              key={item.id}
            >
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
      </div>
    </section>
  );
};

export default CollectionSection;
