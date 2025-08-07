import React, { useContext } from 'react'
import { FarzaaContext } from '../../context/FarzaaContext';
import { blogList } from '../../data/Data';
const categories = [
  { name: null, label: 'All Door' },
  { name: 'Electronic', label: 'Electronic' },
  { name: 'Furniture', label: 'Furniture' },
  { name: 'Fashion', label: 'Fashion' },
  { name: 'Food', label: 'Food' },
  { name: 'Travel', label: 'Travel' },
];
const BlogCategoryFilter = () => {
    const {
        handleBlogCategoryFilter,
        activeBlogCategory
    } = useContext(FarzaaContext)
    
  return (
    <section className="sidebar-single-area product-categories-area">
        <h3 className="sidebar-single-area__title">Blog categories</h3>
        <ul className="product-categories">
          {categories.map(categoryObj => (
              <li
                  key={categoryObj.name}
                  onClick={() => handleBlogCategoryFilter(categoryObj.name)}
                  className={`cat-item ${activeBlogCategory === categoryObj.name ? 'active' : ''}`}
              >
                  {categoryObj.label} ({categoryObj.name === null ? blogList.length : blogList.filter(product => product.category === categoryObj.name).length})
              </li>
          ))}
        </ul>
    </section>
  )
}

export default BlogCategoryFilter