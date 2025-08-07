import React from "react";
import { Link } from "react-router-dom";

const BlogSection2 = () => {
  return (
    <section className="fz-2-blog-section">
      <div className="container">
        <div className="fz-2-section-heading">
          <div className="row gy-4 align-items-center">
            <div className="col-sm-6 col-8 col-xxs-12">
              <h2 className="fz-section-title">Latest News</h2>
            </div>
            <div className="col-sm-6 col-4 col-xxs-12">
              <Link to="/blog">
                More News <i className="fa-regular fa-arrow-right-long"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="fz-blogs">
          <div className="row g-3 justify-content-center">
            <div className="col-lg-4 col-sm-6 col-8 col-xxs-12">
              <div className="fz-single-blog">
                <div className="fz-single-blog__img">
                  <img src="assets/images/blog-1.png" alt="Blog Image" />
                  <div className="fz-single-blog__img-overlay"></div>

                  <div className="fz-single-blog__txt">
                    <div className="fz-single-blog__infos">
                      <span className="fz-blog-category">jewelry</span>
                      <span className="fz-blog-date">11 Dec, 2022</span>
                    </div>
                    <h3 className="fz-single-blog__title">
                      <Link to="/blogDetails">
                        {" "}
                        All that Glitters is Not Gold: Silver and Engagement
                        Rings are Gaining{" "}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-8 col-xxs-12">
              <div className="fz-single-blog">
                <div className="fz-single-blog__img">
                  <img src="assets/images/blog-2.png" alt="Blog Image" />
                  <div className="fz-single-blog__img-overlay"></div>
                  <div className="fz-single-blog__txt">
                    <div className="fz-single-blog__infos">
                      <span className="fz-blog-category">ring</span>
                      <span className="fz-blog-date">11 Dec, 2022</span>
                    </div>
                    <h3 className="fz-single-blog__title">
                      <Link to="/blogDetails">
                        {" "}
                        All that Glitters is Not Gold: Silver and Engagement
                        Rings are Gaining{" "}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6 col-8 col-xxs-12">
              <div className="fz-single-blog">
                <div className="fz-single-blog__img">
                  <img src="assets/images/blog-3.png" alt="Blog Image" />
                  <div className="fz-single-blog__img-overlay"></div>
                  <div className="fz-single-blog__txt">
                    <div className="fz-single-blog__infos">
                      <span className="fz-blog-category">jewelry</span>
                      <span className="fz-blog-date">11 Dec, 2022</span>
                    </div>
                    <h3 className="fz-single-blog__title">
                      <Link to="/blogDetails">
                        {" "}
                        All that Glitters is Not Gold: Silver and Engagement
                        Rings are Gaining{" "}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection2;
