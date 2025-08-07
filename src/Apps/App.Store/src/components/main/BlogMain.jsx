import React from 'react'
import BreadcrumbSection from '../breadcrumb/BreadcrumbSection'
import BlogContainer from '../blog/BlogContainer'

const BlogMain = () => {
  return (
    <>
        <BreadcrumbSection title={"Blog Page"} current={"Blog"}/>
        <BlogContainer/>
    </>
  )
}

export default BlogMain