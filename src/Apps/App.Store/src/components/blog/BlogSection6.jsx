import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { blogData } from "../../data/Data";
import { Link } from "react-router-dom";
const BlogSection6 = () => {
  return (
    <section className="fz-6-blogs">
      <div className="container">
        <div className="fz-6-products-heading justify-content-between">
          <h2 className="fz-6-section-title">Latest Blog News</h2>
          <div className="fz-6-blogs-slider-nav" id="fz-6-blogs-slider-nav">
            <button className="fz-6-blogs-prev">
              <i className="fa-light fa-arrow-left"></i>
            </button>
            <button className="fz-6-blogs-next">
              <i className="fa-light fa-arrow-right"></i>
            </button>
          </div>
        </div>

        <Swiper
          className="fz-6-blogs-slider"
          spaceBetween={30}
          loop={true}
          navigation={{
            prevEl: ".fz-6-blogs-prev",
            nextEl: ".fz-6-blogs-next",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },

            480: {
              slidesPerView: 1.4,
              centeredSlides: true,
            },

            576: {
              slidesPerView: 1.6,
              centeredSlides: true,
            },

            768: {
              slidesPerView: 2,
            },

            992: {
              slidesPerView: 3,
            },
          }}
          modules={[Navigation]}
        >
          {blogData.map((item) => (
            <SwiperSlide className="fz-6-blog" key={item.id}>
              <div className="fz-6-blog-img">
                <img src={item.img} alt="Blog Image" />
              </div>

              <div className="fz-6-blog-txt">
                <div className="fz-6-blog-infos">
                  <div className="fz-6-blog-info">
                    <i className="fa-regular fa-user"></i> By {item.postedBy}
                  </div>

                  <div className="fz-6-blog-info">
                    <i className="fa-regular fa-tags"></i> {item.category}
                  </div>
                </div>

                <h4 className="fz-6-blog-title">
                  <Link to="/blogDetails">{item.title}</Link>
                </h4>

                <div className="fz-6-blog-bottom">
                  <span className="fz-6-blog-date">
                    <i className="fa-solid fa-calendar-alt"></i>
                    {item.date}
                  </span>
                  <Link to="/blogDetails">Read More</Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BlogSection6;
