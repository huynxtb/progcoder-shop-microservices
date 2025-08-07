import React from "react";
import { Link } from "react-router-dom";

const FooterSection5 = () => {
  return (
    <footer className="fz-6-footer">
      <div className="fz-6-footer-header">
        <div className="container">
          <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between">
            <Link href="/">
              <img src="assets/images/logo-6-dark.png" alt="logo" />
            </Link>

            <div className="fz-3-footer-socials">
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

      <div className="fz-6-footer-top">
        <div className="container">
          <div className="row gy-5 justify-content-center justify-content-xxl-between">
            <div className="col-lg-3 col-md-4 col-6 col-xxs-12">
              <div className="fz-3-footer-widget">
                <h5 className="fz-3-footer-widget__title">Products</h5>

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

            <div className="col-lg-3 col-md-4 col-6 col-xxs-12">
              <div className="fz-3-footer-widget">
                <h5 className="fz-3-footer-widget__title">Customer Service</h5>
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

            <div className="col-lg-3 col-md-4 col-6 col-xxs-12">
              <div className="fz-3-footer-widget">
                <h5 className="fz-3-footer-widget__title">Quick Links</h5>
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

            <div className="col-lg-3 col-md-4 col-6 col-xxs-12">
              <div className="fz-3-footer-widget fz-6-footer-contacts">
                <h5 className="fz-3-footer-widget__title">Contact us</h5>

                <ul>
                  <li>
                    <a href="#">
                      <i className="fa-light fa-phone"></i> (907) 225-4144
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-light fa-envelope"></i> Farzaa@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-light fa-location-dot"></i> 16 Rr 2,
                      Ketchikan, Alaska 99901, USA
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fz-6-footer-bottom">
        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-lg-6">
              <p className="fz-3-copyright text-center text-lg-start">
                &copy;
                {new Date().getFullYear()} Design & Developed by{" "}
                <b>CodeBasket</b>
              </p>
            </div>

            <div className="col-lg-6 text-lg-end text-center text-lg-end">
              <img
                src="assets/images/card.png"
                alt="Pyament Methods"
                className="fz-3-payment-methods"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection5;
