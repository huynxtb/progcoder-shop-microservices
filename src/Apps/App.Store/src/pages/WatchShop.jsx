import React from "react";
import HeaderSection8 from "../components/header/HeaderSection8";
import BannerSection7 from "../components/banner/BannerSection7";
import CategorySection6 from "../components/category/CategorySection6";
import WatchProducts from "../components/product/WatchProducts";
import SubBannerSection2 from "../components/banner/SubBannerSection2";
import TrendingWatchSection from "../components/sliders/TrendingWatchSection";
import FlashSaleSection2 from "../components/offer/FlashSaleSection2";
import BlogSection7 from "../components/blog/BlogSection7";
import BrandSection3 from "../components/brands/BrandSection3";
import CtaSection5 from "../components/cta/CtaSection5";
import FooterSection6 from "../components/footer/FooterSection6";

const WatchShop = () => {
  return (
    <main className="fz-7-body overflow-hidden">
      <HeaderSection8 />
      <BannerSection7 />
      <CategorySection6 />
      <WatchProducts />
      <SubBannerSection2 />
      <TrendingWatchSection />
      <FlashSaleSection2 />
      <BlogSection7 />
      <BrandSection3 />
      <CtaSection5 />
      <FooterSection6 />
    </main>
  );
};

export default WatchShop;
