import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
const VerticalTestimonialSlider = () => {
  const sliderRef = useRef(null);
  const imgNavRef = useRef(null);

  useEffect(() => {
    const sliderSettings = {
      slidesToShow: 1,
      vertical: true,
      verticalSwiping: true,
      asNavFor: imgNavRef.current,
    };
    setSliderSetting(sliderSettings);
  }, []);
  const [sliderSettings, setSliderSetting] = useState({
    slidesToShow: 1,
    vertical: true,
    verticalSwiping: true,
    asNavFor: imgNavRef.current,
  });

  const testimonialImagesSettings = {
    slidesToShow: 1,
    draggable: false,
    arrows: false,
    fade: true,
    asNavFor: sliderRef.current,
  };

  return (
    <section className="fz-3-testimonial-section">
      <div className="container">
        <div className="row gy-5 justify-content-center align-items-center">
          <div className="col-lg-6 position-relative">
            <Slider
              {...sliderSettings}
              ref={sliderRef}
              className="fz-3-testimonial-slider-container"
              id="fz-3-testimonial-slider"
            >
              <div className="fz-3-single-testimony">
                <span className="quote-icon">
                  <i className="fa-solid fa-quote-right"></i>
                </span>
                <p className="fz-3-single-testimony-txt">
                  It's important to ensure you're meeting your customers where
                  they are. After all, you're not going to get a lot of
                  informative feedback if you're running your surveys on social
                  media unless your customers
                </p>

                <div className="fz-3-rating">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>

                <div className="fz-3-reviewer">
                  <div className="fz-3-reviewer-img">
                    <img src="assets/images/user-1.png" alt="Person image" />
                  </div>

                  <div className="fz-3-reviewer-info">
                    <h6 className="fz-3-reviewer-name">Marisa Tomei</h6>
                    <span className="fz-3-reviewer-label">
                      Fashion Designer
                    </span>
                  </div>
                </div>
              </div>

              <div className="fz-3-single-testimony">
                <span className="quote-icon">
                  <i className="fa-solid fa-quote-right"></i>
                </span>
                <p className="fz-3-single-testimony-txt">
                  It's important to ensure you're meeting your customers where
                  they are. After all, you're not going to get a lot of
                  informative feedback if you're running your surveys on social
                  media unless your customers
                </p>

                <div className="fz-3-rating">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                </div>

                <div className="fz-3-reviewer">
                  <div className="fz-3-reviewer-img">
                    <img src="assets/images/user-1.png" alt="Person image" />
                  </div>

                  <div className="fz-3-reviewer-info">
                    <h6 className="fz-3-reviewer-name">Kilma Ani</h6>
                    <span className="fz-3-reviewer-label">
                      Fashion Designer
                    </span>
                  </div>
                </div>
              </div>

              <div className="fz-3-single-testimony">
                <span className="quote-icon">
                  <i className="fa-solid fa-quote-right"></i>
                </span>
                <p className="fz-3-single-testimony-txt">
                  It's important to ensure you're meeting your customers where
                  they are. After all, you're not going to get a lot of
                  informative feedback if you're running your surveys on social
                  media unless your customers
                </p>

                <div className="fz-3-rating">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                </div>

                <div className="fz-3-reviewer">
                  <div className="fz-3-reviewer-img">
                    <img src="assets/images/user-1.png" alt="Person image" />
                  </div>

                  <div className="fz-3-reviewer-info">
                    <h6 className="fz-3-reviewer-name">Daniel Liv</h6>
                    <span className="fz-3-reviewer-label">
                      Fashion Designer
                    </span>
                  </div>
                </div>
              </div>
            </Slider>

            <div className="fz-3-testimonial-slider-nav">
              <button
                type="button"
                onClick={() => sliderRef.current.slickPrev()}
              >
                <i className="fa-regular fa-angle-up"></i>
              </button>
              <button
                type="button"
                onClick={() => sliderRef.current.slickNext()}
              >
                <i className="fa-regular fa-angle-down"></i>
              </button>
            </div>
          </div>

          <div className="col-lg-6">
            <Slider
              {...testimonialImagesSettings}
              ref={imgNavRef}
              className="testimonial-img-slider"
            >
              {" "}
              <img src="assets/images/testimonial-1.png" alt="People Having cake" />
              <img src="assets/images/testimonial-2.jpg" alt="People Having cake" />
              <img src="assets/images/testimonial-3.jpg" alt="People Having cake" />
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerticalTestimonialSlider;
