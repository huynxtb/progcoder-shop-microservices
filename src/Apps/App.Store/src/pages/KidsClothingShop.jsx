import React from "react";
import HeaderSection10 from "../components/header/HeaderSection10";
import BannerSection9 from "../components/banner/BannerSection9";
import CategorySection8 from "../components/category/CategorySection8";
import KidsTrendyProductSection from "../components/product/KidsTrendyProductSection";
import FlashSaleSection4 from "../components/offer/FlashSaleSection4";
import KidsFeaturedProducts from "../components/featured/KidsFeaturedProducts";
import SubBannerSection3 from "../components/banner/SubBannerSection3";
import KidsBlogSection from "../components/blog/KidsBlogSection";
import BrandSection5 from "../components/brands/BrandSection5";
import FooterSection8 from "../components/footer/FooterSection8";

const KidsClothingShop = () => {
  return (
    <main className="fz-9-body">
      <HeaderSection10 />
      <BannerSection9 />
      <CategorySection8 />
      <KidsTrendyProductSection />
      <FlashSaleSection4 />
      <KidsFeaturedProducts />
      <SubBannerSection3 />
      <KidsBlogSection />
      <BrandSection5 />
      <FooterSection8 />
    </main>
  );
};

export default KidsClothingShop;
