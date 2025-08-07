import React from 'react'

const FeaturedSection2 = () => {
  return (
    <div className="fz-3-features-section">
        <div className="container">
            <div className="features-container align-items-center">
                <div className="fz-single-feature">
                    <div className="fz-3-single-feature__img">
                        <img src="assets/images/fz-feature-1.png" alt="Feature Icon"/>
                    </div>
                    <div className="fz-3-single-feature__txt">
                        <h4 className="fz-3-single-feature__title">Free Delivery</h4>
                        <h6 className="fz-3-single-feature__sub-title">Only in $50</h6>
                    </div>
                </div>

                <div className="fz-single-feature">
                    <div className="fz-3-single-feature__img">
                        <img src="assets/images/fz-feature-2.png" alt="Feature Icon"/>
                    </div>
                    <div className="fz-3-single-feature__txt">
                        <h4 className="fz-3-single-feature__title">Get Feedback</h4>
                        <h6 className="fz-3-single-feature__sub-title">12000 Users</h6>
                    </div>
                </div>

                <div className="fz-single-feature">
                    <div className="fz-3-single-feature__img">
                        <img src="assets/images/fz-feature-3.png" alt="Feature Icon"/>
                    </div>
                    <div className="fz-3-single-feature__txt">
                        <h4 className="fz-3-single-feature__title">07 Days Returns</h4>
                        <h6 className="fz-3-single-feature__sub-title">Policy Option</h6>
                    </div>
                </div>

                <div className="fz-single-feature">
                    <div className="fz-3-single-feature__img">
                        <img src="assets/images/fz-feature-4.png" alt="Feature Icon"/>
                    </div>
                    <div className="fz-3-single-feature__txt">
                        <h4 className="fz-3-single-feature__title">Secure Payment</h4>
                        <h6 className="fz-3-single-feature__sub-title">System</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FeaturedSection2