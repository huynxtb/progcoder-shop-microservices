import React from "react";
import { kidsBlogData } from "../../data/Data";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

const KidsBlogSection = () => {
  return (
    <section
      className="fz-9-blog-section bg-default"
      style={{ backgroundImage: "url(assets/images/fz-9-blog-bg.jpg)" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="fz-9-section-title-area text-center">
              <h2 className="fz-9-section-title">Our Blog Post</h2>
              <p className="fz-9-section-content">
                Quis auctor elit sed vulputate mi sit amet mauris. Eu turpis{" "}
                <br />
                egestas pretium aenean pharetra magna.
              </p>
            </div>
          </div>
        </div>

        <div className="fz-8-products-row">
          <Swiper
            className="fz-12-blogs-slider fz-8-products-slider-carousel"
            loop={true}
            slidesPerView={2}
            autoplay={true}
            navigation={{
              prevEl: ".fz-8-products-slider-prev",
              nextEl: ".fz-8-products-slider-next",
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
            {kidsBlogData.map((item) => (
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
          <div
            className="fz-8-products-slider-nav "
            id="fz-12-blogs-slider-nav"
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

export default KidsBlogSection;
