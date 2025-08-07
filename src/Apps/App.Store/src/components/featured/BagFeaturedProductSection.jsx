import React, { useState } from "react";
import { bagShopData } from "../../data/Data";
import { Flipper, Flipped } from "react-flip-toolkit";
import SingleBagCard from "../product/SingleBagCard";
const BagFeaturedProductSection = () => {
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
      ? bagShopData
      : bagShopData.filter((item) => item.category.includes(selectedCategory));
  return (
    <section className="fz-10-feature-product-section" data-aos="fade-up">
      <div className="container">
        <div className="row align-items-center fz-10-feature-product-heading">
          <div className="col-md-12 col-lg-6">
            <div className="fz-10-section-top">
              <h2 className="fz-10-section-title">Feature Products</h2>
              <p>
                Quis auctor elit sed vulputate mi sit amet mauris. Eu turpis
                egestas pretium aenean pharetra magna.
              </p>
            </div>
          </div>
          <div className="col-md-12 col-lg-6">
            <ul>
              <li>
                <button
                  className={`button ${
                    selectedCategory === "all" ? "mixitup-control-active" : ""
                  }`}
                  onClick={() => handleFilter("all")}
                >
                  All
                </button>
                <button
                  className={`button ${
                    selectedCategory === "hot-sale"
                      ? "mixitup-control-active"
                      : ""
                  }`}
                  onClick={() => handleFilter("hot-sale")}
                >
                  Hot Sale
                </button>
                <button
                  className={`button ${
                    selectedCategory === "new-arrival"
                      ? "mixitup-control-active"
                      : ""
                  }`}
                  onClick={() => handleFilter("new-arrival")}
                >
                  New arrival
                </button>
                <button
                  className={`button ${
                    selectedCategory === "offer" ? "mixitup-control-active" : ""
                  }`}
                  onClick={() => handleFilter("offer")}
                >
                  offer
                </button>
              </li>
            </ul>
          </div>
        </div>
        <Flipper flipKey={flipKey}>
          <div className="row fz-10-products-row fz-mixitup-products-row">
            {filteredItems.map((item) => (
              <Flipped key={item.id} flipId={item.id}>
                <div className="col-lg-3 col-md-4 col-6 col-xxs-12">
                  <SingleBagCard
                    img={item.img}
                    price={item.price}
                    name={item.name}
                    discount={item.discount}
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

export default BagFeaturedProductSection;
