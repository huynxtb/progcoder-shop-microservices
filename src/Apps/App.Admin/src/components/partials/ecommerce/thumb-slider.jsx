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
  // Use images from product if available, otherwise fallback to hardcoded images
  const getImages = () => {
    if (product?.images && Array.isArray(product.images) && product.images.length > 0) {
      // Map API images (objects with publicURL) to URLs
      return product.images.map(img => 
        typeof img === 'string' ? img : (img.publicURL || img.url || '')
      ).filter(url => url);
    }
    // Fallback to hardcoded images
    return [
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
  };

  const images = getImages();
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
        loop={images.length > 1}
        spaceBetween={10}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.length > 0 ? (
          images.map((image, i) => {
            return (
              <SwiperSlide
                key={i}
                className="h-[409px] w-[396px] py-11 px-14 bg-secondary-200 rounded-md"
              >
                <img
                  className="  h-full w-full  object-contain  transition-all duration-300 group-hover:scale-105"
                  src={image}
                  alt={product?.name || "Product image"}
                />
              </SwiperSlide>
            );
          })
        ) : (
          <SwiperSlide className="h-[409px] w-[396px] py-11 px-14 bg-secondary-200 rounded-md">
            <div className="h-full w-full flex items-center justify-center text-slate-400">
              No image available
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      {images.length > 1 && (
        <div className="flex mt-6 space-x-3 rtl:space-x-reverse ">
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={images.length > 1}
            spaceBetween={10}
            slidesPerView={Math.min(4, images.length)}
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
                    alt={product?.name || "Product thumbnail"}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default ThumbSliderCom;
