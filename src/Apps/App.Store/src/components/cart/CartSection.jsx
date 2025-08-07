import React, { useContext } from 'react'
import CartItemTable from './CartItemTable'
import { FarzaaContext } from '../../context/FarzaaContext'
import { Link } from 'react-router-dom'

const CartSection = () => {
    const {
        subTotal, 
        shipping, 
        coupon, 
        finalPrice, 
        cartItems,
        handleQuantityChange,
        handleRemoveItem,
    } = useContext(FarzaaContext)
  return (
    <div className="container">
        <div className="cart-section">
            <div className="cart-left inner-cart">
                <div className="cart-area">
                    <div className="cart__body">
                        <div className="table-responsive">
                            <CartItemTable cartArray={cartItems} remove={handleRemoveItem} quantity={handleQuantityChange}/>
                        </div>

                        <div className="cart-left-actions d-flex justify-content-end">
                            {cartItems.length === 0? (
                              <Link className='fz-1-banner-btn update-cart-btn' to='/shop'>Go to Shop</Link>  
                            ):(
                                <form action="#" className="cart-coupon-form">
                                    <input type="text" name="cart-coupon-input" id="cart-coupon-input" placeholder="Enter Your Coupon Code"/>
                                    <button type="submit" className="fz-1-banner-btn coupon-apply-btn">Apply Coupon</button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="cart-checkout-area">
                <h4 className="cart-checkout-area__title">Billing Summary</h4>

                <ul className="checkout-summary">
                    <li>
                        <span className="checkout-summary__key">Subtotal</span>
                        <span className="checkout-summary__value"><span>$</span>{subTotal}</span>
                    </li>

                    <li>
                        <span className="checkout-summary__key">Shipping</span>
                        <span className="checkout-summary__value"><span>$</span>{shipping}</span>
                    </li>

                    <li>
                        <span className="checkout-summary__key">Coupon discount</span>
                        <span className="checkout-summary__value">-<span>$</span>{coupon}</span>
                    </li>

                    <li className="cart-checkout-total">
                        <span className="checkout-summary__key">Total</span>
                        <span className="checkout-summary__value"><span>$</span>{finalPrice}</span>
                    </li>
                </ul>


                <Link to="/checkout" className="fz-1-banner-btn cart-checkout-btn">Proceed to checkout</Link>
            </div>
        </div>
    </div>
  )
}

export default CartSection