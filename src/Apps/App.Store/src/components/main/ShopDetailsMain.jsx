import React from 'react'
import BreadcrumbSection from '../breadcrumb/BreadcrumbSection'
import ProductDetailSection from '../product/ProductDetailSection'
import RelatedProductSection from '../product/RelatedProductSection'

const ShopDetailsMain = ({ product }) => {
  const breadcrumbTitle = product?.name || "Shop Details";
  return (
    <>
        <BreadcrumbSection title={breadcrumbTitle} current={breadcrumbTitle}/>
        <ProductDetailSection product={product}/>
        <RelatedProductSection/>
    </>
  )
}

export default ShopDetailsMain