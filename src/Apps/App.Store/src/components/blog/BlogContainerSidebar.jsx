import React from 'react'
import BlogCategoryFilter from './BlogCategoryFilter'
import BlogTagFilter from './BlogTagFilter'
import RecentBlogSection from './RecentBlogSection'
import SearchFilter from './SearchFilter'

const BlogContainerSidebar = () => {
  return (
    <aside className="fz-sidebar blog-page-sidebar">
        <SearchFilter/>

        <RecentBlogSection/>

        <BlogCategoryFilter/>

        <BlogTagFilter/>
    </aside>
  )
}

export default BlogContainerSidebar