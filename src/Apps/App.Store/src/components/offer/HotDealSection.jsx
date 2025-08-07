import React, { useContext } from 'react'
import { FarzaaContext } from '../../context/FarzaaContext'
import { Link } from 'react-router-dom'
import CountdownSection from '../timer/CountdownSection'

const HotDealSection = () => {
    const {addToJeweleryWishlist,addToJeweleryCart,jeweleryArray} = useContext(FarzaaContext)
  return (
    <section className="fz-2-hot-deal-section">
        <div className="container">
            <div className="fz-2-section-heading">
                <div className="row gy-4 align-items-center">
                    <div className="col-md-6">
                        <h2 className="fz-section-title">Hot Deals For Jewelry</h2>
                    </div>
                    <div className="col-md-6">
                        <CountdownSection/>
                    </div>
                </div>
            </div>

            <div className="fz-hot-deal-products">
                <div className="row gy-md-4 gy-1 gx-3 justify-content-center">
                    {jeweleryArray.slice(0,4).map((item) => (
                        <div className="col-xl-3 col-md-4 col-6 col-xxs-12" key={item.id}>
                            <div className="fz-2-single-product">
                                <div className="fz-2-single-product-img">
                                    <img src={item.imgSrc} alt="Product Image"/>

                                    <div className="fz-2-single-product-actions">
                                        <button 
                                        className="fz-add-to-cart-btn"
                                        onClick={() => addToJeweleryCart(item.id)}
                                        >Add to cart</button>
                                        <button 
                                        className="fz-add-to-wishlist"
                                        onClick={() => addToJeweleryWishlist(item.id)}
                                        >{item.isInWishlist? (<i className="fa-solid fa-heart"></i>):(<i className="fa-regular fa-heart"></i>)}</button>
                                    </div>
                                </div>
                                <div className="fz-2-single-product-txt">
                                    <span className="fz-2-single-product-category"><Link to="/shop">{item.category}</Link></span>
                                    <h5 className="fz-2-single-product-title"><Link to="/shopDetails">{item.name}</Link></h5>
                                    <span className="fz-2-single-product-price">${item.price}<span className="prev-price">${item.oldPrice}</span></span>
                                </div>
                            </div>
                        </div>  
                    ))}
                    
                </div>
            </div>
        </div>
    </section>
  )
}

export default HotDealSection