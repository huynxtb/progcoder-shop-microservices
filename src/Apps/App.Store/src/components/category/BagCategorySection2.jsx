import React from "react";

const BagCategorySection2 = () => {
  return (
    <section className="fz-12-categories py-120">
      <div className="container">
        <div className="fz-8-categories-heading">
          <div className="row gy-4 justify-content-between align-items-center">
            <div className="col-lg-5 col-md-6">
              <h2 className="fz-12-section-title">
                Shop by <br /> <span>Category</span>
              </h2>
            </div>

            <div className="col-lg-5 col-md-6">
              <p className="fz-12-categories-descr">
                Using test items of real content and data in thr designs will
                help but there's no guarantee that every oddity
              </p>
            </div>
          </div>
        </div>

        <div className="row g-lg-0 gx-sm-5 gx-4 justify-content-between">
          <div className="col-1 d-none d-lg-block"></div>
          <div className="col-lg-5 col-6 col-xxs-12">
            <div className="fz-12-categories-col-left">
              <div className="fz-12-category">
                <div className="fz-12-category-img">
                  <img
                    src="assets/images/fz-12-cat-1.png"
                    alt="Category Image"
                  />
                </div>
                <h3 className="fz-12-category-title">
                  <a href="shop-details.html">Tote Handbags</a>
                </h3>
              </div>

              <div className="fz-12-category fz-12-category-right">
                <div className="fz-12-category-img">
                  <img
                    src="assets/images/fz-12-cat-3.png"
                    alt="Category Image"
                  />
                </div>
                <h3 className="fz-12-category-title">
                  <a href="shop-details.html">Mini Handbags</a>
                </h3>
              </div>
            </div>
          </div>

          <div className="col-1 d-none d-lg-block"></div>

          <div className="col-lg-5 col-6 col-xxs-12">
            <div className="fz-12-categories-col-right">
              <div className="fz-12-category fz-12-category-right">
                <div className="fz-12-category-img">
                  <img
                    src="assets/images/fz-12-cat-2.png"
                    alt="Category Image"
                  />
                </div>
                <h3 className="fz-12-category-title">
                  <a href="shop-details.html">Hobo Handbags</a>
                </h3>
              </div>

              <div className="fz-12-category">
                <div className="fz-12-category-img">
                  <img
                    src="assets/images/fz-12-cat-4.png"
                    alt="Category Image"
                  />
                </div>
                <h3 className="fz-12-category-title">
                  <a href="shop-details.html">Duffel Handbags</a>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BagCategorySection2;
