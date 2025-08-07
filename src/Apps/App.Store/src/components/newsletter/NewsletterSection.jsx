import React from "react";

const NewsletterSection = () => {
  return (
    <div className="container">
      <div className="fz-4-subs-section">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="fz-4-subs-section__txt text-center">
              <h2>Sign Up to our Newsletter</h2>
              <p>Exclusive discounts and promotions. Sign up today!</p>
            </div>
            <div className="fz-4-subs-section__form">
              <form action="#">
                <input
                  type="email"
                  name="subs-mail"
                  id="subs-mail-input"
                  placeholder="Enter your email address"
                />
                <button className="subs-form-btn">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
