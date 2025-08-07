import React, { useContext } from 'react'
import { FarzaaContext } from '../../context/FarzaaContext'
import { Link } from 'react-router-dom'

const RelatedProductSection = () => {
    const {
        paginatedProducts,
        addToCart,
        addToWishlist
    } = useContext(FarzaaContext)
  return (
    <section className="related-product-section">
        <div className="container">
            <h2 className="related-product__title">Related Products</h2>
            <div className="row gy-sm-4 g-3 justify-content-center">
                {paginatedProducts.slice(0,4).map((item) => (
                   <div className="col-lg-3 col-md-4 col-6 col-xxs-12" key={item.id}>
                    <div className="fz-1-single-product">
                        <div className="fz-single-product__img">
                            <img src={item.imgSrc} alt="Product Image"/>
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
                            <Link to="#" className="fz-single-product__title">{item.name}</Link>
                            <div className="fz-single-product__price-rating">
                                <p className="fz-single-product__price">
                                    <span className="current-price">${item.price}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div> 
                ))}
                
            </div>
        </div>
    </section>
  )
}

export default RelatedProductSection