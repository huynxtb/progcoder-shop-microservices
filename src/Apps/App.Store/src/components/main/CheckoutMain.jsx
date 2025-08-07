import React from 'react'
import BreadcrumbSection from '../breadcrumb/BreadcrumbSection'
import CheckoutSection from '../checkout/CheckoutSection'

const CheckoutMain = () => {
  return (
    <>
    <BreadcrumbSection title={"Checkout"} current={"Checkout"}/>
    <CheckoutSection/>
    </>
  )
}

export default CheckoutMain