import React from 'react'
import { Link } from 'react-router-dom'

const CategorySection = () => {
  return (
    <section className="fz-1-category-section">
        <div className="container">
            <div className="fz-1-section-heading">
                <h2 className="fz-section-title">Shop By Category</h2>
            </div>

            <div className="row g-md-4 g-3 justify-content-center align-items-center align-items-xl-stretch">
                <div className="col-xl-3 col-lg-4 col-8 col-xxs-12 fz-1-category-col">
                    <Link to="/shop" className="fz-1-single-category">
                        <img src="assets/images/fz-3-cat-1.png" alt="Product Icon"/>
                        <h5 className="fz-1-single-category__title">Wood Door (321)</h5>
                    </Link>

                    <Link to="/shop" className="fz-1-single-category">
                        <img src="assets/images/fz-3-cat-2.png" alt="Product Icon"/>
                        <h5 className="fz-1-single-category__title">Fiberglass Door (154)</h5>
                    </Link>
                </div>

                <div className="col-xl-6 col-4 col-xxs-12">
                    <Link to="/shop" className="fz-1-single-category">
                        <img src="assets/images/fz-3-cat-3.png" alt="Product Icon"/>
                        <h5 className="fz-1-single-category__title">Timber Doors (48)</h5>
                    </Link>
                </div>

                <div className="col-xl-3 col-lg-4 col-8 col-xxs-12 fz-1-category-col">
                    <Link to="/shop" className="fz-1-single-category">
                        <img src="assets/images/fz-3-cat-4.png" alt="Product Icon"/>
                        <h5 className="fz-1-single-category__title">Solid Core Door (54)</h5>
                    </Link>

                    <Link to="/shop" className="fz-1-single-category">
                        <img src="assets/images/fz-3-cat-5.png" alt="Product Icon"/>
                        <h5 className="fz-1-single-category__title">Hollow Core Door (54)</h5>
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CategorySection