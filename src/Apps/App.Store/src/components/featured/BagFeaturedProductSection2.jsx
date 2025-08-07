import React from "react";
import { bagShopData2 } from "../../data/Data";
import SingleBagCard2 from "../product/SingleBagCard2";
import { Link } from "react-router-dom";

const BagFeaturedProductSection2 = () => {
  return (
    <section className="fz-12-feat-products py-120">
      <div className="container">
        <div className="fz-7-section-heading fz-12-section-heading">
          <h2 className="fz-12-section-title">Feature Products</h2>
          <p className="fz-12-section-descr">
            Quis auctor elit sed vulputate mi sit amet mauris. Eu turpis egestas
            pretium aenean pharetra magna.
          </p>
        </div>

        <div className="row fz-12-feat-products-row justify-content-center">
          {bagShopData2.map((item) => (
            <div className="col-lg-3 col-md-4 col-6 col-xxs-12" key={item.id}>
              <SingleBagCard2
                img={item.img}
                name={item.name}
                price={item.price}
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/shop" className="fz-12-products-btn">
            More Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BagFeaturedProductSection2;
