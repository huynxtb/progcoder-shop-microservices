import React, { useState, useEffect, useRef } from "react";
import blackJumper from "@/assets/images/e-commerce/product-card/classical-black-tshirt.png";
import blackTshirt from "@/assets/images/e-commerce/product-card/black-t-shirt.png";
import checkShirt from "@/assets/images/e-commerce/product-card/check-shirt.png";
import grayJumper from "@/assets/images/e-commerce/product-card/gray-jumper.png";
import grayTshirt from "@/assets/images/e-commerce/product-card/gray-t-shirt.png";
import pinkBlazer from "@/assets/images/e-commerce/product-card/pink-blazer.png";
import redTshirt from "@/assets/images/e-commerce/product-card/red-t-shirt.png";
import yellowFrok from "@/assets/images/e-commerce/product-card/yellow-frok.png";
import yellowJumper from "@/assets/images/e-commerce/product-card/yellow-jumper.png";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import useRtl from "@/hooks/useRtl";

const ThumbSliderCom = ({ product }) => {
  const images = [
    blackJumper,
    blackTshirt,
    checkShirt,
    grayTshirt,
    grayJumper,
    pinkBlazer,
    redTshirt,
    yellowFrok,
    yellowJumper,
  ];

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isRtl] = useRtl();

  return (
    <>
      <Swiper
        key={`${isRtl}-swiper`}
        dir={isRtl ? "rtl" : "ltr"}
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((image, i) => {
          return (
            <SwiperSlide
              key={i}
              className="h-[409px] w-[396px] py-11 px-14 bg-secondary-200 rounded-md"
            >
              <img
                className="  h-full w-full  object-contain  transition-all duration-300 group-hover:scale-105"
                src={image}
                alt="."
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="flex mt-6 space-x-3 rtl:space-x-reverse ">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {images.map((image, j) => {
            return (
              <SwiperSlide
                key={`second_slider_${j}`}
                className="h-[90px] w-[90px] py-[14px] px-[17px] bg-secondary-200 rounded-sm"
              >
                <img
                  className="  h-full w-full  object-contain"
                  src={image}
                  alt="."
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default ThumbSliderCom;
