import React from "react";
import HeaderSection6 from "../components/header/HeaderSection6";
import FooterSection4 from "../components/footer/FooterSection4";
import BreadcrumbSection2 from "../components/breadcrumb/BreadcrumbSection2";
import FeatureSection from "../components/feature/FeatureSection";
import ShopAreaSection2 from "../components/shop/ShopAreaSection2";
import BottomMobileMenu from "../components/navigation/BottomMobileMenu";

const Shop2 = () => {
  return (
    <main className="fz-5-body">
      <HeaderSection6 />
      <BreadcrumbSection2 title="Shop Page" currentPage="Products" />
      <ShopAreaSection2 />
      <FeatureSection />
      <FooterSection4 />
      <BottomMobileMenu
        style="fz-5-mobile-menu"
        logo="assets/images/logo-5.png"
      />
    </main>
  );
};

export default Shop2;
