import React from 'react'

const GallerySection = () => {
  return (
    <section className="fz-gallery-section fz-1-gallery-section">
            <div className="fz-1-section-heading">
                <h2 className="fz-section-title text-center">@farzaa.door</h2>
            </div>

            <div className="row g-0 justify-content-center">
                <div className="col-lg-2 col-md-3 col-4">
                    <div className="fz-single-gallery-item">
                        <img src="assets/images/fz-3-img-1.png" alt="Gallery Image"/>
                        <button className="fz-ig-btn"><i className="fa-brands fa-instagram"></i></button>
                    </div>
                </div>
                <div className="col-lg-2 col-md-3 col-4">
                    <div className="fz-single-gallery-item">
                        <img src="assets/images/fz-3-img-2.png" alt="Gallery Image"/>
                        <button className="fz-ig-btn"><i className="fa-brands fa-instagram"></i></button>
                    </div>
                </div>
                <div className="col-lg-2 col-md-3 col-4">
                    <div className="fz-single-gallery-item">
                        <img src="assets/images/fz-3-img-3.png" alt="Gallery Image"/>
                        <button className="fz-ig-btn"><i className="fa-brands fa-instagram"></i></button>
                    </div>
                </div>
                <div className="col-lg-2 col-md-3 col-4">
                    <div className="fz-single-gallery-item">
                        <img src="assets/images/fz-3-img-4.png" alt="Gallery Image"/>
                        <button className="fz-ig-btn"><i className="fa-brands fa-instagram"></i></button>
                    </div>
                </div>

                <div className="col-lg-2 col-md-3 col-4">
                    <div className="fz-single-gallery-item">
                        <img src="assets/images/fz-3-img-5.png" alt="Gallery Image"/>
                        <button className="fz-ig-btn"><i className="fa-brands fa-instagram"></i></button>
                    </div>
                </div>
                <div className="col-lg-2 col-md-3 col-4">
                    <div className="fz-single-gallery-item">
                        <img src="assets/images/fz-3-img-6.png" alt="Gallery Image"/>
                        <button className="fz-ig-btn"><i className="fa-brands fa-instagram"></i></button>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default GallerySection