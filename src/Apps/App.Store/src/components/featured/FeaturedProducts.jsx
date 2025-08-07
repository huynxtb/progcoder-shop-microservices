import React, { useContext } from 'react'
import { FarzaaContext } from '../../context/FarzaaContext'
import { Link } from 'react-router-dom'

const FeaturedProducts = () => {
    const {
        addToCart,
        addToWishlist,
        filteredProducts
    } = useContext(FarzaaContext)
  return (
    <section className="featured-product-section">
        <div className="container">
            <div className="fz-1-section-heading">
                <h2 className="fz-section-title">Featured Product</h2>
            </div>

            <div className="row gy-4">
                {filteredProducts.slice(-2).map((item) => (
                  <div className="col-6 col-xxs-12" key={item.id}>
                    <div className="fz-feat-single-product fz-1-single-product">
                        <div className="fz-single-product__img">
                            <img src={item.imgSrc} alt="Product image"/>
                            <span className="fz-single-product__tag">-30%</span>

                            <div className="fz-single-product__actions">
                                <button 
                                className="fz-add-to-wishlist-btn"
                                onClick={() => addToWishlist(item.id)}
                                >
                                    <span className="btn-txt">add To wishlist</span>
                                    <span className="btn-icon">{item.isInWishlist? (<i className="fa-solid fa-heart"></i>):(<i className="fa-light fa-heart"></i>)}</span>
                                </button>

                                <button 
                                className="fz-add-to-cart-btn"
                                onClick={() => addToCart(item.id)}
                                >
                                    <span className="btn-txt">add To cart</span>
                                    <span className="btn-icon"><i className="fa-light fa-cart-shopping"></i></span>
                                </button>

                                <button className="fz-add-to-compare-btn">
                                    <span className="btn-txt">select to compare</span>
                                    <span className="btn-icon"><i className="fa-light fa-arrow-right-arrow-left"></i></span>
                                </button>
                            </div>
                        </div>

                        <div className="fz-single-product__txt">
                            <h3 className="fz-single-product__title"><Link to="/shop-details">{item.name}</Link></h3>
                            <p className="fz-single-product__price">
                                <span className="current-price">${item.price}</span>
                                <span className="prev-price text-decoration-line-through">${item.oldPrice}</span>
                            </p>
                        </div>
                    </div>
                </div>  
                ))}
                
            </div>
        </div>
    </section>
  )
}

export default FeaturedProducts