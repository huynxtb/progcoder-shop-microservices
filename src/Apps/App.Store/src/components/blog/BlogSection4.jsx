import React from "react";
import { Link } from "react-router-dom";

const BlogSection4 = () => {
  return (
    <section className="fz-4-blog-section pt-60">
      <div className="container">
        <div className="row g-4 justify-content-center">
          <div className="col-lg-4 col-md-8 col-sm-10">
            <div className="fz-4-section-heading mb-0">
              <div className="section-heading__txt text-lg-start text-center">
                <h2 className="fz-section-title mb-2">Trusted Brands</h2>
                <p className="mb-3">
                  The benefit of an electric eCommerce shop is that it provides
                  customers with a convenient
                </p>
                <Link to="/blog" className="fz-4-def-btn">
                  Read More
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-10">
            <div className="fz-4-blog-card">
              <div className="fz-4-blog-card-img">
                <img src="assets/images/fz-4-blog-1.png" alt="image" />
              </div>
              <div className="fz-4-blog-card-txt">
                <ul className="fz-4-blog-card-info">
                  <li>
                    <span>
                      <i className="fa-regular fa-user"></i>
                    </span>{" "}
                    Author
                  </li>
                  <li>
                    <span>
                      <i className="fa-regular fa-folder-open"></i>
                    </span>{" "}
                    Electric
                  </li>
                  <li>
                    <span>
                      <i className="fa-regular fa-calendar"></i>
                    </span>{" "}
                    01 March, 2023
                  </li>
                </ul>
                <h3 className="fz-4-blog-card-title">
                  <Link to="/blogDetails">
                    The Environmental Impact of Electric Vehicles: A Closer Look
                  </Link>
                </h3>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-10">
            <div className="fz-4-blog-card">
              <div className="fz-4-blog-card-img">
                <img src="assets/images/fz-4-blog-2.png" alt="image" />
              </div>
              <div className="fz-4-blog-card-txt">
                <ul className="fz-4-blog-card-info">
                  <li>
                    <span>
                      <i className="fa-regular fa-user"></i>
                    </span>{" "}
                    Author
                  </li>
                  <li>
                    <span>
                      <i className="fa-regular fa-folder-open"></i>
                    </span>{" "}
                    Electric
                  </li>
                  <li>
                    <span>
                      <i className="fa-regular fa-calendar"></i>
                    </span>{" "}
                    01 March, 2023
                  </li>
                </ul>
                <h3 className="fz-4-blog-card-title">
                  <Link to="/blogDetails">
                    The Environmental Impact of Electric Vehicles: A Closer Look
                  </Link>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection4;
