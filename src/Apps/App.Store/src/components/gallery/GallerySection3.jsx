import React from "react";

const GallerySection3 = () => {
  return (
    <section className="fz-12-gallery pt-120">
      <div className="container">
        <div className="fz-7-section-heading fz-12-section-heading">
          <h2 className="fz-12-section-title">Instagram#</h2>
          <p className="fz-12-section-descr">
            Quis auctor elit sed vulputate mi sit amet mauris. Eu turpis egestas
            pretium aenean pharetra magna.
          </p>
        </div>

        <div className="row fz-12-gallery-primary-row">
          <div className="col-6 col-xxs-12">
            <div className="fz-12-gallery-img">
              <img
                src="assets/images/fz-12-gallery-1.jpg"
                alt="Gallery Image"
              />
              <a href="#" className="view-btn">
                <i classNa="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>

          <div className="col-6 col-xxs-12">
            <div className="row">
              <div className="col-6">
                <div className="fz-12-gallery-img">
                  <img
                    src="assets/images/fz-12-gallery-2.jpg"
                    alt="Gallery Image"
                  />
                  <a href="#" className="view-btn">
                    <i classNa="fa-brands fa-instagram"></i>
                  </a>
                </div>
              </div>
              <div className="col-6">
                <div className="fz-12-gallery-img">
                  <img
                    src="assets/images/fz-12-gallery-3.jpg"
                    alt="Gallery Image"
                  />
                  <a href="#" className="view-btn">
                    <i classNa="fa-brands fa-instagram"></i>
                  </a>
                </div>
              </div>
              <div className="col-6">
                <div className="fz-12-gallery-img">
                  <img
                    src="assets/images/fz-12-gallery-4.jpg"
                    alt="Gallery Image"
                  />
                  <a href="#" className="view-btn">
                    <i classNa="fa-brands fa-instagram"></i>
                  </a>
                </div>
              </div>
              <div className="col-6">
                <div className="fz-12-gallery-img">
                  <img
                    src="assets/images/fz-12-gallery-5.jpg"
                    alt="Gallery Image"
                  />
                  <a href="#" className="view-btn">
                    <i classNa="fa-brands fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection3;
