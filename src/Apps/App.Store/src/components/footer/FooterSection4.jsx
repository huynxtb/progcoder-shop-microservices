import React from "react";
import { Link } from "react-router-dom";

const FooterSection4 = () => {
  return (
    <footer className="fz-5-footer-section">
      <div className="container">
        <div className="quick-search">
          <div className="fz-5-section-heading fz-5-section-heading-2">
            <div className="row justify-content-center">
              <div className="col-sm-6">
                <div className="section-heading__txt text-center">
                  <h2 className="fz-section-title fz-extra-title-fs-34 text-light">
                    Quick Search
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xxl-7 col-xl-8">
              <form className="row g-lg-4 g-3">
                <div className="col-lg-3 col-sm-6">
                  <select className="nice-select wide">
                    <option value="">Any Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                  </select>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <select className="nice-select wide">
                    <option value="">Any Power</option>
                    <option value="1">100</option>
                    <option value="2">200</option>
                    <option value="3">300</option>
                    <option value="4">400</option>
                  </select>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <select className="nice-select wide">
                    <option value="">Select Frame</option>
                    <option value="1">Frame 01</option>
                    <option value="2">Frame 02</option>
                    <option value="3">Frame 03</option>
                    <option value="4">Frame 04</option>
                  </select>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <button className="fz-5-def-btn fz-5-def-btn-sm px-4 w-100">
                    Submit Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="fz-footer-top">
          <div className="fz-5-footer-row">
            <div className="fz-5-footer-col">
              <div className="fz-footer-about">
                <div className="fz-footer-logo">
                  <Link to="/">
                    <img src="assets/images/logo-5-light.png" alt="logo" />
                  </Link>
                </div>

                <div className="fz-footer-info">
                  <ul>
                    <li>
                      <span className="icon">
                        <i className="fa-light fa-map-location"></i>
                      </span>
                      <span className="txt">
                        16 Rr 2, Ketchikan, Alaska 99901, USA
                      </span>
                    </li>
                    <li>
                      <span className="icon">
                        <i className="fa-light fa-phone"></i>
                      </span>
                      <span className="txt">(907) 225-4144</span>
                    </li>
                    <li>
                      <span className="icon">
                        <i className="fa-light fa-envelope-open-text"></i>
                      </span>
                      <span className="txt">mail@example.com</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="fz-5-footer-col">
              <div className="fz-footer-widget">
                <h5 className="fz-footer-widget__title">Customer Service</h5>
                <ul>
                  <li>
                    <a href="#">Shipping and Returns</a>
                  </li>
                  <li>
                    <a href="#">Product Care</a>
                  </li>
                  <li>
                    <a href="#">Returns & Policy</a>
                  </li>
                  <li>
                    <a href="#">Warranty & Lifetime Service</a>
                  </li>
                  <li>
                    <a href="#">Jewelry Care Instruction</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="fz-5-footer-col">
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

            <div className="fz-5-footer-col">
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

            <div className="fz-5-footer-col">
              <div className="fz-footer-widget">
                <h5 className="fz-footer-widget__title">News Letter</h5>
                <div className="fz-footer-subscribe">
                  <p className="fz-footer-subscribe-txt">
                    Sign up to receive exclusive offers
                  </p>
                  <form className="fz-footer-subscribe-form">
                    <input
                      type="email"
                      name="footer-subs-email"
                      id="fz-footer-subs-email"
                      placeholder="Enter your mail..."
                    />
                    <button className="fz-5-def-btn">Subscribe</button>
                  </form>
                </div>
                <div className="footer-social">
                  <ul className="d-flex gap-4">
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
                    <li>
                      <a href="#">
                        <i className="fa-brands fa-tiktok"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fz-footer-bottom">
          <div className="row gy-3 align-items-center">
            <div className="col-lg-5">
              <p className="fz-copyright">
                &copy;
                {new Date().getFullYear()} Design & Developed by{" "}
                <b>CodeBasket</b>
              </p>
            </div>

            <div className="col-lg-7">
              <ul className="d-flex flex-wrap gap-lg-3 gap-2 justify-content-lg-end justify-content-center">
                <li>
                  <a href="#">Terms of Use</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Accessibility Statement</a>
                </li>
                <li>
                  <a href="#">Toggle Accessibility</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection4;
