import React from 'react'
import { blogList } from '../../data/Data'
import { Link } from 'react-router-dom'

const RecentBlogSection = () => {
  return (
    <section className="sidebar-single-area blog-area">
        <h3 className="sidebar-single-area__title">Recent post</h3>
        {blogList.slice(0,3).map((item) => (
            <div className="fz-sidebar-single-blog" key={item.id}>
                <div className="fz-sidebar-single-blog__img">
                    <img src={item.imgSrc} alt="blog image"/>
                </div>

                <div className="fz-sidebar-single-blog__txt fz-single-blog fz-inner-page-blog">
                    <div className="fz-sidebar-single-blog__infos fz-single-blog__infos">
                        <span className="fz-single-blog__category"><Link to="#">{item.category}</Link></span>
                        <span className="fz-single-blog__date">{item.date}</span>
                    </div>

                    <h5 className="fz-sidebar-single-blog__title"><Link to="/blogDetails">{item.title}</Link></h5>
                </div>
            </div> 
        ))}
        
    </section>
  )
}

export default RecentBlogSection