import React, { useContext } from 'react'
import { FarzaaContext } from '../../context/FarzaaContext'

const SearchFilter = () => {
    const {searchQuery,handleSearch} = useContext(FarzaaContext)
  return (
    <section className="sidebar-single-area product-search-area">
        <h3 className="sidebar-single-area__title">Search Blog</h3>
        <form role="search" className="fz-product-search-form">
            <input
                type="search"
                id="woocommerce-product-search-field-0"
                className="search-field"
                placeholder="Search products…"
                value={searchQuery}
                onChange={handleSearch}
            />
            <button type="submit" value="Search"><i className="fa-light fa-magnifying-glass"></i></button>
        </form>
    </section>
    )
}

export default SearchFilter