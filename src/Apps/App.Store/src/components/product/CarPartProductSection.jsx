import React, { useState } from "react";
import CarPartCard from "./CarPartCard";
import { carPartsData } from "../../data/Data";
import { Flipped, Flipper } from "react-flip-toolkit";

const CarPartProductSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [flipKey, setFlipKey] = useState(0);

  // Function to handle category filter
  const handleFilter = (category) => {
    setActiveCategory(category);
    // Incrementing flipKey to trigger re-render and shuffle
    setFlipKey((prevKey) => prevKey + 1);
  };
  const filteredItems = () => {
    if (activeCategory === "all") {
      return carPartsData;
    }

    return carPartsData.filter((item) => item.category === activeCategory);
  };
  return (
    <section className="fz-6-products">
      <div className="container">
        <h2 className="fz-6-section-title">Auto Parts For All Model</h2>

        <div className="fz-6-products-filter-navs">
          <button
            className={`fz-6-product-nav ${
              activeCategory === "all" ? "mixitup-control-active" : ""
            }`}
            onClick={() => handleFilter("all")}
          >
            All Parts
          </button>
          <button
            className={`fz-6-product-nav ${
              activeCategory === "power-tools" ? "mixitup-control-active" : ""
            }`}
            onClick={() => handleFilter("power-tools")}
          >
            Power Tools
          </button>
          <button
            className={`fz-6-product-nav ${
              activeCategory === "hand-tools" ? "mixitup-control-active" : ""
            }`}
            onClick={() => handleFilter("hand-tools")}
          >
            Hand Tools
          </button>
        </div>
        <Flipper flipKey={flipKey}>
          <div className="row fz-6-products-row">
            {filteredItems().map((item) => (
              <Flipped key={item.id} flipId={item.id}>
                <div
                  className={`col-lg-3 col-md-4 col-6 col-xxs-12 mix ${item.category}`}
                >
                  <CarPartCard
                    discount={item.discount}
                    img={item.img}
                    title={item.title}
                    price={item.price}
                    oldPrice={item.oldPrice}
                  />
                </div>
              </Flipped>
            ))}
          </div>
        </Flipper>
      </div>
    </section>
  );
};

export default CarPartProductSection;
