import React, { useContext } from 'react'
import WishlistItemTable from './WishlistItemTable'
import { FarzaaContext } from '../../context/FarzaaContext'
import { Link } from 'react-router-dom'

const WishlistSection = () => {
    const {
        wishlist,
        handleRemoveItemWishlist,
        handleQuantityChangeWishlist,
        addWishlistToCart
    } = useContext(FarzaaContext)
  return (
    <div className="container">
        <div className="cart-section wishlist-section">
            <div className="cart-left wishlist-inner-section">
                <div className="cart-area">
                    <div className="cart__body">
                        <div className="table-responsive">
                            <WishlistItemTable wishlistArray={wishlist} removeItem={handleRemoveItemWishlist} quantity={handleQuantityChangeWishlist}/>
                        </div>
                        <div className="cart-left-actions d-flex justify-content-end">
                            {wishlist.length === 0 ? (
                                <Link className="fz-1-banner-btn update-cart-btn" to='/shop'>Go to Shop</Link>  
                            ):(
                              <button type="submit" className="fz-1-banner-btn update-cart-btn" onClick={addWishlistToCart}>Add all product to cart</button>  
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WishlistSection