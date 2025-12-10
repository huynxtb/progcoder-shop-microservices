import React from 'react'
import { useTranslation } from "react-i18next";
import BreadcrumbSection from '../breadcrumb/BreadcrumbSection'
import ShopAreaSection from '../shop/ShopAreaSection'

const ShopMain = () => {
  const { t } = useTranslation();
  return (
    <>
        <BreadcrumbSection title={t("shop.title", "Shop Page")} current={t("common.products")}/>
        <ShopAreaSection/>
    </>
  )
}

export default ShopMain