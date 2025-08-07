import React from "react";
import ProductBox from "@/components/partials/ecommerce/product-box";
import { products } from "@/constant/data";

const Wishlist = () => {
  const wish = {};

  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-lg bg-white dark:bg-transparent p-6">
      {products.map((item, i) => {
        return <ProductBox key={i} item={item} wish={wish} />;
      })}
    </div>
  );
};

export default Wishlist;
