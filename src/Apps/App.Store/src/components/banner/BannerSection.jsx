import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FarzaaContext } from "../../context/FarzaaContext";
import { firstBannerData } from "../../data/Data";
import { Link } from "react-router-dom";
import VideoModal from "../modal/VideoModal";

const BannerSection = () => {
  const { handleVideoShow } = useContext(FarzaaContext);

  return (
    <section className="fz-1-banner-section">
      <Swiper
        slidesPerView={1}
        className="fz-1-banner-slider owl-carousel"
        autoplay={true}
        navigation={{
          prevEl: ".owl-prev",
          nextEl: ".owl-next",
        }}
        modules={[Navigation, Autoplay]}
      >
        {firstBannerData.map((item) => (
          <SwiperSlide className="fz-1-banner-single-slide" key={item.id}>
            <div className="container position-relative">
              <div className="row">
                <div className="col-lg-6 col-md-7">
                  <div className="fz-1-banner-txt">
                    <h1 className="text5">{item.title}</h1>

                    <div className="fz-1-banner-txt__btns">
                      <button
                        className="fz-1-banner-vid-btn"
                        data-video-id="SwZynNzqBys"
                        onClick={handleVideoShow}
                      >
                        <i className="fa-solid fa-play"></i>
                      </button>

                      <Link to="/shop" className="fz-1-banner-btn">
                        View More <i className="fa-light fa-arrow-up-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-5 align-self-end">
                  <div className="fz-1-banner-img-container">
                    <div className="sticker-container">
                      <img
                        src="assets/images/sticker.png"
                        alt="Sticker"
                        className="sticker"
                      />
                      <span>25k</span>
                    </div>

                    <div className="fz-1-banner-img">
                      <img src={item.imgSrc} alt="Product Images" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="owl-nav">
          <button className="owl-prev">
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <button className="owl-next">
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </Swiper>
      <VideoModal />
    </section>
  );
};

export default BannerSection;
