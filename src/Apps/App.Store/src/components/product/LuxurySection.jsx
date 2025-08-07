import React, { useState } from "react";
import { Tab } from "react-bootstrap";
import NewTabContent from "./NewTabContent";
import BestSellerTabContent from "./BestSellerTabContent";

const LuxurySection = () => {
  const [activeTab, setActiveTab] = useState("best-seller");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <section className="fz-luxury-section">
      <div className="container">
        <div className="fz-2-section-heading">
          <div className="row gy-4 align-items-center justify-content-between">
            <div className="col-md-6">
              <h2 className="fz-section-title">Most Luxury Jewelry</h2>
            </div>
            <div className="col-md-6">
              <ul className="nav justify-content-center justify-content-md-end fz-section-heading-nav">
                <li className="fz-nav-item">
                  <button
                    role="button"
                    className={`nav-link ${
                      activeTab === "best-seller" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("best-seller")}
                  >
                    Best sellers
                  </button>
                </li>
                <li className="fz-nav-item">
                  <button
                    role="button"
                    className={`nav-link ${
                      activeTab === "new" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("new")}
                  >
                    New arrivals
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Tab.Content>
          <Tab.Pane
            eventKey="best-seller"
            className={`tab-pane ${
              activeTab === "best-seller" ? "show active" : ""
            }`}
          >
            <BestSellerTabContent />
          </Tab.Pane>

          <Tab.Pane
            eventKey="new"
            className={`tab-pane ${activeTab === "new" ? "show active" : ""}`}
          >
            <NewTabContent />
          </Tab.Pane>
        </Tab.Content>
      </div>
    </section>
  );
};

export default LuxurySection;
