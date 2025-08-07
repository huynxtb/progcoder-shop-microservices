import React from "react";
import { Link } from "react-router-dom";

const BlogSection5 = () => {
  return (
    <section className="fz-5-blog-section pt-120">
      <div className="container">
        <div className="fz-5-section-heading fz-5-section-heading-2">
          <div className="row justify-content-center">
            <div className="col-sm-6">
              <div className="section-heading__txt text-center">
                <h2 className="fz-section-title">Our style blog</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-4 justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-10">
            <div className="fz-5-blog-card">
              <div className="fz-5-blog-card-img">
                <img src="assets/images/fz-5-blog-1.png" alt="image" />
              </div>
              <div className="fz-5-blog-card-txt">
                <h3 className="fz-5-blog-card-title">
                  <Link to="/blogDetails">
                    Barton Perreira x Kelley Baker: Collaboration For Supporting
                    Women Entrepreneurs
                  </Link>
                </h3>
                <p>
                  Choose a Frame. Select a glasses frame, and add it to your
                  shopping we will answer the phone cart...
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-10">
            <div className="fz-5-blog-card">
              <div className="fz-5-blog-card-img">
                <img src="assets/images/fz-5-blog-2.png" alt="image" />
              </div>
              <div className="fz-5-blog-card-txt">
                <h3 className="fz-5-blog-card-title">
                  <Link to="/blogDetails">
                    Barton Perreira x Kelley Baker: Collaboration For Supporting
                    Women Entrepreneurs
                  </Link>
                </h3>
                <p>
                  Choose a Frame. Select a glasses frame, and add it to your
                  shopping we will answer the phone cart...
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-10">
            <div className="fz-5-blog-card">
              <div className="fz-5-blog-card-img">
                <img src="assets/images/fz-5-blog-3.png" alt="image" />
              </div>
              <div className="fz-5-blog-card-txt">
                <h3 className="fz-5-blog-card-title">
                  <Link to="/blogDetails">
                    Barton Perreira x Kelley Baker: Collaboration For Supporting
                    Women Entrepreneurs
                  </Link>
                </h3>
                <p>
                  Choose a Frame. Select a glasses frame, and add it to your
                  shopping we will answer the phone cart...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection5;
