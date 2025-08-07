import React from 'react'
import { Link } from 'react-router-dom'

const StoreSection = () => {
  return (
    <div className="fz-about-store-area">
        <div className="container">
            <div className="fz-about-single-store">
                <div className="row gy-3 gy-sm-4 align-items-center">
                    <div className="col-xl-6 col-lg-6">
                        <div className="fz-about-store-img">
                            <img src="assets/images/store-1.jpg" alt="House Door Image"/>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6">
                        <div className="fz-about-store-content">
                            <h4 className="fz-about-store-title">Our Store (1)</h4>
                            <p>Established fact that a reader will, taken possession of my entire soul, like these sweet mornings of spring which I enjoy with the theory of ethics. Posuere eat a ante venanatin diapaus posuere aliquot. Staging at the middle of 2010 seem malasada magna moles eulimid. Present commode cursus magna, vela scelerisque Nissl consented et. Integer posuere era a ante venanatin dipygus posuere valet aliquot.</p>

                            <div className="fz-about-right-list">
                                <ul>
                                    <li>Orders go right to your restaurant</li>
                                    <li>Provide in-person pickup, &amp; delivery</li>
                                    <li>Offer in-person diners self serve</li>
                                </ul>
                            </div>

                            <Link to="/shop" className="fz-1-banner-btn fz-about-store-btn">Visit Store</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fz-about-single-store">
                <div className="row gy-3 gy-sm-4 align-items-center">
                    <div className="col-xl-6 col-lg-6 order-1 order-lg-0">
                        <div className="fz-about-store-content">
                            <h4 className="fz-about-store-title">Our Store (2)</h4>
                            <p>Established fact that a reader will, taken possession of my entire soul, like these sweet mornings of spring which I enjoy with the theory of ethics. Posuere eat a ante venanatin diapaus posuere aliquot. Staging at the middle of 2010 seem malasada magna moles eulimid. Present commode cursus magna, vela scelerisque Nissl consented et. Integer posuere era a ante venanatin dipygus posuere valet aliquot.</p>

                            <div className="fz-about-right-list">
                                <ul>
                                    <li>Orders go right to your restaurant</li>
                                    <li>Provide in-person pickup, &amp; delivery</li>
                                    <li>Offer in-person diners self serve</li>
                                </ul>
                            </div>

                            <Link to="/shop" className="fz-1-banner-btn fz-about-store-btn">Visit Store</Link>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 order-0 order-lg-1">
                        <div className="fz-about-store-img">
                            <img src="assets/images/store-2.jpg" alt="House Door Image"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StoreSection