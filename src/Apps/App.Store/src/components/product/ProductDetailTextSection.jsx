import React from 'react'
import ProductDetailAction from './ProductDetailAction';

const ProductDetailTextSection = ({ product }) => {
  // Format price with currency
  const formatPrice = (price) => {
    if (!price) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Calculate discount percentage
  const getDiscountPercentage = () => {
    if (product && product.salePrice && product.salePrice > 0 && product.price > product.salePrice) {
      const discount = ((product.price - product.salePrice) / product.price) * 100;
      return Math.round(discount);
    }
    return null;
  };

  // Get display price (salePrice if available, otherwise price)
  const getDisplayPrice = () => {
    if (product) {
      if (product.salePrice && product.salePrice > 0) {
        return formatPrice(product.salePrice);
      }
      return formatPrice(product.price);
    }
    return '$750.00';
  };

  // Get original price if on sale
  const getOriginalPrice = () => {
    if (product && product.salePrice && product.salePrice > 0 && product.price > product.salePrice) {
      return formatPrice(product.price);
    }
    return null;
  };

  const displayPrice = getDisplayPrice();
  const originalPrice = getOriginalPrice();
  const discountPercent = getDiscountPercentage();
  const isOnSale = discountPercent !== null;

  return (
    <div className="fz-product-details__txt">
        {/* Brand Name */}
        {product?.brandName && (
          <div className="fz-product-details__brand" style={{ marginBottom: '10px' }}>
            <span style={{ 
              fontSize: '14px', 
              color: '#666', 
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: '500'
            }}>
              {product.brandName}
            </span>
          </div>
        )}

        {/* Title with badges */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', marginBottom: '15px' }}>
          <h2 className="fz-product-details__title" style={{ flex: 1, margin: 0 }}>
            {product?.name || 'Contemporary 4 Panel White Primed Door (40mm)'}
          </h2>
          {product?.featured && (
            <span style={{
              padding: '4px 12px',
              backgroundColor: '#ff6b6b',
              color: 'white',
              fontSize: '11px',
              fontWeight: '600',
              borderRadius: '4px',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap'
            }}>
              Featured
            </span>
          )}
        </div>

        {/* Price with discount badge */}
        <div className="fz-product-details__price-rating" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
              <span className="price" style={{ fontSize: '28px', fontWeight: '700', color: '#333' }}>
                {displayPrice}
                {originalPrice && (
                  <span style={{ 
                    textDecoration: 'line-through', 
                    marginLeft: '12px', 
                    fontSize: '20px',
                    color: '#999',
                    fontWeight: '400'
                  }}>
                    {originalPrice}
                  </span>
                )}
              </span>
              {isOnSale && (
                <span style={{
                  padding: '4px 10px',
                  backgroundColor: '#ff4757',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: '600',
                  borderRadius: '4px'
                }}>
                  -{discountPercent}%
                </span>
              )}
            </div>
            <div className="rating" style={{ marginTop: '8px' }}>
                <i className="fa-solid fa-star" style={{ color: '#ffc107' }}></i>
                <i className="fa-solid fa-star" style={{ color: '#ffc107' }}></i>
                <i className="fa-solid fa-star" style={{ color: '#ffc107' }}></i>
                <i className="fa-solid fa-star" style={{ color: '#ffc107' }}></i>
                <i className="fa-light fa-star" style={{ color: '#ddd' }}></i>
                <span style={{ marginLeft: '8px', fontSize: '14px', color: '#666' }}>(4.0)</span>
            </div>
        </div>

        {/* Product Info */}
        <div className="fz-product-details__infos" style={{ marginBottom: '25px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                  <span className="info-property" style={{ fontWeight: '600', minWidth: '120px', color: '#333' }}>SKU:</span>
                  <span className="info-value" style={{ color: '#666' }}>{product?.sku || 'N/A'}</span>
                </li>
                <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                  <span className="info-property" style={{ fontWeight: '600', minWidth: '120px', color: '#333' }}>Category:</span>
                  <span className="info-value" style={{ color: '#666' }}>
                    {product?.categoryNames?.join(', ') || 'N/A'}
                  </span>
                </li>
                <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                  <span className="info-property" style={{ fontWeight: '600', minWidth: '120px', color: '#333' }}>Availability:</span>
                  <span className="info-value" style={{ 
                    color: product?.isAvaiable ? '#28a745' : '#dc3545',
                    fontWeight: '500'
                  }}>
                    {product?.displayStatus || 'Out of Stock'}
                  </span>
                </li>
                {product?.unit && (
                  <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                    <span className="info-property" style={{ fontWeight: '600', minWidth: '120px', color: '#333' }}>Unit:</span>
                    <span className="info-value" style={{ color: '#666' }}>{product.unit}</span>
                  </li>
                )}
                {product?.weight && (
                  <li style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="info-property" style={{ fontWeight: '600', minWidth: '120px', color: '#333' }}>Weight:</span>
                    <span className="info-value" style={{ color: '#666' }}>{product.weight} kg</span>
                  </li>
                )}
            </ul>
        </div>

        {/* Short Description */}
        <p className="fz-product-details__short-descr" style={{ 
          fontSize: '15px', 
          lineHeight: '1.8', 
          color: '#555',
          marginBottom: '25px'
        }}>
          {product?.shortDescription || 'Each controller comes with adjustable in-built dual shock mechanism. They can be toggled on/off and shock setting of 1,2 and 3 Auxiliary buttons around the home button enable more key bindings to be designated.'}
        </p>

        {/* Tags */}
        {product?.tags && product.tags.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginRight: '10px' }}>Tags:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
              {product.tags.map((tag, index) => (
                <span key={index} style={{
                  padding: '6px 14px',
                  backgroundColor: '#e9ecef',
                  color: '#495057',
                  fontSize: '13px',
                  borderRadius: '20px',
                  fontWeight: '500'
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <ProductDetailAction product={product}/>

    </div>
  )
}

export default ProductDetailTextSection