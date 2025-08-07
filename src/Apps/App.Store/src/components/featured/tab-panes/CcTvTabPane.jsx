import React from "react";
import { ccTvShopData } from "../../../data/Data";
import SingleCcTvCard from "../../product/SingleCcTvCard";

const CcTvTabPane = ({ startIndex, endIndex }) => {
  return (
    <div className="container fz-11-feature-cctv-container">
      {ccTvShopData.slice(startIndex, endIndex).map((item) => (
        <SingleCcTvCard img={item.img} name={item.name} price={item.price} />
      ))}
    </div>
  );
};

export default CcTvTabPane;
