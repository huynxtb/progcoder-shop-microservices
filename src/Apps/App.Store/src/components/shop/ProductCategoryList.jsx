import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { FarzaaContext } from '../../context/FarzaaContext';

const ProductCategoryList = () => {
    const { t } = useTranslation();
    const { handleCategoryFilter, categories, categoriesLoading, totalProducts } = useContext(FarzaaContext);
    const [activeCategory, setActiveCategory] = useState(null);

    const handleCategoryClick = (categoryId) => {
        handleCategoryFilter(categoryId);
        setActiveCategory(categoryId);
    };

    if (categoriesLoading) {
        return (
            <section className="sidebar-single-area product-categories-area">
                <h3 className="sidebar-single-area__title">{t("shop.productCategories", "Product categories")}</h3>
                <ul className="product-categories">
                    <li>{t("common.loading", "Loading...")}</li>
                </ul>
            </section>
        );
    }

    return (
        <section className="sidebar-single-area product-categories-area">
            <h3 className="sidebar-single-area__title">{t("shop.productCategories", "Product categories")}</h3>
            <ul className="product-categories">
                <li
                    key="all"
                    onClick={() => handleCategoryClick(null)}
                    className={activeCategory === null ? 'active' : ''}
                    style={{
                        cursor: 'pointer',
                        backgroundColor: activeCategory === null ? '#B8860B' : 'transparent',
                        color: activeCategory === null ? '#fff' : 'inherit',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        transition: 'background-color 0.2s ease, color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        if (activeCategory !== null) {
                            e.currentTarget.style.backgroundColor = '#f0f0f0';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (activeCategory !== null) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }
                    }}
                >
                    {t("shop.allCategories", "All Categories")} ({totalProducts})
                </li>
                {categories && Array.isArray(categories) && categories.map(category => (
                    <li
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className={activeCategory === category.id ? 'active' : ''}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: activeCategory === category.id ? '#B8860B' : 'transparent',
                            color: activeCategory === category.id ? '#fff' : 'inherit',
                            padding: '8px 12px',
                            borderRadius: '4px',
                            transition: 'background-color 0.2s ease, color 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            if (activeCategory !== category.id) {
                                e.currentTarget.style.backgroundColor = '#f0f0f0';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (activeCategory !== category.id) {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }
                        }}
                    >
                        {category.name}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default ProductCategoryList;
