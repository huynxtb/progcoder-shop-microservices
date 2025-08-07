import React, { useState } from "react";
import CcTvTabPane from "./tab-panes/CcTvTabPane";

const CcTvFeaturedProductSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };
  return (
    <section className="fz-11-feature">
      <div className="fz-11-feature-text-container">
        <h2 className="fz-11-feature-heading">Feature Products</h2>
        <p className="fz-11-feature-description">
          Quis auctor elit sed vulputate mi sit amet mauris. Eu turpis
          <br />
          egestas pretium aenean pharetra magna.
        </p>
      </div>

      <ul className="nav fz-11-feature-tab1">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "all" ? "active" : ""}`}
            onClick={() => toggleTab("all")}
          >
            ALL
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "hot-sale" ? "active" : ""}`}
            onClick={() => toggleTab("hot-sale")}
          >
            HOT SALE
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "new-arrival" ? "active" : ""
            }`}
            onClick={() => toggleTab("new-arrival")}
          >
            NEW ARRIVAL
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "offer" ? "active" : ""}`}
            onClick={() => toggleTab("offer")}
          >
            OFFER
          </button>
        </li>
      </ul>

      <div className="tab-content" id="myTabContent">
        <div className={`ar-tab-pane ${activeTab === "all" ? "active" : ""}`}>
          <CcTvTabPane startIndex={0} endIndex={8} />
        </div>

        <div
          className={`ar-tab-pane ${activeTab === "hot-sale" ? "active" : ""}`}
        >
          <CcTvTabPane startIndex={3} endIndex={8} />
        </div>

        <div
          className={`ar-tab-pane ${
            activeTab === "new-arrival" ? "active" : ""
          }`}
        >
          <CcTvTabPane startIndex={0} endIndex={4} />
        </div>

        <div className={`ar-tab-pane ${activeTab === "offer" ? "active" : ""}`}>
          <CcTvTabPane startIndex={1} endIndex={7} />
        </div>
      </div>
    </section>
  );
};

export default CcTvFeaturedProductSection;
