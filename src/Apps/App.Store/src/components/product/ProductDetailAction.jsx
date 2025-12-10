import React, { useState } from 'react'

const ProductDetailAction = ({ product }) => {
    const defaultQuantity = 1;
    const [quantity, setQuantity] = useState(defaultQuantity);
    const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
    const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    // Color mapping for display
    const getColorStyle = (colorName) => {
        const colorMap = {
            'Blue': '#007bff',
            'Green': '#28a745',
            'Red': '#dc3545',
            'Black': '#000000',
            'White': '#ffffff',
            'Yellow': '#ffc107',
            'Orange': '#fd7e14',
            'Purple': '#6f42c1',
            'Pink': '#e83e8c',
            'Gray': '#6c757d',
            'Grey': '#6c757d',
        };
        return colorMap[colorName] || '#ccc';
    };

    const handleAddToCart = () => {
        // TODO: Implement add to cart logic with selected color, size, and quantity
        console.log('Add to cart:', {
            productId: product?.id,
            color: selectedColor,
            size: selectedSize,
            quantity
        });
    };

    const handleAddToWishlist = () => {
        // TODO: Implement add to wishlist logic
        console.log('Add to wishlist:', product?.id);
    };

  return (
    <div>
        {/* Color Selection */}
        {product?.colors && product.colors.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ marginBottom: '10px', fontSize: '15px', fontWeight: '600', color: '#333' }}>
              Color: <span style={{ fontWeight: '400', color: '#666' }}>{selectedColor}</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: selectedColor === color ? '3px solid #333' : '2px solid #ddd',
                    backgroundColor: getColorStyle(color),
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: selectedColor === color ? '0 0 0 2px rgba(0,0,0,0.1)' : 'none',
                    position: 'relative'
                  }}
                  title={color}
                >
                  {selectedColor === color && (
                    <i className="fa-solid fa-check" style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: color === 'White' || color === 'Yellow' ? '#333' : '#fff',
                      fontSize: '14px'
                    }}></i>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size Selection */}
        {product?.sizes && product.sizes.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <div style={{ marginBottom: '10px', fontSize: '15px', fontWeight: '600', color: '#333' }}>
              Size: <span style={{ fontWeight: '400', color: '#666' }}>{selectedSize}</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    minWidth: '45px',
                    height: '45px',
                    padding: '0 15px',
                    border: selectedSize === size ? '2px solid #333' : '1px solid #ddd',
                    backgroundColor: selectedSize === size ? '#333' : '#fff',
                    color: selectedSize === size ? '#fff' : '#333',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '14px',
                    transition: 'all 0.3s',
                    textTransform: 'uppercase'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity and Actions - Separate Row */}
        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          alignItems: 'center', 
          flexWrap: 'wrap',
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: '1px solid #e9ecef'
        }}>
            <div className="fz-product-details__quantity cart-product__quantity" style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
                <button 
                  className="minus-btn cart-product__minus" 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  style={{
                    width: '45px',
                    height: '45px',
                    border: 'none',
                    backgroundColor: '#f8f9fa',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                    <i className="fa-light fa-minus"></i>
                </button>
                <input
                    type="number"
                    name="product-quantity"
                    className="cart-product-quantity-input"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    style={{
                      width: '60px',
                      height: '45px',
                      border: 'none',
                      textAlign: 'center',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                />
                <button 
                  className="plus-btn cart-product__plus" 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  style={{
                    width: '45px',
                    height: '45px',
                    border: 'none',
                    backgroundColor: '#f8f9fa',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                    <i className="fa-light fa-plus"></i>
                </button>
            </div>
            <button 
              className="fz-product-details__add-to-cart"
              onClick={handleAddToCart}
              style={{
                flex: 1,
                minWidth: '200px',
                height: '45px',
                backgroundColor: '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#333'}
            >
              Add to cart
            </button>
            <button 
              className="fz-product-details__add-to-wishlist"
              onClick={handleAddToWishlist}
              style={{
                width: '45px',
                height: '45px',
                border: '1px solid #ddd',
                backgroundColor: '#fff',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#333';
                e.target.style.color = '#ff4757';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#ddd';
                e.target.style.color = '#333';
              }}
            >
              <i className="fa-light fa-heart" style={{ fontSize: '18px' }}></i>
            </button>
        </div>
    </div>
  )
}

export default ProductDetailAction