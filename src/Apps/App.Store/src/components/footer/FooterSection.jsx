import React from "react";
import { Link } from "react-router-dom";

const FooterSection = ({ logo }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="fz-footer-section fz-1-footer-section">
      <div className="fz-footer-top">
        <div className="container">
          <div className="row gy-md-5 gy-4 justify-content-center justify-content-lg-between">
            <div className="col-xxl-4 col-lg-12 col-md-8">
              <div className="fz-footer-about fz-footer-widget">
                <div className="fz-logo fz-footer-widget__title">
                  <Link to="/">
                    <img src={logo} alt="logo" />
                  </Link>
                </div>
                <p className="fz-footer-about__txt">
                  There Are Many Different Styles Of Including Aviator,
                  Wayfarer, Cat-Eye, Round, Some Sunglasses Also Have Polarized
                  Lenses
                </p>
                <img
                  src="assets/images/card.png"
                  alt="Pyament Methods"
                  className="fz-payment-methods"
                />
              </div>
            </div>

            <div className="col-xxl-2 col-lg-3 col-md-4 col-6 col-xxs-12">
              <div className="fz-footer-widget">
                <h5 className="fz-footer-widget__title">Ways to Shop</h5>
                <ul>
                  <li>
                    <Link to="#">Shop on Facebook</Link>
                  </li>
                  <li>
                    <Link to="#">Shop on Ebay</Link>
                  </li>
                  <li>
                    <Link to="/shop">Shop by Category</Link>
                  </li>
                  <li>
                    <Link to="/shop">Shop All</Link>
                  </li>
                  <li>
                    <Link to="#">Coupons and Discounts</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xxl-2 col-lg-3 col-md-4 col-6 col-xxs-12">
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
                </ul>
              </div>
            </div>

            <div className="col-xxl-2 col-lg-3 col-md-4 col-6 col-xxs-12">
              <div className="fz-footer-widget">
                <h5 className="fz-footer-widget__title">Quick Links</h5>
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

            <div className="col-xxl-2 col-lg-3 col-md-4 col-6 col-xxs-12">
              <div className="fz-footer__contact-info">
                <h5 className="fz-footer-widget__title">Store Address</h5>
                <ul>
                  <li>
                    <Link to="#">
                      <i className="fa-light fa-location-dot"></i> 16 Rr 2,
                      Ketchikan, Alaska 99901, USA
                    </Link>
                  </li>
                  <li>
                    <Link to="tel:9072254144">
                      <i className="fa-light fa-phone"></i> (907) 225-4144
                    </Link>
                  </li>
                  <li>
                    <Link to="mailto:info@webmail.com">
                      <i className="fa-light fa-envelope-open-text"></i>
                      info@webmail.com
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fz-footer-bottom">
        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-md-6 col-12">
              <p className="fz-copyright">
                &copy;
                {currentYear} Design & Developed by <b>CodeBasket</b>
              </p>
            </div>

            <div className="col-md-6 col-12">
              <div className="fz-footer-socials">
                <ul>
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
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
