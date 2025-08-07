import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { categoryData2 } from "../../data/Data";
import { Link } from "react-router-dom";
const CategorySection8 = () => {
  return (
    <section className="fz-9-categories">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="fz-9-section-title-area text-center">
              <h2 className="fz-9-section-title">Top Category</h2>
            </div>
          </div>
        </div>

        <div className="category-items position-relative">
          <Swiper
            className="fz-9-categories-slider"
            slidesPerView={4}
            spaceBetween={30}
            loop={true}
            navigation={{
              prevEl: ".fz-9-cate-prev",
              nextEl: ".fz-9-cate-next",
            }}
            modules={[Navigation]}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              481: {
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
            {categoryData2.map((item) => (
              <SwiperSlide className="category-box" key={item.id}>
                <div className="categoriy-single-item">
                  <div className="category-thumb">
                    <Link to={item.slug}>
                      <img src={item.img} alt="category-image" />
                    </Link>
                  </div>
                </div>
                <div className="category-btn text-center">
                  <Link className="fz-9-def-btn" to={item.slug}>
                    {item.name} ({item.quantity})
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="fz-9-slider-nav">
            <button className="fz-9-cate-prev">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button className="fz-9-cate-next">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection8;
