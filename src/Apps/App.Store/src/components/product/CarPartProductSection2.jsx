import React, { useState } from "react";
import CarPartTabPane from "./CarPartTabPane";

const CarPartProductSection2 = () => {
  const [activeTab, setActiveTab] = useState("power-tools");
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };
  return (
    <section className="fz-6-products fz-6-products-2">
      <div className="container">
        <div className="fz-6-products-heading d-flex justify-content-between flex-lg-row flex-column align-items-center align-items-lg-end">
          <h2 className="fz-6-section-title">Auto Parts For All Model</h2>

          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className={`fz-6-product-nav nav-link ${
                  activeTab === "power-tools" ? "active" : ""
                }`}
                onClick={() => toggleTab("power-tools")}
              >
                power-tools
              </button>
              <button
                className={`fz-6-product-nav nav-link ${
                  activeTab === "hand-tools" ? "active" : ""
                }`}
                onClick={() => toggleTab("hand-tools")}
              >
                hand-tools
              </button>
              <button
                className={`fz-6-product-nav nav-link ${
                  activeTab === "light-tools" ? "active" : ""
                }`}
                onClick={() => toggleTab("light-tools")}
              >
                light-tools
              </button>
            </div>
          </nav>
        </div>

        <div className="tab-content">
          <div
            className={`ar-tab-pane small-tab ${
              activeTab === "power-tools" ? "active" : ""
            }`}
          >
            <CarPartTabPane startIndex={0} endIndex={4} />
          </div>

          <div
            className={`ar-tab-pane small-tab ${
              activeTab === "hand-tools" ? "active" : ""
            }`}
          >
            <CarPartTabPane startIndex={4} endIndex={8} />
          </div>

          <div
            className={`ar-tab-pane small-tab ${
              activeTab === "light-tools" ? "active" : ""
            }`}
          >
            <CarPartTabPane startIndex={0} endIndex={4} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarPartProductSection2;
