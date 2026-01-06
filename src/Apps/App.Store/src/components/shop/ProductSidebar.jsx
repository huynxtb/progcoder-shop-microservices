import React from "react";
import ProductCategoryList2 from "./ProductCategoryList2";
import FrameShapeFilter from "./FrameShapeFilter";
import FrameColorFilter from "./FrameColorFilter";
import FrameBrandFilter from "./FrameBrandFilter";
import FramePriceFilter from "./FramePriceFilter";
import FrameWidthFilter from "./FrameWidthFilter";
import GenderSelectFilter from "./GenderSelectFilter";
import SalesFilter from "./SalesFilter";
import MaterialFilter from "./MaterialFilter";
import GlassColorFilter from "./GlassColorFilter";

const ProductSidebar = ({ sidebarRef, active }) => {
  return (
    <div
      className={`fz-sidebar fz-sidebar-2 ${active ? "active" : ""}`}
      ref={sidebarRef}
    >
      <ProductCategoryList2 />
      <SalesFilter />
      <GenderSelectFilter />
      <FrameShapeFilter />
      <FrameColorFilter />
      <FrameBrandFilter />
      <MaterialFilter />
      <GlassColorFilter />
      <FramePriceFilter />
      <FrameWidthFilter />
      <div className="sidebar-single-area">
        <button className="fz-5-def-btn-2 w-100">Reset</button>
      </div>
    </div>
  );
};

export default ProductSidebar;
