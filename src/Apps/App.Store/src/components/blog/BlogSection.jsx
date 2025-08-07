import React from 'react'
import { Link } from 'react-router-dom'

const BlogSection = () => {
  return (
    <section className="fz-1-blog-section">
        <div className="container">
            <div className="fz-1-section-heading">
                <h2 className="fz-section-title">Blog & Insights</h2>
            </div>

            <div className="fz-blogs">
                <div className="row">
                    <div className="col-md-6 col-xxs-12">
                        <div className="fz-single-blog fz-first-blog">
                            <div className="fz-single-blog__img">
                                <img src="assets/images/fz-3-blog-1.png" alt="Blog Image"/>
                                <div className="fz-single-blog__img-overlay"></div>

                                <div className="fz-single-blog__txt">
                                    <div className="fz-single-blog__infos">
                                        <span className="fz-blog-category"><Link to="/blog">classic Door</Link></span>
                                        <span className="fz-blog-date">17 January, 2023</span>
                                        <span className="fz-blog-length">7 Min</span>
                                    </div>
                                    <h3 className="fz-single-blog__title"><Link to="/blogDetails">Ultimate Guide to Buying a Custom Solid Wood Door</Link></h3>
                                    <p className="fz-single-blog__desc">In this Ultimate Guide to Buying a Custom Wood Door, we answer your questions
                                        about figuring out the size of the door you need, designing it how you like...</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-md-6 col-xxs-12 d-flex flex-column justify-content-between">
                        <div className="fz-single-blog">
                            <div className="fz-single-blog__img">
                                <img src="assets/images/fz-3-blog-2.png" alt="Blog Image"/>
                                <div className="fz-single-blog__img-overlay"></div>
                                <div className="fz-single-blog__txt">
                                    <div className="fz-single-blog__infos">
                                        <span className="fz-blog-category"><Link to="/blog">classic Door</Link></span>
                                        <span className="fz-blog-date">17 January, 2023</span>
                                        <span className="fz-blog-length">7 Min</span>
                                    </div>
                                    <h3 className="fz-single-blog__title"><Link to="/blogDetails">Ultimate Guide to Buying a Custom Wood Door</Link></h3>
                                </div>
                            </div>
                        </div>

                        <div className="fz-single-blog">
                            <div className="fz-single-blog__img">
                                <img src="assets/images/fz-3-blog-3.png" alt="Blog Image"/>
                                <div className="fz-single-blog__img-overlay"></div>
                                <div className="fz-single-blog__txt">
                                    <div className="fz-single-blog__infos">
                                        <span className="fz-blog-category"><Link to="/blog">classic Door</Link></span>
                                        <span className="fz-blog-date">17 January, 2023</span>
                                        <span className="fz-blog-length">7 Min</span>
                                    </div>
                                    <h3 className="fz-single-blog__title"><Link to="/blogDetails">Ultimate Guide to Buying a Custom Wood Door</Link></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default BlogSection