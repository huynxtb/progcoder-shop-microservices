import React, { useContext } from "react";
import { FarzaaContext } from "../../context/FarzaaContext";

const BlogTagFilter = () => {
  const { selectedBlogTags, handleBlogTagSelection } =
    useContext(FarzaaContext);
  const tags = ["Electronic", "Furniture", "Fashion", "Food", "Travel"];
  return (
    <section className="sidebar-single-area product-tags-area">
      <h3 className="sidebar-single-area__title">Blog tags</h3>
      <div className="tags">
        {tags.map((tag) => (
          <a
            key={tag}
            className={selectedBlogTags.includes(tag) ? "active" : ""}
            onClick={() => handleBlogTagSelection(tag)}
          >
            {tag}
          </a>
        ))}
      </div>
    </section>
  );
};

export default BlogTagFilter;
