import React from 'react'
import { Link } from 'react-router-dom'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { thirdBannerData } from '../../data/Data'

const BannerSection3 = () => {
  return (
    <section className="fz-3-banner-section">
        <div className="container position-relative">
            <div className="fz-3-banner-left-actions">
                <div className="fz-3-banner-search-box">
                    <form action="#">
                        <label htmlFor="fz-3-banner-search"><i className="fa-regular fa-magnifying-glass"></i></label>
                        <input type="search" name="search" id="fz-3-banner-search" placeholder="Search"/>
                    </form>
                </div>
            </div>

            <Swiper 
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            modules={[Autoplay]}
            className="fz-3-banner-slider owl-carousel"
            >
                {thirdBannerData.map((item) => (
                    <SwiperSlide className="fz-3-banner-single-slide" key={item.id}>
                        <div className="row align-items-center justify-content-center">
                            <div className="col-xl-7 col-lg-10">
                                <div className="fz-3-banner-txt">
                                    <img src="assets/images/fz-1-banner-sticker.png" alt="Company trademark"/>
                                    <h1>{item.title}</h1>
                                    <p>{item.desc}</p>

                                    <div className="fz-def_btn_wrapper">
                                        <Link to="/shop" className="fz-def-btn">
                                            <span></span>
                                            Shop Now
                                            <i className="fa-light fa-arrow-up-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="fz-3-banner-product-cards">
                            <div className="fz-3-single-product">
                                <img src={item.firstImgSrc} alt="Product Image"/>
                                <h5 className="fz-3-single-product__title"><Link to="/shopDetails">Chocolate Coated Cake</Link></h5>
                                <p className="fz-3-single-product__price">${item.firstPrice}</p>
                            </div>

                            <div className="fz-3-single-product fz-3-single-product-2">
                                <img src={item.secondImgSrc} alt="Product Image"/>
                                <h5 className="fz-3-single-product__title"><Link to="/shopDetails">Chocolate Layer Cake</Link></h5>
                                <p className="fz-3-single-product__price">${item.secondPrice}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                
            </Swiper>
        </div>
    </section>
  )
}

export default BannerSection3