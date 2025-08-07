import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ccTvCompanyData } from "../../data/Data";

const FooterSection10 = () => {
  return (
    <footer className="fz-2-footer-section fz-11-footer position-relative">
      <div className="fz-11-footer-logo container ">
        <Swiper
          className="fz-11-footer-logo-container"
          loop={true}
          autoplay={true}
          spaceBetween={40}
          slidesPerView={4}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            480: {
              slidesPerView: 3,
            },
            992: {
              slidesPerView: 4,
            },
          }}
        >
          {ccTvCompanyData.map((logo, index) => (
            <SwiperSlide key={index}>
              <img src={logo} alt="Brand Logo" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="fz-footer-top fz-11-footer-top">
        <div className="container">
          <div className="row gy-5 justify-content-md-center justify-content-xl-between justify-content-start">
            <div className="col-lg-3 col-md-4 col-6 col-xxs-12">
              <div className="fz-footer-widget fz-11-footer-widget">
                <h5 className="fz-11-footer-widget__title">Office</h5>
                <div className="fz-11-footer-list">
                  <p>
                    Rock St 14,
                    <br />
                    New york City, USA
                  </p>
                  <p className="mt-2">+907 156 464 478</p>
                  <p>+907 156 464 478</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-6 col-xxs-12">
              <div className="fz-11-footer-widget">
                <h5 className="fz-11-footer-widget__title">Links</h5>
                <ul className="fz-11-footer-list">
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">About US </a>
                  </li>
                  <li>
                    <a href="#">Shop Cart</a>
                  </li>
                  <li>
                    <a href="#">Pages</a>
                  </li>
                  <li>
                    <a href="#">Blog News</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-6 col-xxs-12">
              <div className="fz-11-footer-widget">
                <h5 className="fz-11-footer-widget__title">Products</h5>
                <ul className="fz-11-footer-list">
                  <li>
                    <a href="#">Dome CCTV</a>
                  </li>
                  <li>
                    <a href="#">Bullet CCTV</a>
                  </li>
                  <li>
                    <a href="#">C-Mount CCTV</a>
                  </li>
                  <li>
                    <a href="#">PTZ Pan-tilt CCTV</a>
                  </li>
                  <li>
                    <a href="#">Day/Night CCTV</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-3 col-lg-5 col-md-8 col-sm-12">
              <div className="fz-11-footer-widget">
                <h5 className="fz-11-footer-widget__title">Newsletter</h5>
                <div className="fz-11-footer-list">
                  <div className="fz-footer-subscribe-form">
                    <div className="fz-footer-subscribe-form-input fz-11-footer-subscribe-form-input">
                      <input
                        type="email"
                        name="footer-subs-email"
                        id="fz-footer-subs-email"
                        placeholder="Email"
                      />
                      <span className="fz-footer-subs-icon">
                        <i className="fa-light fa-envelope-open"></i>
                      </span>
                    </div>
                    <button className="fz-11-footer-subs-btn">
                      SUBSCRIBE <i className="fa-light fa-paper-plane"></i>
                    </button>
                  </div>
                  <ul className="d-flex gap-3 mt-2">
                    <li className="fz-11-footer-icon">
                      <a href="#">
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="fz-11-footer-icon">
                      <a href="#">
                        <i className="fa-brands fa-twitter"></i>
                      </a>
                    </li>
                    <li className="fz-11-footer-icon">
                      <a href="#">
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                    </li>
                    <li className="fz-11-footer-icon">
                      <a href="#">
                        <i className="fa-brands fa-pinterest"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fz-footer-bottom fz-11-footer-bottom">
        <hr className="fz-11-footer-border" />
        <div className="container">
          <div className="fz-11-bottom-container">
            <div>
              <p className="fz-11-footer-copyright font-weight-normal">
                &copy;
                {new Date().getFullYear()} Design & Developed by
                <b>CodeBasket</b>
              </p>
            </div>
            <div>
              <img src="assets/images/logo-11-light.png" alt="Farzaa Logo" />
            </div>
            <div className="text-lg-end text-center">
              <img
                src="assets/images/footer-payment.png"
                alt="Pyament Methods"
                className="fz-payment-methods"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection10;
