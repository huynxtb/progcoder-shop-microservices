import React, { useContext } from 'react'
import { useTranslation } from "react-i18next";
import { FarzaaContext } from '../../context/FarzaaContext'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/format'

const ProductContainer = () => {
    const { t } = useTranslation();
    const {
        isListView,
        paginatedProducts,
        addToCart,
        addToWishlist,
    } = useContext(FarzaaContext)
  return (
    <div className={`fz-inner-products-container ${isListView? 'list-view-on':''}`}>
        <div className="row justify-content-center">
            {paginatedProducts.length === 0 ? (
                <div className='no-product-area'>
                    <h3 className='no-product-text'>{t("shop.noProductsAvailable", "No Products Available")}</h3>
                    <p className='no-product-desc'>{t("shop.noSearchResults", "We're sorry. We cannot find any matches for your search term.")}</p>
                </div>
            ):(
              paginatedProducts.map((item) => (
             <div className="col-xl-4 col-md-4 col-6 col-xxs-12" key={item.id}>
                <div className="fz-1-single-product">
                    <div className="fz-single-product__img">
                        <img src={item.imgSrc} alt={item.name}/>
                        <div className="fz-single-product__actions">
                            <button 
                            className="fz-add-to-wishlist-btn"
                            onClick={() => addToWishlist(item.id)}
                            >
                                <span className="btn-txt">{t("common.addToWishlist")}</span>
                                <span className="btn-icon">{item.isInWishlist? (<i className="fa-solid fa-heart"></i>):(<i className="fa-light fa-heart"></i>)}</span>
                            </button>

                            <button 
                            className="fz-add-to-cart-btn"
                            onClick={() => addToCart(item.id)}
                            >
                                <span className="btn-txt">{t("common.addToCart")}</span>
                                <span className="btn-icon"><i className="fa-light fa-cart-shopping"></i></span>
                            </button>

                            <button className="fz-add-to-compare-btn">
                                <span className="btn-txt">{t("shop.selectToCompare", "Select to compare")}</span>
                                <span className="btn-icon"><i className="fa-light fa-arrow-right-arrow-left"></i></span>
                            </button>
                        </div>
                    </div>

                    <div className="fz-single-product__txt">
                        {item.displayStatus && (
                            <span className="fz-single-product__category list-view-text">{item.displayStatus}</span>
                        )}
                        <Link to={`/shopDetails/${item.id}`} className="fz-single-product__title">{item.name}</Link>
                        <div className="fz-single-product__price-rating">
                            <p className="fz-single-product__price">
                                {item.salePrice && item.salePrice > 0 ? (
                                    <>
                                        <span className="current-price">{formatCurrency(item.salePrice)}</span>
                                        <span className="old-price">{formatCurrency(item.price)}</span>
                                    </>
                                ) : (
                                    <span className="current-price">{formatCurrency(item.price)}</span>
                                )}
                            </p>

                            <div className="rating list-view-text">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-light fa-star"></i>
                            </div>
                        </div>

                        {item.sku && (
                            <p className="fz-single-product__desc list-view-text">
                                SKU: {item.sku}
                            </p>
                        )}

                        <div className="fz-single-product__actions list-view-text">
                            <button 
                            className="fz-add-to-wishlist-btn"
                            onClick={() => addToWishlist(item.id)}
                            >                                
                                <span className="btn-txt">{t("common.addToWishlist")}</span>
                                <span className="btn-icon">{item.isInWishlist? (<i className="fa-solid fa-heart"></i>):(<i className="fa-light fa-heart"></i>)}</span>
                            </button>

                            <button 
                            className="fz-add-to-cart-btn"
                            onClick={() => addToCart(item.id)}
                            >
                                <span className="btn-txt">{t("common.addToCart")}</span>
                                <span className="btn-icon"><i className="fa-light fa-cart-shopping"></i></span>
                            </button>

                            <button className="fz-add-to-compare-btn">
                                <span className="btn-txt">{t("shop.selectToCompare", "Select to compare")}</span>
                                <span className="btn-icon"><i className="fa-light fa-arrow-right-arrow-left"></i></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>   
            ))  
            )}
            
        </div>
    </div>
  )
}

export default ProductContainer