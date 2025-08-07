import React from "react";
import { blogData2 } from "../../data/Data";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

const BlogSection7 = () => {
  return (
    <section className="fz-7-blogs pb-120">
      <div className="container">
        <div className="fz-7-section-heading">
          <h2 className="fz-7-section-title">Latest Blog Post</h2>
          <p className="fz-7-section-descr">
            Using test items of real content and data in designs will help but
            there's no guarantee that every oddity
          </p>
        </div>

        <div className="position-relative">
          <Swiper
            className="fz-7-blogs-slider owl-carousel"
            slidesPerView={3}
            loop={true}
            autoplay={true}
            spaceBetween={20}
            navigation={{
              prevEl: ".fz-7-blog-prev",
              nextEl: ".fz-7-blog-next",
            }}
            modules={[Autoplay, Navigation]}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              577: {
                slidesPerView: 2,
              },
              992: {
                spaceBetween: 30,
                slidesPerView: 3,
              },
            }}
          >
            {blogData2.map((item) => (
              <SwiperSlide className="fz-7-blog" key={item.id}>
                <div className="fz-7-blog-img">
                  <img src={item.img} alt="Blog Image" />
                </div>

                <span className="fz-7-blog-date">
                  <span>{item.day}</span>
                  {item.month}
                </span>
                <div className="fz-7-blog-txt">
                  <h4 className="fz-7-blog-title">
                    <Link to="/blogDetails">{item.title}</Link>
                  </h4>
                  <Link to="/blogDetails" className="fz-7-blog-btn">
                    Read More
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="fz-7-blogs-slider-nav" id="fz-7-blogs-slider-nav">
            <button className="fz-7-blog-prev">
              <i className="fa-solid fa-angle-left"></i>
            </button>
            <button className="fz-7-blog-next">
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection7;
