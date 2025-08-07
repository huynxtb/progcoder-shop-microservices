import React, { useState } from "react";
import { kidsClothingData } from "../../data/Data";
import KidsClothingProductCard from "../product/KidsClothingProductCard";
import { Flipper, Flipped } from "react-flip-toolkit";

const KidsFeaturedProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [flipKey, setFlipKey] = useState(0);

  // Function to handle category filter
  const handleFilter = (category) => {
    setSelectedCategory(category);
    // Incrementing flipKey to trigger re-render and shuffle
    setFlipKey((prevKey) => prevKey + 1);
  };

  // Filtered items based on selected category
  const filteredItems =
    selectedCategory === "all"
      ? kidsClothingData
      : kidsClothingData.filter((item) =>
          item.category.includes(selectedCategory)
        );

  return (
    <section
      className="fz-9-trendy-product-section fz-9-feature-product-section"
      style={{ backgroundImage: "url(assets/images/fz-9-feat-pro-bg.jpg)" }}
    >
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="fz-9-section-title-area text-center text-lg-start">
              <h2 className="fz-9-section-title">Feature Products</h2>
              <p className="fz-9-section-content">
                Quis auctor elit sed vulputate mi sit amet mauris. Eu turpis{" "}
                <br />
                egestas pretium aenean pharetra magna.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="fz-9-product-btn text-center text-lg-end">
              <button
                onClick={() => handleFilter("all")}
                className={
                  selectedCategory === "all" ? "mixitup-control-active" : ""
                }
              >
                All
              </button>
              <button
                onClick={() => handleFilter("hot-sale")}
                className={
                  selectedCategory === "hot-sale"
                    ? "mixitup-control-active"
                    : ""
                }
              >
                Hot Sale
              </button>
              <button
                onClick={() => handleFilter("new-arrival")}
                className={
                  selectedCategory === "new-arrival"
                    ? "mixitup-control-active"
                    : ""
                }
              >
                New arrival
              </button>
              <button
                onClick={() => handleFilter("offer")}
                className={
                  selectedCategory === "offer" ? "mixitup-control-active" : ""
                }
              >
                offer
              </button>
            </div>
          </div>
        </div>
        <div className="trendy-product-items">
          <Flipper flipKey={flipKey}>
            <div className="row g-3 g-xl-4 fz-9-products-row fz-mixitup-products-row">
              {filteredItems.map((item) => (
                <Flipped key={item.id} flipId={item.id}>
                  <div className="col-lg-3 col-md-4 col-6 col-xxs-12">
                    <KidsClothingProductCard
                      img={item.img}
                      price={item.price}
                      name={item.name}
                    />
                  </div>
                </Flipped>
              ))}
            </div>
          </Flipper>
        </div>
      </div>
    </section>
  );
};

export default KidsFeaturedProducts;
