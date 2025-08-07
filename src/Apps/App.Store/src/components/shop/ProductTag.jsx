import { FarzaaContext } from "../../context/FarzaaContext";
import React, { useContext } from "react";

const ProductTag = () => {
  const { selectedTags, handleTagSelection } = useContext(FarzaaContext);
  const tags = [
    "Plastic Door",
    "Wooden Door",
    "Double Layer Door",
    "Chinese Door",
    "Steel Door",
    "Solid Color Door",
    "Panel Door",
    "Security Door",
  ];

  return (
    <section className="sidebar-single-area product-tags-area">
      <h3 className="sidebar-single-area__title">Product tags</h3>
      <div className="tags">
        {tags.map((tag) => (
          <a
            key={tag}
            className={selectedTags.includes(tag) ? "active" : ""}
            onClick={() => handleTagSelection(tag)}
          >
            {tag}
          </a>
        ))}
      </div>
    </section>
  );
};

export default ProductTag;
