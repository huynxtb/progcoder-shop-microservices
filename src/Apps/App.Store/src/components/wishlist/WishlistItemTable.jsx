import { useContext } from 'react'
import { FarzaaContext } from '../../context/FarzaaContext'
import { Link } from 'react-router-dom'

const WishlistItemTable = ({wishlistArray,removeItem}) => {
    const {addToCartFromWishlist} = useContext(FarzaaContext)
  return (
    <div className='wishlist-table'>
       <table >
        <tbody>
            <tr>
                <th>Product</th>
                <th>price</th>
                <th>action</th>
                <th>remove</th>
            </tr>
            {wishlistArray.length === 0 ? (
                    <tr className='no-item-msg'>
                        <td className='no-item-msg-text'>No items in the wishlist.</td>
                    </tr>
                ) : (
                    wishlistArray.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <div className="cart-product">
                                    <div className="cart-product__img">
                                        <img src={item.imgSrc} alt="Product Image"/>
                                    </div>
                                    <div className="cart-product__txt">
                                        <h6><Link to="/shopDetails">{item.name}</Link></h6>
                                    </div>
                                </div>
                            </td>
                            <td>${item.price}</td>
                            <td>
                                <div className="fz-wishlist-action">
                                    <button 
                                    className="fz-add-to-cart-btn fz-1-banner-btn fz-wishlist-action-btn"
                                    onClick={() => addToCartFromWishlist(item)}
                                    >Add to cart</button>
                                </div>
                            </td>
                            <td>
                                <button
                                    className="item-remove-btn"
                                    onClick={() => removeItem(item.id)}
                                >
                                    <i className="fa-light fa-xmark"></i>
                                </button>

                            </td>
                        </tr>
                    ))
                )}

        </tbody>
    </table> 
    </div>
    
  )
}

export default WishlistItemTable