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
        productsLoading,
    } = useContext(FarzaaContext)
    
  return (
    <div className={`fz-inner-products-container ${isListView? 'list-view-on':''}`}>
        <div className="row justify-content-center">
            {productsLoading ? (
                <div className='col-12' style={{ padding: '60px 0', textAlign: 'center' }}>
                    <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p style={{ marginTop: '20px', fontSize: '16px' }}>{t("common.loading", "Loading...")}</p>
                </div>
            ) : paginatedProducts.length === 0 ? (
                <div className='no-product-area'>
                    <h3 className='no-product-text'>{t("shop.noProductsAvailable", "No Products Available")}</h3>
                    <p className='no-product-desc'>{t("shop.noSearchResults", "We're sorry. We cannot find any matches for your search term.")}</p>
                </div>
            ):(
              paginatedProducts.map((item) => (
             <div className="col-xl-4 col-md-4 col-6 col-xxs-12" key={item.id}>
                <div className="fz-1-single-product">
                    <div className="fz-single-product__img" style={{ position: 'relative' }}>
                        {/* Badges ở góc trên bên phải */}
                        <div style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          zIndex: 10,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          alignItems: 'flex-end'
                        }}>
                          {/* Featured Badge */}
                          {item.featured && (
                            <span style={{
                              padding: '4px 10px',
                              backgroundColor: '#ff6b6b',
                              color: 'white',
                              fontSize: '10px',
                              fontWeight: '600',
                              borderRadius: '4px',
                              textTransform: 'uppercase',
                              whiteSpace: 'nowrap',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }}>
                              Featured
                            </span>
                          )}
                          {/* Display Status Badge */}
                          {item.displayStatus && (
                            <span style={{
                              padding: '4px 10px',
                              backgroundColor: item.status === 1 ? '#28a745' : '#dc3545',
                              color: 'white',
                              fontSize: '10px',
                              fontWeight: '600',
                              borderRadius: '4px',
                              textTransform: 'uppercase',
                              whiteSpace: 'nowrap',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }}>
                              {item.displayStatus}
                            </span>
                          )}
                        </div>
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
                        <Link to={`/products/${item.id}`} className="fz-single-product__title" style={{ 
                          display: 'block',
                          marginBottom: '10px',
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#333',
                          textDecoration: 'none',
                          transition: 'color 0.3s'
                        }}
                        onMouseEnter={(e) => e.target.style.color = '#666'}
                        onMouseLeave={(e) => e.target.style.color = '#333'}
                        >
                          {item.name}
                        </Link>
                        <div className="fz-single-product__price-rating" style={{ marginBottom: '10px' }}>
                            <p className="fz-single-product__price" style={{ margin: 0, marginBottom: '8px' }}>
                                {item.salePrice && item.salePrice > 0 ? (
                                    <>
                                        <span className="current-price" style={{ 
                                          fontSize: '18px', 
                                          fontWeight: '700', 
                                          color: '#333',
                                          marginRight: '10px'
                                        }}>
                                          {formatCurrency(item.salePrice)}
                                        </span>
                                        <span className="old-price" style={{ 
                                          fontSize: '14px', 
                                          color: '#999',
                                          textDecoration: 'line-through'
                                        }}>
                                          {formatCurrency(item.price)}
                                        </span>
                                    </>
                                ) : (
                                    <span className="current-price" style={{ 
                                      fontSize: '18px', 
                                      fontWeight: '700', 
                                      color: '#333'
                                    }}>
                                      {formatCurrency(item.price)}
                                    </span>
                                )}
                            </p>
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