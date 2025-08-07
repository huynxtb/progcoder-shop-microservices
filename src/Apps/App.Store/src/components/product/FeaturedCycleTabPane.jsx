import React from "react";
import { cycleData } from "../../data/Data";
import CycleCard from "./CycleCard";

const FeaturedCycleTabPane = () => {
  return (
    <div className="row fz-8-feat-products-row">
      {cycleData.map((item) => (
        <div className="col-lg-4 col-6 col-xxs-12" key={item.id}>
          <CycleCard
            img={item.img}
            slug={item.slug}
            title={item.title}
            price={item.price}
            showVariants
          />
        </div>
      ))}
    </div>
  );
};

export default FeaturedCycleTabPane;
