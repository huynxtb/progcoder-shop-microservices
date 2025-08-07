import React from "react";

const SubBannerSection3 = () => {
  return (
    <section className="fz-9-sub-banner-section">
      <div className="container">
        <div className="row bootstrap-custom-col">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div
              className="fz-9-sub-banner-thumb"
              style={{
                backgroundImage: "url(assets/images/fz-9-sub-banner1.png)",
              }}
            >
              <div className="fz-9-sub-banner-content">
                <h2 className="title">New Arrival Baby's Girls</h2>
                <h4 className="subtitle">
                  Up to <span>35%</span> off
                </h4>
                <a className="fz-9-btn" href="#">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div
              className="fz-9-sub-banner-thumb"
              style={{
                backgroundImage: "url(assets/images/fz-9-sub-banner2.png)",
              }}
            >
              <div className="fz-9-sub-banner-content">
                <h2 className="title">New Arrival Baby's Girls</h2>
                <h4 className="subtitle">
                  Up to <span>35%</span> off
                </h4>
                <a className="fz-9-btn" href="#">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubBannerSection3;
