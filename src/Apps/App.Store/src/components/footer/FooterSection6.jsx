import React from "react";
import { Link } from "react-router-dom";

const FooterSection6 = () => {
  return (
    <footer className="fz-6-footer fz-7-footer">
      <div className="fz-6-footer-header fz-7-footer-header">
        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-lg-4 col-sm-6 order-1 order-lg-0">
              <div className="fz-3-footer-socials fz-7-footer-socials">
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

            <div className="col-lg-4 order-0 order-lg-1 text-center">
              <Link to="/">
                <img src="assets/images/logo-7-dark.png" alt="logo" />
              </Link>
            </div>

            <div className="col-lg-4 col-sm-6 order-2 text-end">
              <img
                src="assets/images/card.png"
                alt="Pyament Methods"
                className="fz-3-payment-methods"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="fz-6-footer-top fz-7-footer-top">
        <div className="container">
          <div className="row gy-5 justify-content-center justify-content-xxl-between">
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
          </div>
        </div>
      </div>

      <div className="fz-6-footer-bottom fz-7-footer-bottom">
        <div className="container">
          <div className="text-center">
            <p className="fz-3-copyright">
              &copy;
              {new Date().getFullYear()} Design & Developed by <b>CodeBasket</b>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection6;
