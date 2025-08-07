import React from 'react'
import BreadcrumbSection from '../breadcrumb/BreadcrumbSection'
import BlogDetailSection from '../blog/BlogDetailSection'

const BlogDetailsMain = () => {
  return (
    <>
        <BreadcrumbSection title={"Blog Details"} current={"Blog Details"}/>
        <BlogDetailSection/>
    </>
  )
}

export default BlogDetailsMain