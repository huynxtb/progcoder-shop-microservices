import React from 'react'

const ProductDescTabPane = ({ product }) => {
  const defaultDescription = 'Each controller comes with adjustable in-built dual shock mechanism. They can be toggled on/off and shock setting of 1,2 and 3 Auxiliary buttons around the home button enable more key bindings to be designated. Designed as PS3 Controllers Can be used in all PC to enough time to play Condition 8.5/10 Only a small rust on one of the USB heads. A very minor crack at the bottom of the Red Controller';

  const description = product?.longDescription || defaultDescription;

  // Product specifications
  const specifications = [];
  if (product?.sku) specifications.push({ label: 'SKU', value: product.sku });
  if (product?.categoryNames?.length > 0) specifications.push({ label: 'Categories', value: product.categoryNames.join(', ') });
  if (product?.brandName) specifications.push({ label: 'Brand', value: product.brandName });
  if (product?.unit) specifications.push({ label: 'Unit', value: product.unit });
  if (product?.weight) specifications.push({ label: 'Weight', value: `${product.weight} kg` });
  if (product?.colors?.length > 0) specifications.push({ label: 'Colors', value: product.colors.join(', ') });
  if (product?.sizes?.length > 0) specifications.push({ label: 'Sizes', value: product.sizes.join(', ') });

  return (
    <div className="fz-product-details__descr" style={{ padding: '20px 0' }}>
        {/* Long Description */}
        <div style={{ marginBottom: '30px' }}>
          <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>Description</h4>
          <p style={{ 
            fontSize: '15px', 
            lineHeight: '1.8', 
            color: '#555',
            whiteSpace: 'pre-wrap'
          }}>
            {description}
          </p>
        </div>

        {/* Specifications */}
        {specifications.length > 0 && (
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>Specifications</h4>
            <div style={{
              border: '1px solid #e9ecef',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {specifications.map((spec, index) => (
                    <tr 
                      key={index}
                      style={{
                        borderBottom: index < specifications.length - 1 ? '1px solid #e9ecef' : 'none',
                        backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa'
                      }}
                    >
                      <td style={{
                        padding: '12px 20px',
                        fontWeight: '600',
                        color: '#333',
                        width: '200px',
                        borderRight: '1px solid #e9ecef'
                      }}>
                        {spec.label}
                      </td>
                      <td style={{
                        padding: '12px 20px',
                        color: '#666'
                      }}>
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tags */}
        {product?.tags && product.tags.length > 0 && (
          <div style={{ marginTop: '30px' }}>
            <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>Tags</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {product.tags.map((tag, index) => (
                <span key={index} style={{
                  padding: '8px 16px',
                  backgroundColor: '#e9ecef',
                  color: '#495057',
                  fontSize: '14px',
                  borderRadius: '20px',
                  fontWeight: '500'
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
    </div>
  )
}

export default ProductDescTabPane