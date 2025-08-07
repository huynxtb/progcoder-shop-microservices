import React, { useState } from "react";

const ProductCategoryList2 = () => {
  const [activeCat, setActiveCat] = useState("");
  const toggleActiveCat = (category) => {
    setActiveCat((prevState) => ({
      ...prevState, // Copy the previous state
      [category]: !prevState[category], // Toggle the specified category
    }));
  };
  return (
    <div className="sidebar-single-area">
      <h3 className="sidebar-single-area__title">Category</h3>
      <ul className="product-categories categories">
        <li className="cat-item">
          <a
            className={`has-sub ${activeCat.men ? "open" : ""}`}
            role="button"
            onClick={() => toggleActiveCat("men")}
          >
            Men
          </a>
          <ul
            className={`product-categories ${
              activeCat.men ? "d-block" : "d-none"
            }`}
          >
            <li className="cat-item">
              <a href="#">Computer Glass</a>
            </li>
            <li className="cat-item">
              <a href="#">Sunglass</a>
            </li>
            <li className="cat-item">
              <a href="#">Glass</a>
            </li>
            <li className="cat-item">
              <a href="#">Watch</a>
            </li>
            <li className="cat-item">
              <a href="#">Computer Glass</a>
            </li>
            <li className="cat-item">
              <a href="#">Sunglass</a>
            </li>
            <li className="cat-item">
              <a href="#">Glass</a>
            </li>
            <li className="cat-item">
              <a href="#">Watch</a>
            </li>
          </ul>
        </li>
        <li className="cat-item">
          <a
            className={`has-sub ${activeCat.women ? "open" : ""}`}
            role="button"
            onClick={() => toggleActiveCat("women")}
          >
            Women
          </a>
          <ul
            className={`product-categories ${
              activeCat.women ? "d-block" : "d-none"
            }`}
          >
            <li className="cat-item">
              <a href="#">Computer Glass</a>
            </li>
            <li className="cat-item">
              <a href="#">Sunglass</a>
            </li>
            <li className="cat-item">
              <a href="#">Glass</a>
            </li>
            <li className="cat-item">
              <a href="#">Watch</a>
            </li>
          </ul>
        </li>
        <li className="cat-item">
          <a
            className={`has-sub ${activeCat.kids ? "open" : ""}`}
            role="button"
            onClick={() => toggleActiveCat("kids")}
          >
            Kids
          </a>
          <ul
            className={`product-categories ${
              activeCat.kids ? "d-block" : "d-none"
            }`}
          >
            <li className="cat-item">
              <a href="#">Computer Glass</a>
            </li>
            <li className="cat-item">
              <a href="#">Sunglass</a>
            </li>
            <li className="cat-item">
              <a href="#">Glass</a>
            </li>
            <li className="cat-item">
              <a href="#">Watch</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default ProductCategoryList2;
