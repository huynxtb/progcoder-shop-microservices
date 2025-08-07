import React from "react";
import { carPartsData } from "../../data/Data";
import CarPartCard from "./CarPartCard";

const CarPartTabPane = ({ startIndex, endIndex }) => {
  return (
    <div className="row justify-content-center fz-6-products-row">
      {carPartsData.slice(startIndex, endIndex).map((item) => (
        <div className="col-lg-3 col-md-4 col-6 col-xxs-12" key={item.id}>
          <CarPartCard
            discount={item.discount}
            img={item.img}
            price={item.price}
            oldPrice={item.oldPrice}
            title={item.title}
          />
        </div>
      ))}
    </div>
  );
};

export default CarPartTabPane;
