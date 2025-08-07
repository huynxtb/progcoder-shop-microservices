import React, { useState } from "react";
import PopularTabPane from "./PopularTabPane";

const PopularProducts = () => {
  const [activeTab, setActiveTab] = useState("circuit");
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="fz-4-product pb-120">
      <div className="container">
        <div className="fz-4-section-heading">
          <div className="row gy-4 align-items-center justify-content-between">
            <div className="col-md-6">
              <h2 className="fz-section-title">
                Popular <span>Product</span>
              </h2>
            </div>
            <div className="col-md-6">
              <ul
                className="nav justify-content-center justify-content-md-end fz-4-section-heading-nav"
                id="myTab"
                role="tablist"
              >
                <li className="fz-nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "circuit" ? "active" : ""
                    }`}
                    id="tab-01"
                    onClick={() => toggleTab("circuit")}
                  >
                    Circuit
                  </button>
                </li>
                <li className="fz-nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "cable" ? "active" : ""
                    }`}
                    id="tab-02"
                    onClick={() => toggleTab("cable")}
                  >
                    Cable
                  </button>
                </li>
                <li className="fz-nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "switch" ? "active" : ""
                    }`}
                    id="tab-03"
                    onClick={() => toggleTab("switch")}
                  >
                    Switches
                  </button>
                </li>
                <li className="fz-nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "light" ? "active" : ""
                    }`}
                    id="tab-04"
                    onClick={() => toggleTab("light")}
                  >
                    LED Light
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="tab-content" id="myTabContent">
          <div
            className={`ar-tab-pane ${activeTab === "circuit" ? "active" : ""}`}
            id="tab-01-pane"
          >
            <PopularTabPane />
          </div>

          <div
            className={`ar-tab-pane ${activeTab === "cable" ? "active" : ""}`}
            id="tab-02-pane"
          >
            <PopularTabPane />
          </div>

          <div
            className={`ar-tab-pane ${activeTab === "switch" ? "active" : ""}`}
            id="tab-03-pane"
          >
            <PopularTabPane />
          </div>

          <div
            className={`ar-tab-pane ${activeTab === "light" ? "active" : ""}`}
            id="tab-04-pane"
          >
            <PopularTabPane />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
