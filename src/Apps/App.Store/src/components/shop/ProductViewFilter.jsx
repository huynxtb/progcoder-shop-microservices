import { FarzaaContext } from '../../context/FarzaaContext';
import React, { useContext } from 'react'
import { useTranslation } from "react-i18next";
import { Form } from 'react-bootstrap'

const ProductViewFilter = () => {
    const { t } = useTranslation();
    const {
        isListView,
        setListView,
        setGridView,
        handleSortChange,
        sortBy,
        currentPage,
        productsPerPage,
        totalProducts,
    } = useContext(FarzaaContext)
    const startItem = (currentPage - 1) * productsPerPage + 1;
    const endItem = Math.min(currentPage * productsPerPage, totalProducts);
  return (
    <div className="product-view-actions">
        <div className="row gy-3 align-items-center">
            <div className="col-xxl-6 col-xl-6 col-lg-5 col-6 col-xxs-12 text-center text-md-start">
                <p className="text-center text-sm-start">{t("shop.showingResults", "Showing {{start}}-{{end}} of {{total}} results", { start: startItem, end: endItem, total: totalProducts })}</p>
            </div>

            <div className="col-xxl-6 col-xl-6 col-lg-7 col-6 col-xxs-12 col-sm-6">
                <div className="product-view-right-actions text-center text-md-end d-flex justify-content-center justify-content-md-end">
                    <div className="view-type">
                        <button className={`grid-view ${isListView? '' :'active'}`} onClick={setGridView}>
                            <i className="fa-solid fa-grid-2"></i>
                        </button>

                        <button className={`list-view ${isListView? 'active' :''}`} onClick={setListView}>
                            <i className="fa-light fa-list"></i>
                        </button>
                    </div>

                    <div className="product-sorting d-inline-block">
                        <form className="" action="#">
                            <Form.Select className="nice-select" onChange={handleSortChange} value={sortBy}>
                            <option value="">{t("shop.default", "Default")}</option>
                            <option value="name-az">{t("common.nameAZ")}</option>
                            <option value="name-za">{t("common.nameZA")}</option>
                            <option value="price-low-high">{t("common.priceLowToHigh")}</option>
                            <option value="price-high-low">{t("common.priceHighToLow")}</option>
                            </Form.Select>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductViewFilter