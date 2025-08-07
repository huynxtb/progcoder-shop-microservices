import React from "react";
import HeaderSection7 from "../components/header/HeaderSection7";
import BannerSection6 from "../components/banner/BannerSection6";
import CategorySection5 from "../components/category/CategorySection5";
import CarPartProductSection from "../components/product/CarPartProductSection";
import SubBannerSection from "../components/banner/SubBannerSection";
import FlashSaleSection from "../components/offer/FlashSaleSection";
import CarPartProductSection2 from "../components/product/CarPartProductSection2";
import BlogSection6 from "../components/blog/BlogSection6";
import CtaSection4 from "../components/cta/CtaSection4";
import FooterSection5 from "../components/footer/FooterSection5";

const CarPartShop = () => {
  return (
    <main className="fz-6-body">
      <HeaderSection7 />
      <BannerSection6 />
      <CategorySection5 />
      <CarPartProductSection />
      <SubBannerSection />
      <FlashSaleSection />
      <CarPartProductSection2 />
      <BlogSection6 />
      <CtaSection4 />
      <FooterSection5 />
    </main>
  );
};

export default CarPartShop;
