import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { bagBlogData } from "../../data/Data";
import { Link } from "react-router-dom";
import { Autoplay, Navigation } from "swiper/modules";

const BagBlogSection2 = () => {
  return (
    <section className="fz-12-blogs py-120">
      <div className="container">
        <div className="fz-7-section-heading fz-12-section-heading">
          <h2 className="fz-12-section-title">Our Blog Post</h2>
          <p className="fz-12-section-descr">
            Quis auctor elit sed vulputate mi sit amet mauris. Eu turpis egestas
            pretium aenean pharetra magna.
          </p>
        </div>

        <div className="fz-8-products-row">
          <Swiper
            className="fz-12-blogs-slider"
            slidesPerView={2}
            autoplay={true}
            loop={true}
            navigation={{
              prevEl: ".fz-8-products-prev",
              nextEl: ".fz-8-products-next",
            }}
            breakpoints={{
              0: {
                spaceBetween: 30,
                slidesPerView: 1,
              },
              768: {
                spaceBetween: 30,
                slidesPerView: 2,
              },
              992: {
                spaceBetween: 50,
                slidesPerView: 2,
              },
            }}
            modules={[Autoplay, Navigation]}
          >
            {bagBlogData.map((item) => (
              <SwiperSlide className="fz-12-blog" key={item.id}>
                <div className="fz-12-blog-img">
                  <img src={item.img} alt="Product Image" />
                </div>

                <div className="fz-12-blog-txt">
                  <span className="fz-12-blog-category">
                    <Link to="/blog">{item.category}</Link>
                  </span>
                  <h4 className="fz-12-blog-title">
                    <Link to="/blogDetails">{item.title}</Link>
                  </h4>
                  <div className="fz-8-blog-infos">
                    <span className="fz-8-blog-info">{item.date}</span>
                    <span className="fz-8-blog-info">
                      {item.comments} comments
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div class="fz-8-products-slider-nav">
            <button class="fz-8-products-prev">
              <i class="fa-solid fa-arrow-left"></i>
            </button>
            <button class="fz-8-products-next">
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BagBlogSection2;
