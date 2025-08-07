import React from "react";

const BagBlogSection = () => {
  return (
    <section className="fz-10-blog-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h2 className="fz-10-section-title">Our Blog Post</h2>
            <p className="fz-10-section-descr">
              Quis auctor elit sed vulputate mi sit amet mauris. Eu turpis
              egestas pretium aenean pharetra magna.
            </p>
          </div>
        </div>
        <div className="row gx-4 gx-xl-5">
          <div className="col-md-12 col-lg-6">
            <div className="single-blog">
              <div className="fz-10-blog-iamge">
                <img src="assets/images/fz-10-blog-1.png" alt="blog image" />
              </div>
              <div className="blog-content">
                <a href="#">
                  <h4>
                    Why are Versace Jeans Couture bags so popular? | MyBag's
                    Complete Guide
                  </h4>
                </a>
                <a href="#" className="fz-10-blog-btn">
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-6">
            <div className="single-blog">
              <div className="fz-10-blog-iamge">
                <img src="assets/images/fz-10-blog-2.png" alt="blog image" />
              </div>
              <div className="blog-content">
                <a href="#">
                  <h4>
                    Why are Versace Jeans Couture bags so popular? | MyBag's
                    Complete Guide
                  </h4>
                </a>
                <a href="#" className="fz-10-blog-btn">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BagBlogSection;
