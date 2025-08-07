import React from 'react'
import { Link } from 'react-router-dom'

const CategorySection2 = () => {
  return (
    <section className="fz-2-category-section">
            <div className="container">
                <div className="fz-2-section-heading">
                    <div className="row gy-4 justify-content-between align-items-center">
                        <div className="col-lg-5 col-md-6">
                            <h2 className="fz-section-title">Shop by <br/> <span>Categories</span></h2>
                        </div>

                        <div className="col-lg-5 col-md-6">
                            <p className="fz-section-heading-description">Our pieces take some time to get from the jewelry bench to your doorstep. Here's what you need to know about our holiday </p>
                        </div>
                    </div>
                </div>

                <div className="row gy-4 g-2 g-sm-4 justify-content-center">
                    <div className="col-4">
                        <div className="fz-single-category">
                            <div className="fz-single-category__img">
                                <img src="assets/images/fz-2-cat-1.png" alt="category image"/>
                                <div className="fz-overlay"></div>
                                <Link to="/shop" className="fz-def-btn">
                                    <span></span>
                                    Shop Now
                                    <i className="fa-light fa-arrow-up-right"></i>
                                </Link>
                            </div>

                            <div className="fz-single-category__txt">
                                <h5><Link to="/shop">Necklaces <span className="fz-category-amount">(24)</span></Link></h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-4">
                        <div className="fz-single-category second-category d-flex flex-column-reverse justify-content-between">
                            <div className="fz-single-category__img">
                                <img src="assets/images/fz-2-cat-2.png" alt="category image"/>
                                <div className="fz-overlay"></div>
                                <Link to="/shop" className="fz-def-btn">
                                    <span></span>
                                    Shop Now
                                    <i className="fa-light fa-arrow-up-right"></i>
                                </Link>
                            </div>

                            <div className="fz-single-category__txt">
                                <h5><Link to="/shop">rings <span className="fz-category-amount">(20)</span></Link></h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-4">
                        <div className="fz-single-category">
                            <div className="fz-single-category__img">
                                <img src="assets/images/fz-2-cat-3.png" alt="category image"/>
                                <div className="fz-overlay"></div>
                                <Link to="/shop" className="fz-def-btn">
                                    <span></span>
                                    Shop Now
                                    <i className="fa-light fa-arrow-up-right"></i>
                                </Link>
                            </div>

                            <div className="fz-single-category__txt">
                                <h5>
                                    <Link to="/shop">Bracelets <span className="fz-category-amount">(30)</span></Link>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default CategorySection2