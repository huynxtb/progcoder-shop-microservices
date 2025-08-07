import React from "react";

const FooterSection8 = () => {
  return (
    <footer
      class="fz-9-footer-section"
      style={{ backgroundImage: "url(assets/images/fz-9-footer-bg.jpg)" }}
    >
      <div class="fz-9-footer-top">
        <div class="container">
          <div class="row gy-5 justify-content-center justify-content-xxl-between">
            <div class="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-6 col-xxs-12">
              <div class="fz-9-footer-widget">
                <h5 class="fz-9-footer-widget__title">Links</h5>
                <ul>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Shop Cart</a>
                  </li>
                  <li>
                    <a href="#">Page</a>
                  </li>
                  <li>
                    <a href="#">Blog News</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-6 col-xxs-12">
              <div class="fz-9-footer-widget">
                <h5 class="fz-9-footer-widget__title">Products</h5>
                <ul>
                  <li>
                    <a href="#">Rompers</a>
                  </li>
                  <li>
                    <a href="#">Bodysuits </a>
                  </li>
                  <li>
                    <a href="#">Onesies</a>
                  </li>
                  <li>
                    <a href="#">Jumpsuits</a>
                  </li>
                  <li>
                    <a href="#">Snapsuits</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-6 col-xxs-12">
              <div class="fz-9-footer-widget">
                <h5 class="fz-9-footer-widget__title">Shop Info</h5>
                <ul>
                  <li>
                    <a href="#">All Categories</a>
                  </li>
                  <li>
                    <a href="#">About Shop</a>
                  </li>
                  <li>
                    <a href="#">New Products</a>
                  </li>
                  <li>
                    <a href="#">Discount Offer</a>
                  </li>
                  <li>
                    <a href="#">Summer Sale</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-6 col-xxs-12">
              <div class="fz-9-footer-widget">
                <h5 class="fz-9-footer-widget__title">Account Info</h5>
                <ul>
                  <li>
                    <a href="#">Sign In</a>
                  </li>
                  <li>
                    <a href="#">Shipping Address</a>
                  </li>
                  <li>
                    <a href="#">Wishlist</a>
                  </li>
                  <li>
                    <a href="#">Order History</a>
                  </li>
                  <li>
                    <a href="#">My Account</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-xxl-3 col-xl-5 col-lg-5 col-md-8 col-12">
              <div class="fz-9-footer-widget">
                <h5 class="fz-9-footer-widget__title">News Letter</h5>
                <div class="fz-9-footer-subscribe">
                  <div class="fz-9-footer-subscribe-form">
                    <div class="fz-9-footer-subscribe-form-input">
                      <input
                        type="email"
                        name="footer-subs-email"
                        id="fz-9-footer-subs-email"
                        placeholder="Email"
                      />
                    </div>
                    <button class="fz-9-footer-subs-btn">
                      subscribe <i class="fa-light fa-paper-plane"></i>
                    </button>
                  </div>
                  <div class="fz-9-footer-socials">
                    <a href="#">
                      <i class="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="#">
                      <i class="fa-brands fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i class="fa-brands fa-instagram"></i>
                    </a>
                    <a href="#">
                      <i class="fa-brands fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="fz-9-footer-bottom">
        <div class="container">
          <div class="row gy-4 align-items-center">
            <div class="col-lg-4 order-1 order-lg-0">
              <p class="fz-9-copyright">
                &copy;
                {new Date().getFullYear()} Design & Developed by{" "}
                <b>CodeBasket</b>
              </p>
            </div>
            <div class="col-lg-4 order-0 order-lg-1 text-center">
              <a href="#">
                <img src="assets/images/logo-9.png" alt="logo" />
              </a>
            </div>
            <div class="col-lg-4 text-lg-end text-center order-2">
              <img
                src="assets/images/card.png"
                alt="Pyament Methods"
                class="fz-9-payment-methods"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection8;
