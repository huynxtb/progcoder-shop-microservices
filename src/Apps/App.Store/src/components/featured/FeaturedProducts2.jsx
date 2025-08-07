import React, { useState } from "react";
import FeaturedCycleTabPane from "../product/FeaturedCycleTabPane";

const FeaturedProducts2 = () => {
  const [activeTab, setActiveTab] = useState("hot");
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };
  return (
    <section className="fz-8-feat-products py-120">
      <div className="container">
        <div className="fz-7-section-heading fz-8-section-heading">
          <h2 className="fz-8-section-title">Feature Products</h2>
          <p className="fz-8-section-descr">
            Quis auctor elit sed vulputate mi sit amet mauris. Eu turpis egestas
            pretium aenean pharetra magna.
          </p>
        </div>

        <nav>
          <div className="nav nav-tabs fz-8-feat-product-tabs">
            <button
              className={`nav-link ${activeTab === "hot" ? "active" : ""}`}
              onClick={() => toggleTab("hot")}
            >
              Hot Sale
            </button>

            <button
              className={`nav-link ${activeTab === "new" ? "active" : ""}`}
              onClick={() => toggleTab("new")}
            >
              New Arrival
            </button>

            <button
              className={`nav-link ${activeTab === "offer" ? "active" : ""}`}
              onClick={() => toggleTab("offer")}
            >
              Offer
            </button>
          </div>
        </nav>

        <div className="tab-content" id="nav-tabContent">
          <div className={`ar-tab-pane ${activeTab === "hot" ? "active" : ""}`}>
            <FeaturedCycleTabPane />
          </div>

          <div className={`ar-tab-pane ${activeTab === "new" ? "active" : ""}`}>
            <FeaturedCycleTabPane />
          </div>

          <div
            className={`ar-tab-pane ${activeTab === "offer" ? "active" : ""}`}
          >
            <FeaturedCycleTabPane />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts2;
