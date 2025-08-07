import React from "react";
import { bagShopData } from "../../data/Data";
import SingleBagCard from "./SingleBagCard";

const TreandyBagSection = () => {
  return (
    <section className="fz-10-trendy-products-section fz-10-feature-product-section">
      <div className="container">
        <div className="row fz-10-trendy-products-row">
          <div className="col-md-12 col-lg-6">
            <div className="fz-10-treandy-product-iamge-area">
              <img
                src="assets/images/travel-outfit.png"
                alt="treandy-product"
              />

              <div className="fz-10-treandy-product-offer">
                <span>
                  <sup>30%</sup> off
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-6">
            <div className="trendy-products-top">
              <h2 className="fz-10-section-title">Trendy Products</h2>
              <p>
                Quis auctor elit sed vulputate mi sit amet mauris. Eu turpis
                egestas pretium aenean pharetra magna.
              </p>
            </div>
            <div className="row fz-10-products-row">
              {bagShopData.slice(-4).map((item) => (
                <div className="col-6 col-xxs-12" key={item.id}>
                  <SingleBagCard
                    img={item.img}
                    name={item.name}
                    price={item.price}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreandyBagSection;
