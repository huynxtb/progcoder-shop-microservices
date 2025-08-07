import React from "react";
import { Link } from "react-router-dom";

const CtaSection4 = () => {
  return (
    <section className="fz-6-cta pb-120">
      <div className="container">
        <div className="row fz-6-cta-row align-items-center justify-content-center g-0">
          <div className="col-xl-6 col-lg-8">
            <div className="fz-6-brands">
              <div className="fz-6-products-heading d-flex align-items-center justify-content-between">
                <h2 className="fz-6-section-title">Shop By Brands</h2>
                <Link to="#" className="fz-6-brands-heading-btn">
                  View All Brand <i className="fa-light fa-arrow-right"></i>
                </Link>
              </div>

              <div className="row fz-6-brands-row">
                <div className="col-4">
                  <Link to="/shop">
                    <img
                      src="assets/images/fz-6-brand-1.jpg"
                      alt="Brand Logo"
                      className="fz-6-brand-logo"
                    />
                  </Link>
                </div>
                <div className="col-4">
                  <Link to="/shop">
                    <img
                      src="assets/images/fz-6-brand-2.jpg"
                      alt="Brand Logo"
                      className="fz-6-brand-logo"
                    />
                  </Link>
                </div>
                <div className="col-4">
                  <Link to="/shop">
                    <img
                      src="assets/images/fz-6-brand-3.jpg"
                      alt="Brand Logo"
                      className="fz-6-brand-logo"
                    />
                  </Link>
                </div>
                <div className="col-4">
                  <Link to="/shop">
                    <img
                      src="assets/images/fz-6-brand-4.jpg"
                      alt="Brand Logo"
                      className="fz-6-brand-logo"
                    />
                  </Link>
                </div>
                <div className="col-4">
                  <Link to="/shop">
                    <img
                      src="assets/images/fz-6-brand-5.jpg"
                      alt="Brand Logo"
                      className="fz-6-brand-logo"
                    />
                  </Link>
                </div>
                <div className="col-4">
                  <Link to="/shop">
                    <img
                      src="assets/images/fz-6-brand-6.jpg"
                      alt="Brand Logo"
                      className="fz-6-brand-logo"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-lg-8">
            <div className="fz-6-subs">
              <h2 className="fz-6-section-title">Sign Up For Farzaa Emails</h2>
              <p className="fz-6-subs-descr">
                It only takes a second to be the first to find out about our
                latest news and promotions...
              </p>
              <form action="#" className="fz-6-subs-form">
                <input
                  type="email"
                  name="email"
                  id="fz-6-subs-mail"
                  placeholder="Email adress..."
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection4;
