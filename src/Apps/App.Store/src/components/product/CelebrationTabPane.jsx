import React, { useContext } from 'react'
import { FarzaaContext } from '../../context/FarzaaContext'
import { Link } from 'react-router-dom'


const CelebrationTabPane = () => {
    const {addToCakeCart,addToCakeWishlist,handleProductViewOpen,randomizedCakesSecond} = useContext(FarzaaContext)
  return (
    <div className="row g-3 g-lg-4 justify-content-center">
        {randomizedCakesSecond.slice(-8).map((item) => (
           <div className="col-lg-3 col-md-4 col-6 col-xxs-12" key={item.id}>
                <div className="fz-3-single-product">
                    <div className="fz-3-single-product__img">
                        <img src={item.imgSrc} alt={item.name}/>
                        <div className="fz-3-single-product__actions">
                            <div className="top-actions">
                                <button
                                    className="fz-3-add-to-wishlist"
                                    onClick={() => addToCakeWishlist(item.id)}
                                >{
                                    item.isInWishlist? (<i className='fa-solid fa-heart'></i>):(<i className='fa-light fa-heart'></i>)
                                }</button>
                            </div>
                            <div className="bottom-actions">
                                <button 
                                className="fz-3-add-to-cart"
                                onClick={() => addToCakeCart(item.id)}
                                >Add to cart</button>
                                <button 
                                className="fz-3-quick-view"
                                onClick={handleProductViewOpen}
                                >Quick view</button>
                            </div>
                        </div>
                    </div>

                    <div className="fz-3-single-product__txt">
                        <Link to="/shopDetails" className="fz-3-single-product__title">{item.name}</Link>
                        <p className="fz-3-single-product__price">
                            <span className="current-price">${item.price}</span>
                            <span className="prev-price text-decoration-line-through">${item.oldPrice}</span>
                        </p>
                    </div>
                </div>
            </div> 
        ))}
    </div>
  )
}

export default CelebrationTabPane