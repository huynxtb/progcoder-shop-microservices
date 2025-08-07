import React, { useState } from 'react'

const ProductDetailAction = () => {
    const defaultQuantity = 1;
    const [quantity, setQuantity] = useState(defaultQuantity);

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };
  return (
    <div className="fz-product-details__actions">
        <div className="fz-product-details__quantity cart-product__quantity">
            <button className="minus-btn cart-product__minus" onClick={() => handleQuantityChange(quantity - 1)}>
                <i className="fa-light fa-minus"></i>
            </button>
            <input
                type="number"
                name="product-quantity"
                className="cart-product-quantity-input"
                value={quantity}
                onChange={(e) => handleQuantityChange(Math.max(1, parseInt(e.target.value)))}
                min="1"
            />
            <button className="plus-btn cart-product__plus" onClick={() => handleQuantityChange(quantity + 1)}>
                <i className="fa-light fa-plus"></i>
            </button>
        </div>
        <button className="fz-product-details__add-to-cart">Add to cart</button>
        <button className="fz-product-details__add-to-wishlist"><i className="fa-light fa-heart"></i></button>
    </div>
  )
}

export default ProductDetailAction