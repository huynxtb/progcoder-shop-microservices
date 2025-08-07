import React from "react";
import { Link } from "react-router-dom";

const CategorySection7 = () => {
  return (
    <section className="fz-8-categories py-120">
      <div className="container">
        <div className="fz-8-categories-heading">
          <div className="row gy-1 justify-content-between align-items-center">
            <div className="col-lg-5 col-md-6">
              <h2 className="fz-8-section-title fz-8-categories-title">
                Shop by <br /> <span>Category</span>
              </h2>
            </div>

            <div className="col-lg-5 col-md-6">
              <p className="fz-8-categories-descr">
                Our pieces take some time to get from the jewelry bench to your
                doorstep. Here's what you need to know about our holiday{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="row g-sm-0 g-3 justify-content-between">
          <div className="col-sm-5 col-6 col-xxs-12">
            <div className="fz-8-categories-col-left">
              <div className="fz-8-category">
                <div className="fz-8-category-img">
                  <img
                    src="assets/images/fz-8-cat-1.jpg"
                    alt="Category Image"
                  />
                </div>

                <div className="fz-8-category-txt">
                  <h3 className="fz-8-category-title">
                    <Link to="/shop">mountain bikes</Link>
                  </h3>
                </div>
              </div>

              <div className="fz-8-category fz-8-category-rounded">
                <div className="fz-8-category-img">
                  <img
                    src="assets/images/fz-8-cat-3.jpg"
                    alt="Category Image"
                  />
                </div>

                <div className="fz-8-category-txt">
                  <h3 className="fz-8-category-title">
                    <Link to="/shop">Folding bikes</Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6 col-xxs-12">
            <div className="fz-8-categories-col-right">
              <div className="row">
                <div className="col-sm-10 col-12">
                  <div className="fz-8-category fz-8-category-rounded">
                    <div className="fz-8-category-img">
                      <img
                        src="assets/images/fz-8-cat-2.jpg"
                        alt="Category Image"
                      />
                    </div>

                    <div className="fz-8-category-txt">
                      <h3 className="fz-8-category-title">
                        <Link to="/shop">Gravel Road bikes</Link>
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="fz-8-category">
                    <div className="fz-8-category-img">
                      <img
                        src="assets/images/fz-8-cat-4.jpg"
                        alt="Category Image"
                      />
                    </div>

                    <div className="fz-8-category-txt">
                      <h3 className="fz-8-category-title">
                        <Link to="/shop">Hybrid Road bikes</Link>
                      </h3>
                    </div>
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

export default CategorySection7;
