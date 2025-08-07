import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ClientSlider = () => {
  return (
    <div className="clients-section">
      <div className="container">
        <Swiper
          slidesPerView={5}
          spaceBetween={80}
          autoplay={{ delay: 3000 }}
          modules={[Autoplay]}
          className="clients"
          breakpoints={{
            0: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },

            992: {
              slidesPerView: 5,
            },
          }}
        >
          <SwiperSlide>
            <img src="assets/images/fz-client-1.png" alt="Client logo" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="assets/images/fz-client-2.png" alt="Client logo" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="assets/images/fz-client-3.png" alt="Client logo" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="assets/images/fz-client-4.png" alt="Client logo" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="assets/images/fz-client-5.png" alt="Client logo" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="assets/images/fz-client-1.png" alt="Client logo" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="assets/images/fz-client-2.png" alt="Client logo" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="assets/images/fz-client-3.png" alt="Client logo" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default ClientSlider;
