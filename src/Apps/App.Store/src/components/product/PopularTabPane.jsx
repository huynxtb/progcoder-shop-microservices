import React from "react";
import { electricalProduct } from "../../data/Data";
import SingleProduct from "./SingleProduct";

const PopularTabPane = () => {
  return (
    <div className="row gy-lg-5 gx-lg-4 g-3 gy-4">
      {electricalProduct.map((item) => (
        <div className="col-xl-3 col-sm-4 col-6" key={item.id}>
          <SingleProduct
            img={item.img}
            name={item.name}
            price={item.price}
            oldPrice={item.oldPrice}
          />
        </div>
      ))}
    </div>
  );
};

export default PopularTabPane;
