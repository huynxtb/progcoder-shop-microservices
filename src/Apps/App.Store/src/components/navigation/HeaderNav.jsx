import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const HeaderNav = ({ position, downArrow }) => {
  const { t } = useTranslation();
  return (
    <nav className="fz-header-nav">
      <ul className={`align-items-center ${position}`}>
        <li className="fz-nav-item">
          <Link to="/" className="fz-nav-link">
            {t("common.home", "Home")}
          </Link>
        </li>
        <li className="fz-nav-item">
          <Link to="/shop" className="fz-nav-link">
            {t("common.shop", "Shop")}
          </Link>
        </li>
        <li className="fz-dropdown fz-nav-item">
          <a role="button" className="fz-nav-link">
            <span>{t("common.pages", "Pages")}</span>{" "}
            <i
              className={
                downArrow ? "fa-solid fa-angle-down" : "fa-regular fa-plus"
              }
            ></i>
          </a>

          <ul className="fz-submenu">
            <li>
              <Link to="/about" className="fz-nav-link fz-submenu-nav-link">
                {t("common.about")}
              </Link>
            </li>
            <li>
              <Link to="/faq" className="fz-nav-link fz-submenu-nav-link">
                {t("common.faq")}
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="fz-nav-link fz-submenu-nav-link">
                {t("common.wishlist")}
              </Link>
            </li>
            <li>
              <Link to="/cart" className="fz-nav-link fz-submenu-nav-link">
                {t("common.cart")}
              </Link>
            </li>
            <li>
              <Link to="/account" className="fz-nav-link fz-submenu-nav-link">
                {t("common.account")}
              </Link>
            </li>
            <li>
              <Link to="/checkout" className="fz-nav-link fz-submenu-nav-link">
                {t("common.checkout")}
              </Link>
            </li>
          </ul>
        </li>
        <li className="fz-nav-item">
          <Link to="/contact" className="fz-nav-link">
            {t("common.contact")}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNav;
