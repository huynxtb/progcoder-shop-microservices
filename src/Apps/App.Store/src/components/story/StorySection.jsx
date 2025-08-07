import React from "react";

const StorySection = () => {
  return (
    <div className="fz-about-area">
      <div className="container">
        <div className="row gy-5">
          <div className="col-xl-6">
            <div className="fz-about-images">
              <div className="row g-0">
                <div className="col-sm-8 col-6">
                  <div className="fz-about-images-left">
                    <div className="fz-about-images-left-img">
                      <img src="assets/images/about-img-2.jpg" alt="about1-1.png" />
                    </div>

                    <div className="fz-about__infos mt-30">
                      <div className="fz-about__members">
                        <span className="fz-about__members-amount">30K+</span>
                        <span className="fz-about__members-label">
                          Active Customer
                        </span>
                      </div>

                      <ul className="fz-about__members-img">
                        <li>
                          <img
                            src="assets/images/customr-1.png"
                            alt="Person picture"
                          />
                        </li>
                        <li>
                          <img
                            src="assets/images/customr-2.png"
                            alt="Person picture"
                          />
                        </li>
                        <li>
                          <img
                            src="assets/images/customr-3.png"
                            alt="Person picture"
                          />
                        </li>
                        <li>
                          <img
                            src="assets/images/customr-4.png"
                            alt="Person picture"
                          />
                        </li>
                        <li>
                          <img
                            src="assets/images/customr-5.png"
                            alt="Person picture"
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4 col-6 align-self-end align-self-xxs-start">
                  <div className="fz-about-images-right">
                    <div className="fz-about-images-right-img">
                      <img src="assets/images/about-img-1.jpg" alt="about2-1.png" />
                    </div>

                    <div className="fz-about-images-right__card">
                      <div className="fz-about-images-right__card-wrapp">
                        <div className="fz-about-images-right__card-inner">
                          <span className="fz-about-images-right__card-text">
                            Since From
                          </span>
                          <span className="fz-about-images-right__card-year">
                            2010
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6">
            <div className="fz-about-right-content">
              <h4 className="fz-about-right-title">About Our Story</h4>
              <p className="fz-about-right-descr">
                Established fact that a reader will, taken possession of my
                entire soul, like these sweet mornings of spring which I enjoy
                with the theory of ethics. Posuere eat a ante venanatin diapaus
                posuere aliquot. Staging at the middle of 2010 seem malasada
                magna moles eulimid. Present commode cursus magna, vela
                scelerisque Nissl consented et. Integer posuere era a ante
                venanatin dipygus posuere valet aliquot.
              </p>
              <div className="row">
                <div className="col-xl-5 col-md-4 col-sm-5 col-7 col-xxs-12">
                  <div className="fz-about-right-img">
                    <img src="assets/images/about-img-3.jpg" alt="Person" />
                  </div>
                </div>
                <div className="col-sm-7 col-md-8 col-xl-7">
                  <div className="fz-about-right-list">
                    <ul>
                      <li>Orders go right to your restaurant</li>
                      <li>Provide in-person pickup, &amp; delivery</li>
                      <li>Offer in-person diners self serve</li>
                      <li>Established fact that a reader will, taken</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="fz-about-author">
                <span className="fz-about-author-sign-img">
                  <img src="assets/images/about-author-sign.png" alt="Signature" />
                </span>

                <div className="fz-about-author-intro">
                  <span className="fz-about-author-img">
                    <img src="assets/images/about-author-img.png" alt="Person" />
                  </span>
                  <div className="fz-about-author-intro__txt">
                    <h5 className="fz-about-author-name">Arjuna Alisha</h5>
                    <span className="fz-about-author-label">Author</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorySection;
