import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FarzaaContext } from "../../context/FarzaaContext";
import { Link } from "react-router-dom";

const BrandFilter = () => {
  const { t } = useTranslation();
  const { brands, brandsLoading, selectedTags, handleTagSelection } = useContext(FarzaaContext);

  if (brandsLoading) {
    return (
      <section className="sidebar-single-area product-tags-area">
        <h3 className="sidebar-single-area__title">{t("shop.brands", "Brands")}</h3>
        <div className="tags">
          <span>{t("common.loading", "Loading...")}</span>
        </div>
      </section>
    );
  }

  if (!brands || !Array.isArray(brands) || brands.length === 0) {
    return null;
  }

  return (
    <section className="sidebar-single-area product-tags-area">
      <h3 className="sidebar-single-area__title">{t("shop.brands", "Brands")}</h3>
      <div className="tags">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            to="/shop"
            className={selectedTags.includes(brand.id) ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              handleTagSelection(brand.id);
            }}
          >
            {brand.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BrandFilter;

