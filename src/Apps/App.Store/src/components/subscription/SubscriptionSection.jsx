import React from 'react'

const SubscriptionSection = () => {
  return (
    <div className="subs-section">
        <div className="container">
            <div className="row gy-4 align-items-center">
                <div className="col-lg-6">
                    <div className="subs-section__txt">
                        <h2>Subscribe!</h2>
                        <h3>Newsletter For Update & Offer</h3>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="subs-section__form">
                        <form action="#">
                            <input type="email" name="subs-mail" id="subs-mail-input" placeholder="Enter your email address"/>
                            <button className="subs-form-btn">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SubscriptionSection