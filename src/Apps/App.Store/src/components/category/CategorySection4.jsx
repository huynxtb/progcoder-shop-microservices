import React from "react";
import { Link } from "react-router-dom";

const CategorySection4 = () => {
  return (
    <section className="fz-4-category-section pb-120">
      <div className="container">
        <div className="fz-4-section-heading">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <h2 className="fz-section-title text-center">
                Popular Categories
              </h2>
            </div>
          </div>
        </div>

        <div className="row g-xl-4 gy-4 gx-3 justify-content-center">
          <div className="col-lg-2 col-md-3 col-4 col-xxs-6">
            <div className="fz-4-single-category">
              <Link to="/shop" className="fz-4-single-category__img">
                <img src="assets/images/fz-cat-7.png" alt="Product Icon" />
              </Link>

              <div className="fz-4-single-category__txt">
                <Link to="/shop">Circuit Protection</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-4 col-xxs-6">
            <div className="fz-4-single-category">
              <Link to="/shop" className="fz-4-single-category__img">
                <img src="assets/images/fz-cat-8.png" alt="Product Icon" />
              </Link>

              <div className="fz-4-single-category__txt">
                <Link to="/shop">LED Bulbs</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-4 col-xxs-6">
            <div className="fz-4-single-category">
              <Link to="/shop" className="fz-4-single-category__img">
                <img src="assets/images/fz-cat-9.png" alt="Product Icon" />
              </Link>

              <div className="fz-4-single-category__txt">
                <Link to="/shop">Switches & Sockets</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-4 col-xxs-6">
            <div className="fz-4-single-category">
              <Link to="/shop" className="fz-4-single-category__img">
                <img src="assets/images/fz-cat-10.png" alt="Product Icon" />
              </Link>

              <div className="fz-4-single-category__txt">
                <Link to="/shop">Cables & Flex</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-4 col-xxs-6">
            <div className="fz-4-single-category">
              <Link to="/shop" className="fz-4-single-category__img">
                <img src="assets/images/fz-cat-11.png" alt="Product Icon" />
              </Link>

              <div className="fz-4-single-category__txt">
                <Link to="/shop">Switches & Sockets</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-4 col-xxs-6">
            <div className="fz-4-single-category">
              <Link to="/shop" className="fz-4-single-category__img">
                <img src="assets/images/fz-cat-12.png" alt="Product Icon" />
              </Link>

              <div className="fz-4-single-category__txt">
                <Link to="/shop">GU10 Downlights</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection4;
