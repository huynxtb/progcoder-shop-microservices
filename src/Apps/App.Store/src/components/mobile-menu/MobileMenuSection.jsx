import React, { useContext } from "react";
import { FarzaaContext } from "../../context/FarzaaContext";

const MobileMenuSection = ({ navigate }) => {
  const { isDropdownOpen, handleDropdownToggle } = useContext(FarzaaContext);
  return (
    <div className="mean-bar">
      <a href="#nav" className="meanmenu-reveal">
        <span>
          <span>
            <span></span>
          </span>
        </span>
      </a>
      <nav className="mobile-mean-nav">
        <div className="mobile-menu-list-items">
          <div className="fz-dropdown fz-nav-item">
            <a role="button" className="fz-nav-link">
              <span>Home</span>
              <i
                className={`fa-regular ${
                  isDropdownOpen.home ? "fa-minus" : "fa-plus"
                }`}
                role="button"
                onClick={() => handleDropdownToggle("home")}
              ></i>
            </a>

            <ul
              className={`fz-submenu home-page-links ${
                isDropdownOpen.home ? "d-block" : "d-none"
              }`}
            >
              <li>
                <a
                  role="button"
                  onClick={() => navigate("/")}
                  className="fz-nav-link fz-submenu-nav-link sub-menu-link"
                >
                  Door Shop
                </a>
              </li>
              <li>
                <a
                  role="button"
                  onClick={() => navigate("/jewelleryShop")}
                  className="fz-nav-link fz-submenu-nav-link sub-menu-link"
                >
                  Jewelry Shop
                </a>
              </li>
              <li>
                <a
                  role="button"
                  onClick={() => navigate("/cakeShop")}
                  className="fz-nav-link fz-submenu-nav-link sub-menu-link"
                >
                  Cake Shop
                </a>
              </li>
              <li>
                <a
                  role="button"
                  onClick={() => navigate("/electric-shop")}
                  className="fz-nav-link fz-submenu-nav-link sub-menu-link"
                >
                  Electric Shop
                </a>
              </li>
              <li>
                <a
                  role="button"
                  onClick={() => navigate("/sunglass-shop")}
                  className="fz-nav-link fz-submenu-nav-link sub-menu-link"
                >
                  Sunglass Shop
                </a>
              </li>
              <li>
                <a
                  role="button"
                  onClick={() => navigate("/car-part-shop")}
                  className="fz-nav-link fz-submenu-nav-link sub-menu-link"
                >
                  Car Parts Shop
                </a>
              </li>
              <li>
                <a
                  role="button"
                  onClick={() => navigate("/watch-shop")}
                  className="fz-nav-link fz-submenu-nav-link sub-menu-link"
                >
                  Watch Shop
                </a>
              </li>
              <li>
                <a
                  role="button"
                  onClick={() => navigate("/cycle-shop")}
                  className="fz-nav-link fz-submenu-nav-link sub-menu-link"
                >
                  Cycle Shop
                </a>
              </li>
              <li>
                <a
                  role="button"
                  onClick={() => navigate("/kids-cloth-shop")}
                  className="fz-nav-link fz-submenu-nav-link sub-menu-link"
                >
                  Kid's Cloth Shop
                </a>
              </li>
              <li>
                <a
                  role="button"
                  onClick={() => navigate("/bag-shop")}
                  className="fz-nav-link fz-submenu-nav-link sub-menu-link"
                >
                  Bag Shop 01
                </a>
              </li>
              <li>
                <a
                  role="button"
                  onClick={() => navigate("/cctv-shop")}
                  className="fz-nav-link fz-submenu-nav-link sub-menu-link"
                >
                  CCTV Shop
                </a>
              </li>
              <li>
                <a
                  role="button"
                  onClick={() => navigate("/bag-shop-2")}
                  className="fz-nav-link fz-submenu-nav-link sub-menu-link"
                >
                  Bag Shop 02
                </a>
              </li>
            </ul>
          </div>
          <div className="fz-dropdown fz-nav-item">
            <a role="button" className="fz-nav-link">
              <span>Shop</span>
              <i
                className={`fa-regular ${
                  isDropdownOpen.shop ? "fa-minus" : "fa-plus"
                }`}
                role="button"
                onClick={() => handleDropdownToggle("shop")}
              ></i>
            </a>

            <ul
              className={`fz-submenu shop-page-links ${
                isDropdownOpen.shop ? "d-block" : "d-none"
              }`}
            >
              <li>
                <a
                  role="button"
                  onClick={() => navigate("/shop")}
                  className="fz-nav-link fz-submenu-nav-link sub-menu-link"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  role="button"
                  onClick={() => navigate("/shop-2")}
                  className="fz-nav-link fz-submenu-nav-link sub-menu-link"
                >
                  Shop 02
                </a>
              </li>
              <li>
                <a
                  role="button"
                  onClick={() => navigate("/shopDetails")}
                  className="fz-nav-link fz-submenu-nav-link sub-menu-link"
                >
                  Shop details
                </a>
              </li>
            </ul>
          </div>
          <div className="fz-dropdown fz-nav-item">
            <a role="button" className="fz-nav-link">
              <span>Pages</span>
              <i
                className={`fa-regular ${
                  isDropdownOpen.pages ? "fa-minus" : "fa-plus"
                }`}
                role="button"
                onClick={() => handleDropdownToggle("pages")}
              ></i>
            </a>

            <ul
              className={`fz-submenu other-page-links ${
                isDropdownOpen.pages ? "d-block" : "d-none"
              }`}
            >
              <li>
                <a
                  role="button"
                  onClick={() => navigate("/about")}
                  className="fz-nav-link fz-submenu-nav-link sub-menu-link"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  role="button"
                  onClick={() => navigate("/faq")}
                  className="fz-nav-link fz-submenu-nav-link sub-menu-link"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  role="button"
                  onClick={() => navigate("/wishlist")}
                  className="fz-nav-link fz-submenu-nav-link sub-menu-link"
                >
                  Wishlist
                </a>
              </li>
              <li>
                <a
                  role="button"
                  onClick={() => navigate("/cart")}
                  className="fz-nav-link fz-submenu-nav-link sub-menu-link"
                >
                  Cart
                </a>
              </li>
              <li>
                <a
                  role="button"
                  onClick={() => navigate("/account")}
                  className="fz-nav-link fz-submenu-nav-link sub-menu-link"
                >
                  Account
                </a>
              </li>
              <li>
                <a
                  role="button"
                  onClick={() => navigate("/checkout")}
                  className="fz-nav-link fz-submenu-nav-link sub-menu-link"
                >
                  Checkout
                </a>
              </li>
            </ul>
          </div>
          <div className="fz-dropdown fz-nav-item">
            <a role="button" className="fz-nav-link">
              <span>Blog</span>
              <i
                className={`fa-regular ${
                  isDropdownOpen.blog ? "fa-minus" : "fa-plus"
                }`}
                role="button"
                onClick={() => handleDropdownToggle("blog")}
              ></i>
            </a>

            <ul
              className={`fz-submenu blog-page-links ${
                isDropdownOpen.blog ? "d-block" : "d-none"
              }`}
            >
              <li>
                <a
                  role="button"
                  onClick={() => navigate("/blog")}
                  className="fz-nav-link fz-submenu-nav-link sub-menu-link"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  role="button"
                  onClick={() => navigate("/blogDetails")}
                  className="fz-nav-link fz-submenu-nav-link sub-menu-link"
                >
                  Blog-details
                </a>
              </li>
            </ul>
          </div>
          <div className="fz-nav-item mean-last">
            <a
              role="button"
              onClick={() => navigate("/contact")}
              className="fz-nav-link"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenuSection;
