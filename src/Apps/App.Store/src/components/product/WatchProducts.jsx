import React, { useState } from "react";
import WatchTabPane from "./WatchTabPane";
import { Link } from "react-router-dom";

const WatchProducts = () => {
  const [activeTab, setActiveTab] = useState("newest");
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };
  return (
    <section className="fz-7-new-arrivals py-120">
      <div className="container">
        <div className="fz-7-section-heading">
          <h2 className="fz-7-section-title">New Arrivals</h2>
          <p className="fz-7-section-descr">
            Using test items of real content and data in designs will help but
            there's no guarantee that every oddity
          </p>
        </div>

        <nav>
          <div className="nav nav-tabs" id="fz-7-new-arrival-nav-tab">
            <button
              className={`nav-link ${activeTab === "newest" ? "active" : ""}`}
              id="nav-newest-tab"
              onClick={() => toggleTab("newest")}
            >
              Newest
            </button>

            <button
              className={`nav-link ${
                activeTab === "best-seller" ? "active" : ""
              }`}
              onClick={() => toggleTab("best-seller")}
              id="nav-best-seller-tab"
            >
              Best Seller
            </button>

            <button
              className={`nav-link ${activeTab === "sale" ? "active" : ""}`}
              onClick={() => toggleTab("sale")}
              id="nav-on-sale-tab"
            >
              On Sale
            </button>
          </div>
        </nav>

        <div className="ar-tab-content" id="fz-7-new-arrival-nav-tabContent">
          <div
            className={`ar-tab-pane ${activeTab === "newest" ? "active" : ""}`}
          >
            <WatchTabPane />
          </div>

          <div
            className={`ar-tab-pane ${
              activeTab === "best-seller" ? "active" : ""
            }`}
            id="nav-best-seller"
          >
            <WatchTabPane />
          </div>

          <div
            className={`ar-tab-pane ${activeTab === "sale" ? "active" : ""}`}
            id="nav-on-sale"
          >
            <WatchTabPane />
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/shop"
            className="fz-6-sub-banner-btn fz-7-products-btn mt-30"
          >
            More Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WatchProducts;
