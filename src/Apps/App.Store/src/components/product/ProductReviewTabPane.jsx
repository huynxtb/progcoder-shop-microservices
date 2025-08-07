import React from 'react'

const ProductReviewTabPane = () => {
  return (
    <div className="fz-product-details__review">
        <div className="review-overview">
            <div className="average-rating-area">
                <h3><span>4.3</span><span>/5</span></h3>
                <span className="rating-amount">24 ratings</span>
            </div>

            <div className="review-breakdown">
                <ul className="individual-star-breakdown">
                    <li className="star">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                    </li>
                    <li>
                        <div className="bar">
                            <div className="filled"></div>
                        </div>
                    </li>
                    <li>
                        <div className="each-star-amount">320</div>
                    </li>
                </ul>

                <ul className="individual-star-breakdown individual-star-breakdown-2">
                    <li className="star">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-light fa-star"></i>
                    </li>
                    <li>
                        <div className="bar">
                            <div className="filled"></div>
                        </div>
                    </li>
                    <li>
                        <div className="each-star-amount">250</div>
                    </li>
                </ul>

                <ul className="individual-star-breakdown individual-star-breakdown-3">
                    <li className="star">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-light fa-star"></i>
                        <i className="fa-light fa-star"></i>
                    </li>
                    <li>
                        <div className="bar">
                            <div className="filled"></div>
                        </div>
                    </li>
                    <li>
                        <div className="each-star-amount">140</div>
                    </li>
                </ul>

                <ul className="individual-star-breakdown individual-star-breakdown-4">
                    <li className="star">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-light fa-star"></i>
                        <i className="fa-light fa-star"></i>
                        <i className="fa-light fa-star"></i>
                    </li>
                    <li>
                        <div className="bar">
                            <div className="filled"></div>
                        </div>
                    </li>
                    <li>
                        <div className="each-star-amount">83</div>
                    </li>
                </ul>

                <ul className="individual-star-breakdown individual-star-breakdown-5">
                    <li className="star">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-light fa-star"></i>
                        <i className="fa-light fa-star"></i>
                        <i className="fa-light fa-star"></i>
                        <i className="fa-light fa-star"></i>
                    </li>
                    <li>
                        <div className="bar">
                            <div className="filled"></div>
                        </div>
                    </li>
                    <li>
                        <div className="each-star-amount">11</div>
                    </li>
                </ul>
            </div>
        </div>
        <div className="user-reviews">
            <h4 className="reviews-title">Reviews of this product</h4>
            <div className="row g-4">
                <div className="col-xl-6">
                    <div className="single-review">
                        <div className="user">
                            <div className="user-img">
                                <img src="assets/images/user-1.png" alt="user"/>
                            </div>
                            <div className="user-info">
                                <h6 className="user-name">Eliza nolan</h6>
                                <div className="user-rating">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-light fa-star"></i>
                                </div>
                            </div>
                        </div>

                        <div className="review">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptatum quaerat nemo eaque delectus ratione maiores expedita pariatur illum facilis at repellendus nesciunt veniam animi, omnis corrupti reiciendis explicabo itaque id. Maxime consequatur recusandae fugiat accusamus ipsam reiciendis, officiis esse assumenda voluptas aspernatur consequuntur? Eaque sed quibusdam ipsum saepe nulla!
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="single-review">
                        <div className="user">
                            <div className="user-img">
                                <img src="assets/images/user-2.png" alt="user"/>
                            </div>
                            <div className="user-info">
                                <h6 className="user-name">Abu Amer</h6>
                                <div className="user-rating">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-light fa-star"></i>
                                    <i className="fa-light fa-star"></i>
                                </div>
                            </div>
                        </div>

                        <div className="review">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptatum quaerat nemo eaque delectus ratione maiores expedita pariatur illum facilis at repellendus nesciunt veniam animi, omnis corrupti reiciendis explicabo itaque id. Maxime consequatur recusandae fugiat accusamus ipsam reiciendis, officiis esse assumenda voluptas aspernatur consequuntur? Eaque sed quibusdam ipsum saepe nulla!
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="single-review">
                        <div className="user">
                            <div className="user-img">
                                <img src="assets/images/user-3.png" alt="user"/>
                            </div>
                            <div className="user-info">
                                <h6 className="user-name">Brunt glenn</h6>
                                <div className="user-rating">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </div>
                            </div>
                        </div>

                        <div className="review">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptatum quaerat nemo eaque delectus ratione maiores expedita pariatur illum facilis at repellendus nesciunt veniam animi, omnis corrupti reiciendis explicabo itaque id. Maxime consequatur recusandae fugiat accusamus ipsam reiciendis, officiis esse assumenda voluptas aspernatur consequuntur? Eaque sed quibusdam ipsum saepe nulla!
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="single-review">
                        <div className="user">
                            <div className="user-img">
                                <img src="assets/images/user-4.png" alt="user"/>
                            </div>
                            <div className="user-info">
                                <h6 className="user-name">chad hossain</h6>
                                <div className="user-rating">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-light fa-star"></i>
                                </div>
                            </div>
                        </div>

                        <div className="review">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptatum quaerat nemo eaque delectus ratione maiores expedita pariatur illum facilis at repellendus nesciunt veniam animi, omnis corrupti reiciendis explicabo itaque id. Maxime consequatur recusandae fugiat accusamus ipsam reiciendis, officiis esse assumenda voluptas aspernatur consequuntur? Eaque sed quibusdam ipsum saepe nulla!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductReviewTabPane