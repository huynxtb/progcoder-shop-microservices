import { FarzaaContext } from '../../context/FarzaaContext';
import React, { useContext } from 'react'
import { useTranslation } from "react-i18next";

const SearchFilter = () => {
  const { t } = useTranslation();
  const {searchTerm,handleSearchChange} = useContext(FarzaaContext)
  return (
    <section className="sidebar-single-area product-search-area">
    <h3 className="sidebar-single-area__title">{t("shop.searchProduct", "Search Product")}</h3>
    <form role="search" className="fz-product-search-form">
        <input
            type="search"
            id="woocommerce-product-search-field-0"
            className="search-field"
            placeholder={t("header.searchPlaceholder")}
            value={searchTerm}
            onChange={handleSearchChange}
        />
        <button type="submit" value="Search"><i className="fa-light fa-magnifying-glass"></i></button>
    </form>
</section>
  )
}

export default SearchFilter