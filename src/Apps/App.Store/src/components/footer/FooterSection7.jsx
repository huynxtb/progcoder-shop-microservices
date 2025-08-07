import React from "react";
import { Link } from "react-router-dom";

const FooterSection7 = () => {
  return (
    <footer className="fz-6-footer fz-8-footer">
      <div className="fz-footer-top">
        <div className="container">
          <div className="row fz-footer-top-row justify-content-start justify-content-xl-between">
            <div className="col-xl-3 col-sm-6">
              <div className="fz-footer-about">
                <div className="fz-logo">
                  <Link to="/">
                    <img src="assets/images/logo-8-light.png" alt="logo" />
                  </Link>
                </div>

                <p className="fz-footer-about__txt">
                  Made with the belief that home living should be easy and
                  expressive. All of our products are designer made and
                  rigorously tested.
                </p>
              </div>
            </div>

            <div className="col-xl-2 col-md-4 col-6 col-xxs-12 order-xl-1 order-3">
              <div className="fz-footer-widget">
                <h5 className="fz-footer-widget__title">Office</h5>
                <ul className="fz-footer-contacts">
                  <li>Rock St 14, New york City, USA</li>
                  <li>
                    <a href="tel:123456789">+907 156 464 478</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-2 col-md-4 col-6 col-xxs-12 order-xl-2 order-4">
              <div className="fz-footer-widget">
                <h5 className="fz-footer-widget__title">Quick Link</h5>
                <ul>
                  <li>
                    <a href="#">Our Story</a>
                  </li>
                  <li>
                    <a href="#">Blog & Press</a>
                  </li>
                  <li>
                    <a href="#">Order History</a>
                  </li>
                  <li>
                    <a href="#">Wish List</a>
                  </li>
                  <li>
                    <a href="#">Terms & Conditions</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-2 col-md-4 col-6 col-xxs-12 order-xl-3 order-5">
              <div className="fz-footer-widget">
                <h5 className="fz-footer-widget__title">Products</h5>

                <ul>
                  <li>
                    <a href="#">All Products</a>
                  </li>
                  <li>
                    <a href="#">Payment Method</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Faq & Support</a>
                  </li>
                  <li>
                    <a href="#">Blog Post</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 p-xxl-0 order-xl-4 order-1">
              <div className="fz-footer-widget">
                <h5 className="fz-footer-widget__title">News Letter</h5>
                <div className="fz-footer-subscribe">
                  <form action="#" className="fz-footer-subscribe-form">
                    <input
                      type="email"
                      name="footer-subs-email"
                      id="fz-footer-subs-email"
                      placeholder="Email"
                    />
                    <button className="fz-footer-subs-btn">
                      <i className="fa-light fa-arrow-right"></i>
                    </button>
                  </form>
                </div>
                <div className="fz-3-footer-socials fz-8-footer-socials">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-youtube"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="fz-footer-bottom">
          <div className="row gy-4 align-items-center">
            <div className="col-lg-6">
              <p className="fz-copyright text-center text-lg-start">
                &copy;
                {new Date().getFullYear()} Design & Developed by{" "}
                <b>CodeBasket</b>
              </p>
            </div>

            <div className="col-lg-6 text-lg-end text-center">
              <img
                src="assets/images/card.png"
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

export default FooterSection7;
