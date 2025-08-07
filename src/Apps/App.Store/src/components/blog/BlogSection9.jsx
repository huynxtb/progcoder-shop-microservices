import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ccTvBlogData } from "../../data/Data";
import { Navigation } from "swiper/modules";

const BlogSection9 = () => {
  return (
    <section className="fz-11-blog">
      <div className="fz-11-blog-text-container">
        <div>
          <h2 className="fz-11-blog-title">Latest Articles And News</h2>
          <p className="fz-11-blog-description">
            Using test items of real content and data in designs will help
            <br />
            but there's no guarantee that every.
          </p>
        </div>
        <div className="fz-11-blog-arrow-container">
          <i className="fa-solid fa-arrow-left fz-11-blog-arrow arrow-btn-left"></i>
          <i className="fa-solid fa-arrow-right fz-11-blog-arrow arrow-btn-right"></i>
        </div>
      </div>

      <div className="fz-11-blog-container">
        <Swiper
          className="fz-11-blog-mySwiper"
          slidesPerView={2}
          spaceBetween={40}
          navigation={{
            nextEl: ".arrow-btn-right",
            prevEl: ".arrow-btn-left",
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            300: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
          }}
          modules={[Navigation]}
        >
          {ccTvBlogData.map((item) => (
            <SwiperSlide className="fz-11-single-blog" key={item.id}>
              <div>
                <img src={item.img} alt="" />
                <h2 className="fz-11-single-blog-title">{item.title}</h2>
                <button className="fz-11-blog-btn">Read Article</button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div>
          <div>
            <h2 className="fz-11-blog-article-title">
              CCTV (Closed-Circuit Television) Is A TV System In Which Signals
              Are Not Publicly Distributed.
            </h2>
            <p className="fz-11-blog-article-description">
              Many desktop publishing packages and web page editors now use
              Lorem Ipsum as their default model text, and a<br />
              search for 'lorem ipsum' will uncover many web sites still in
              their infancy.
            </p>
            <button className="fz-11-blog-article-btn">
              Read in 3 minutes
            </button>
          </div>
          <div className="mt-3">
            <h2 className="fz-11-blog-article-title pt-2">
              CCTV Stands For Closed Circuit Television. It Is A Video System
              That Consists Of Strategically Placed Video Cameras
            </h2>
            <p className="fz-11-blog-article-description">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint
              <br />
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </p>
            <button className="fz-11-blog-article-btn">
              Read in 5 minutes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection9;
