import React from 'react'
import { Link } from 'react-router-dom'

const OfferSection = () => {
  return (
    <section className="fz-1-offer-section">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <div className="fz-single-offer__txt">
                        <h2 className="fz-single-offer__discount-percentage">30% off</h2>
                        <h3 className="fz-single-offer__title">Doors to Fit into your</h3>
                        <p className="fz-single-offer__disc">As such, it must blend with or complement the exterior effect
                            For instance, Victorian, contemporary, art nouveau.</p>
                        <Link to="/shop" className="fz-1-banner-btn fz-1-single-offer__btn">Shop Now</Link>
                    </div>
                </div>

                <div className="col-lg-6 align-self-end text-center">
                    <img src="assets/images/fz-3-offer-img.png" alt="Offer Image"/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default OfferSection