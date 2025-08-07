import React from 'react'
import CommentFormSection from '../forms/CommentFormSection'
import BlogTagFilter from './BlogTagFilter'
import BlogCategoryFilter from './BlogCategoryFilter'
import RecentBlogSection from './RecentBlogSection'
import SearchFilter from './SearchFilter'
import { Link } from 'react-router-dom'

const BlogDetailSection = () => {
  return (
    <div className="container">
        <main className="blog-page-content">
            <div className="blogs-container fz-blog-details-container">
                <div className="blogs">
                    <div className="fz-single-blog fz-inner-page-blog fz-blog-details">
                        <div className="fz-single-blog__img fz-blog-details__img">
                            <img src="assets/images/blogs-blog-1.png" alt="Blog Banner"/>

                            <div className="fz-blog-details__heading">
                                <h3 className="fz-single-blog__title fz-blog-details__title">An electronic product is a device that uses electricity to perform a function</h3>

                                <div className="fz-single-blog__infos fz-blog-details__infos">
                                    <span className="fz-single-blog__category fz-blog-details__category"><Link to="#">Electronic</Link></span>
                                    <span className="fz-single-blog__date fz-blog-details__date">June 21, 2023</span>
                                </div>
                            </div>
                        </div>

                        <div className="fz-single-blog__txt fz-blog-details__txt">
                            <p className="fz-single-blog__desc fz-blog-details__descr">
                                As the year winds down and comes to an end; many take some time to reflect on what’s happened over the past 11—12 months or so in your work. Self-reflection and asking questions about the things that make you happy, and perhaps, not so happy, are part and parcel of the festive season, as a new year comes into sight. Tes, it’s all gone so fast again. Do you have job satisfaction? If not, now’s the time to address this issue.It’s no secret that the previous two years have been challenging for all in different ways; however, a common theme has been a shift in the way individuals want to work, and how businesses can ensure the well-being of their staff. Career and job happiness have either thrived for people or quite the opposite.
                            </p>

                            <blockquote className="fz-blog-details__blqt">
                                <i className="fa-solid fa-quote-right"></i>
                                <p>Think about the last time you tried a new restaurant. Or bought a vacuum. You probably looked for reviews online first, right? When considering a purchase, people want first-hand perspectives from other people just like them. While a famous influencer might catch their attention, experiences.</p>
                                <h5 className="quoter">Jane lam</h5>
                            </blockquote>

                            <p className="fz-single-blog__desc fz-blog-details__descr">
                                As the year winds down and comes to an end; many take some time to reflect on what’s happened over the past 11—12 months or so in your work. Self-reflection and asking questions about the things that make you happy, and perhaps, not so happy, are part and parcel of the festive season, as a new year comes into sight. Tes, it’s all gone so fast again. Do you have job satisfaction? If not, now’s the time to address this issue.
                            </p>
                            <p className="fz-single-blog__desc fz-blog-details__descr">
                                As the year winds down and comes to an end; many take some time to reflect on what’s happened over the past 11—12 months or so in your work. Self-reflection and asking questions about the things that make you happy, and perhaps, not so happy, are part and parcel of the festive season, as a new year comes into sight. Tes, it’s all gone so fast again. Do you have job satisfaction? If not, now’s the time to address this issue.
                            </p>
                            <img src="assets/images/blog-details-image.png" alt="Blog Image"/>
                            <p className="fz-single-blog__desc fz-blog-details__descr">
                                As the year winds down and comes to an end; many take some time to reflect on what’s happened over the past 11—12 months or so in your work. Self-reflection and asking questions about the things that make you happy, and perhaps, not so happy, are part and parcel of the festive season, as a new year comes into sight. Tes, it’s all gone so fast again. Do you have job satisfaction? If not, now’s the time to address this issue.
                            </p>
                        </div>
                    </div>

                    <div className="fz-blog-details__tags-n-shares d-flex align-items-center justify-content-between">
                        <div className="fz-blog-details__tags">
                            <span>Tags:</span>
                            <Link to="/blog">Men</Link>
                            <Link to="/blog">Sales</Link>
                            <Link to="/blog">Electronic</Link>
                            <Link to="/blog">Marketings </Link>
                        </div>

                        <div className="fz-blog-details__shares">
                            <span>Share:</span>
                            <button className="share-option"><i className="fa-brands fa-facebook-f"></i></button>
                            <button className="share-option"><i className="fa-brands fa-twitter"></i></button>
                            <button className="share-option"><i className="fa-brands fa-instagram"></i></button>
                            <button className="share-option"><i className="fa-brands fa-youtube"></i></button>
                            <button className="share-option"><i className="fa-brands fa-tiktok"></i></button>
                        </div>
                    </div>
                </div>

                <div className="fz-blog-details__comments-area">
                    <div className="fz-blog-details__user-comments fz-product-details">
                        <h4 className="fz-blog-details__comments-title">Comments <span className="comment-amount">(01)</span></h4>
                        <div className="single-review single-comment">
                            <div className="user">
                                <div className="user-img">
                                    <img src="assets/images/user-4.png" alt="user"/>
                                </div>
                                <div className="user-info">
                                    <h6 className="user-name">Abu Amer</h6>
                                    <span className="comment-date">May 9, 2023</span>
                                </div>
                            </div>

                            <div className="review">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit voluptatum quaerat nemo eaque delectus ratione maiores expedita pariatur illum facilis at repellendus nesciunt veniam animi, omnis corrupti reiciendis explicabo itaque id. Maxime consequatur recusandae fugiat accusamus ipsam reiciendis, officiis esse assumenda voluptas aspernatur consequuntur? Eaque sed quibusdam ipsum saepe nulla!
                                </p>
                            </div>

                            <button type="button" className="reply-btn">Reply <i className="fa-light fa-reply"></i></button>
                        </div>
                    </div>

                    <div className="fz-blog-details__comment-form">
                        <h4 className="fz-comment-form__title">Leave a Reply</h4>
                        <CommentFormSection/>
                    </div>
                </div>
            </div>

            <aside className="fz-sidebar blog-page-sidebar">
                <SearchFilter/>

                <RecentBlogSection/>

                <BlogCategoryFilter/>

                <BlogTagFilter/>
            </aside>
        </main>
    </div>
  )
}

export default BlogDetailSection