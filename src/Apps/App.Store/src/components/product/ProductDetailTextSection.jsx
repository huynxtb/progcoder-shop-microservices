import React from 'react'
import ProductDetailAction from './ProductDetailAction';

const ProductDetailTextSection = () => {
  return (
    <div className="fz-product-details__txt">
        <h2 className="fz-product-details__title">Contemporary 4 Panel White Primed Door (40mm)</h2>
        <div className="fz-product-details__price-rating">
            <span className="price">$750.00</span>
            <div className="rating">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-light fa-star"></i>
            </div>
        </div>

        <div className="fz-product-details__infos">
            <ul>
                <li><span className="info-property"> SKU </span> : <span className="info-value">D890f</span></li>
                <li><span className="info-property"> Category </span> : <span className="info-value">Security Door</span></li>
                <li><span className="info-property"> Availablity </span> : <span className="info-value">in Stock</span></li>
            </ul>
        </div>

        <p className="fz-product-details__short-descr">
            Each controller comes with adjustable in-built dual shock mechanism. They can be
            toggled on/off and shock setting of 1,2 and 3 Auxiliary buttons around the home
            button enable more key bindings to be designated.
        </p>

        <ProductDetailAction/>

        <div className="fz-product-details__payment-methods">
            <img src="assets/images/card.png" alt="Pyament Methods"/>
            <span className="dialog">Guaranteed safe & secure checkout</span>
        </div>
    </div>
  )
}

export default ProductDetailTextSection