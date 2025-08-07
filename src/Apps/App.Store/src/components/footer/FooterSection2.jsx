import React from "react";
import { Link } from "react-router-dom";

const FooterSection2 = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="fz-2-footer-section">
      <div className="fz-footer-top">
        <div className="container">
          <div className="row gy-5 justify-content-center justify-content-xl-between">
            <div className="col-xl-3 col-lg-6 col-md-8">
              <div className="fz-footer-about">
                <div className="fz-logo">
                  <Link to="/">
                    <img src="assets/images/logo-2.png" alt="logo" />
                  </Link>
                </div>

                <p className="fz-footer-about__txt">
                  Made with the belief that home living should be easy and
                  expressive. All of our products are designer made and
                  rigorously tested.
                </p>

                <div className="fz-footer-socials">
                  <div className="fz-footer-socials-title">Follow Us</div>
                  <ul className="d-flex">
                    <li>
                      <Link to="#">
                        <i className="fa-brands fa-facebook-f"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa-brands fa-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa-brands fa-instagram"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa-brands fa-youtube"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <i className="fa-brands fa-tiktok"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-6 col-xxs-12">
              <div className="fz-footer-widget">
                <h5 className="fz-footer-widget__title">Customer Service</h5>
                <ul>
                  <li>
                    <Link to="#">Shipping and Returns</Link>
                  </li>
                  <li>
                    <Link to="#">Product Care</Link>
                  </li>
                  <li>
                    <Link to="#">Returns & Policy</Link>
                  </li>
                  <li>
                    <Link to="#">Warranty & Lifetime Service</Link>
                  </li>
                  <li>
                    <Link to="#">Jewelry Care Instruction</Link>
                  </li>
                  <li>
                    <Link to="/faq">FAQ</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-6 col-xxs-12">
              <div className="fz-footer-widget">
                <h5 className="fz-footer-widget__title">Quick Link</h5>
                <ul>
                  <li>
                    <Link to="/about">Our Story</Link>
                  </li>
                  <li>
                    <Link to="/blog">Blog & Press</Link>
                  </li>
                  <li>
                    <Link to="#">Order History</Link>
                  </li>
                  <li>
                    <Link to="#">Wish List</Link>
                  </li>
                  <li>
                    <Link to="#">Terms & Conditions</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-3 col-lg-5 col-md-8">
              <div className="fz-footer-widget">
                <h5 className="fz-footer-widget__title">News Letter</h5>
                <div className="fz-footer-subscribe">
                  <p className="fz-footer-subscribe-txt">
                    Sign up to get the latest on sales, new releases, store
                    events and more.
                  </p>

                  <div className="fz-footer-subscribe-form">
                    <div className="fz-footer-subscribe-form-input">
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
                    <button className="fz-footer-subs-btn">
                      subscribe <i className="fa-light fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fz-footer-bottom">
        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-lg-6">
              <p className="fz-copyright">
                &copy;
                {currentYear} Design & Developed by <b>CodeBasket</b>
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

export default FooterSection2;
