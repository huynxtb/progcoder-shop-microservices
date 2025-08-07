import React from "react";
import { Swiper } from "swiper/react";
import {
  Pagination,
  Navigation,
  Autoplay,
  EffectFade,
  EffectCards,
  
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import "swiper/css/effect-fade";
import "swiper/css/scrollbar";

const Carousel = ({
  spaceBetween = 20,
  slidesPerView = 1,
  onSlideChange = () => {},
  onSwiper,
  children,
  pagination,
  className = "main-caro",
  navigation,
  autoplay,
  effect,
}) => {
  return (
    <div>
      <Swiper
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        onSlideChange={onSlideChange}
        onSwiper={onSwiper}
        modules={[Pagination, Navigation, Autoplay, EffectFade, EffectCards]}
        pagination={pagination}
        navigation={navigation}
        className={className}
        autoplay={autoplay}
        effect={effect}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default Carousel;
