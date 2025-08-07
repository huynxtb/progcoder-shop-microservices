import React from 'react'
import BreadcrumbSection from '../breadcrumb/BreadcrumbSection'
import ShopAreaSection from '../shop/ShopAreaSection'

const ShopMain = () => {
  return (
    <>
        <BreadcrumbSection title={"Shop Page"} current={"Products"}/>
        <ShopAreaSection/>
    </>
  )
}

export default ShopMain