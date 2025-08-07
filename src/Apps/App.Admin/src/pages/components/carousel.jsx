import React from "react";
import Carousel from "@/components/ui/Carousel";
import { SwiperSlide } from "swiper/react";
import Card from "../../components/ui/Card";

// import images
import c1 from "@/assets/images/all-img/c1.png";
import c2 from "@/assets/images/all-img/c2.png";
import c3 from "@/assets/images/all-img/c3.png";

const carousel = () => {
  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
      <Card title="Basic Example">
        <Carousel pagination={true} navigation={true} className="main-caro">
          <SwiperSlide>
            <div
              className="single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] "
              style={{
                backgroundImage: `url(${c1})`,
              }}
            ></div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] "
              style={{
                backgroundImage: `url(${c2})`,
              }}
            ></div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] "
              style={{
                backgroundImage: `url(${c3})`,
              }}
            ></div>
          </SwiperSlide>
        </Carousel>
      </Card>
      <Card title="Basic Example">
        <Carousel pagination={true} navigation={true}>
          <SwiperSlide>
            <div
              className="single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] "
              style={{
                backgroundImage: `url(${c1})`,
              }}
            >
              <div className="pt-20 container text-center px-4 slider-content h-full w-full min-h-[300px] rounded-md flex flex-col items-center justify-center text-white">
                <div className="max-w-sm">
                  <h2 className="text-xl font-medium text-white">
                    Lorem ipsum
                  </h2>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.Lorem ipsum dolor sit amet, consectetur..
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] "
              style={{
                backgroundImage: `url(${c2})`,
              }}
            >
              <div className="pt-20 container text-center px-4 slider-content h-full w-full min-h-[300px] rounded-md flex flex-col items-center justify-center text-white">
                <div className="max-w-sm">
                  <h2 className="text-xl font-medium text-white">
                    Lorem ipsum
                  </h2>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.Lorem ipsum dolor sit amet, consectetur..
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] "
              style={{
                backgroundImage: `url(${c3})`,
              }}
            >
              <div className="pt-20 container text-center px-4 slider-content h-full w-full min-h-[300px] rounded-md flex flex-col items-center justify-center text-white">
                <div className="max-w-sm">
                  <h2 className="text-xl font-medium text-white">
                    Lorem ipsum
                  </h2>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.Lorem ipsum dolor sit amet, consectetur..
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Carousel>
      </Card>
      <Card title="Carousel Interval">
        <Carousel
          pagination={true}
          navigation={true}
          className="main-caro"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <div
              className="single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] "
              style={{
                backgroundImage: `url(${c1})`,
              }}
            ></div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] "
              style={{
                backgroundImage: `url(${c2})`,
              }}
            ></div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] "
              style={{
                backgroundImage: `url(${c3})`,
              }}
            ></div>
          </SwiperSlide>
        </Carousel>
      </Card>
      <Card title="Crossfade">
        <Carousel
          pagination={true}
          navigation={true}
          className="main-caro"
          effect={"fade"}
        >
          <SwiperSlide>
            <div
              className="single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] "
              style={{
                backgroundImage: `url(${c1})`,
              }}
            ></div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] "
              style={{
                backgroundImage: `url(${c2})`,
              }}
            ></div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="single-slide bg-no-repeat bg-cover bg-center rounded-md min-h-[300px] "
              style={{
                backgroundImage: `url(${c3})`,
              }}
            ></div>
          </SwiperSlide>
        </Carousel>
      </Card>
    </div>
  );
};

export default carousel;
