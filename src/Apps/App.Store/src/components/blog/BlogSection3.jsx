import React from "react";
import { Link } from "react-router-dom";

const BlogSection3 = () => {
  return (
    <section className="fz-3-blog-section">
      <div className="container">
        <div className="fz-3-section-heading">
          <h2 className="fz-section-title">News Feed</h2>
          <p className="fz-section-sub-title">
            True Pound Cake is a recipe that dates
          </p>
        </div>

        <div className="fz-3-blogs">
          <div className="row gy-4 gx-4 gx-xl-5 justify-content-center">
            <div className="col-md-4 col-6 col-xxs-12">
              <div className="fz-3-single-blog">
                <div className="fz-3-single-blog__img">
                  <img src="assets/images/fz-blog-1.png" alt="Blog Image" />
                </div>

                <div className="fz-3-single-blog__txt">
                  <h3 className="fz-3-single-blog__title">
                    <Link to="/blogDetails">
                      Banana Cake with Brown Butter Cream Cheese Frosting
                    </Link>
                  </h3>
                  <div className="fz-3-single-blog__category-and-actions">
                    <span className="fz-3-single-blog__category">
                      <Link to="/blog">Cake Shop</Link>
                    </span>
                    <Link to="/blogDetails" className="fz-3-single-blog__btn">
                      Read More <i className="fa-regular fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-6 col-xxs-12">
              <div className="fz-3-single-blog">
                <div className="fz-3-single-blog__img">
                  <img src="assets/images/fz-blog-2.png" alt="Blog Image" />
                </div>

                <div className="fz-3-single-blog__txt">
                  <h3 className="fz-3-single-blog__title">
                    <Link to="/blogDetails">
                      Flourless Chocolate Cake With Mocha Whipped Cream
                    </Link>
                  </h3>
                  <div className="fz-3-single-blog__category-and-actions">
                    <span className="fz-3-single-blog__category">
                      <Link to="/blog">Cake Shop</Link>
                    </span>
                    <Link to="/blogDetails" className="fz-3-single-blog__btn">
                      Read More <i className="fa-regular fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-6 col-xxs-12">
              <div className="fz-3-single-blog">
                <div className="fz-3-single-blog__img">
                  <img src="assets/images/fz-blog-3.png" alt="Blog Image" />
                </div>

                <div className="fz-3-single-blog__txt">
                  <h3 className="fz-3-single-blog__title">
                    <Link to="/blogDetails">
                      Vanilla Sheet Cake with Whipped Buttercream Frosting
                    </Link>
                  </h3>
                  <div className="fz-3-single-blog__category-and-actions">
                    <span className="fz-3-single-blog__category">
                      <Link to="/blog">Cake Shop</Link>
                    </span>
                    <Link to="/blogDetails" className="fz-3-single-blog__btn">
                      Read More <i className="fa-regular fa-arrow-right"></i>
                    </Link>
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

export default BlogSection3;
