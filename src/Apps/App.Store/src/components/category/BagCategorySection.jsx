import React from "react";

const BagCategorySection = () => {
  return (
    <section className="fz-10-category-section container px-0">
      <div className="container">
        <div className="row fz-10-category-row">
          <div className="col-lg-3 col-6 col-xxs-12">
            <div className="single-category-area">
              <div className="single-categories-image">
                <img src="assets/images/categories-10-1.png" alt="categories" />
              </div>
              <div className="single-categories-content">
                <span></span>
                <h3>Duffel Bags</h3>
                <p>25 products</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-6 col-xxs-12">
            <div className="single-category-area flex-xxs-column-reverse">
              <div className="single-categories-content">
                <h3>Wheeled Backpack</h3>
                <p>12 products</p>
                <span></span>
              </div>

              <div className="single-categories-image">
                <img src="assets/images/categories-10-2.png" alt="categories" />
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-6 col-xxs-12">
            <div className="single-category-area">
              <div className="single-categories-image">
                <img src="assets/images/categories-10-3.png" alt="categories" />
              </div>

              <div className="single-categories-content">
                <span></span>
                <h3>Weekender Bags</h3>
                <p>05 products</p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-6 col-xxs-12">
            <div className="single-category-area flex-xxs-column-reverse">
              <div className="single-categories-content">
                <h3>Travel Pack</h3>
                <p>07 products</p>
                <span></span>
              </div>

              <div className="single-categories-image">
                <img src="assets/images/categories-10-4.png" alt="categories" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BagCategorySection;
