import React from "react";
import { watchData } from "../../data/Data";
import SingleWatchCard from "./SingleWatchCard";

const WatchTabPane = () => {
  return (
    <div className="row fz-6-products-row">
      {watchData.map((item) => (
        <div className="col-lg-3 col-md-4 col-6 col-xxs-12" key={item.id}>
          <SingleWatchCard
            img={item.img}
            category={item.category}
            title={item.title}
            slug={item.slug}
            price={item.price}
          />
        </div>
      ))}
    </div>
  );
};

export default WatchTabPane;
