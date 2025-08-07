import React from 'react'
import { Link } from 'react-router-dom'

const SpecialOfferSection = () => {
  return (
    <section className="fz-special-offer">
        <div className="container">
            <div className="fz-special-offer-bg">
                <div className="row justify-content-between align-items-center">
                    <div className="col-lg-5 col-6 col-xxs-12">
                        <div className="fz-special-offer__txt">
                            <h6 className="fz-special-offer-sub-title">Perfect Christmas Gift</h6>
                            <h2 className="fz-special-offer-title">Up to 70 OFF</h2>
                            <p className="fz-special-offer-description">Limited stock only! Only the listed size is available to ship within 24hrs.</p>
                            <Link to="/shop" className="fz-special-offer-btn">shop now</Link>
                        </div>
                    </div>

                    <div className="col-lg-5 col-6 col-xxs-12 align-self-end">
                        <div className="fz-spcial-offer__img">
                            <img src="assets/images/ring.png" alt="Ring Image"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default SpecialOfferSection