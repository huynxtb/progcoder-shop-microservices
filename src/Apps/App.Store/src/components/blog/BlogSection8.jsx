import React from "react";
import { cycleBlogData } from "../../data/Data";
import { Link } from "react-router-dom";

const BlogSection8 = () => {
  return (
    <section className="fz-8-blogs py-120">
      <div className="container">
        <div className="fz-8-blogs-heading d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="fz-8-section-heading fz-7-section-heading">
            <h2 className="fz-8-section-title">Latest Blog Post</h2>
            <p className="fz-8-section-descr">
              Using test items of real content and data in designs will help but
              there's no guarantee that every oddity
            </p>
          </div>

          <Link to="/blog" className="fz-8-blogs-btn">
            View all Posts <i className="fa-regular fa-arrow-right-long"></i>
          </Link>
        </div>

        <div className="row g-4 justify-content-center">
          {cycleBlogData.map((item) => (
            <div className="col-lg-4 col-6 col-xxs-12" key={item.id}>
              <div className="fz-8-blog">
                <div className="fz-8-blog-img">
                  <img src={item.img} alt="Blog Image" />
                </div>
                <div className="fz-8-blog-txt">
                  <span className="fz-8-blog-category">
                    <Link to="/blog">{item.category}</Link>
                  </span>
                  <h4 className="fz-8-blog-title">
                    <Link to={`/${item.slug}`}>{item.title}</Link>
                  </h4>
                  <div className="fz-8-blog-infos">
                    <span className="fz-8-blog-info">{item.date}</span>
                    <span className="fz-8-blog-info">
                      {item.comments} comments
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection8;
