import React from "react";
import HeaderSection12 from "../components/header/HeaderSection12";
import BannerSection11 from "../components/banner/BannerSection11";
import CcTvCategorySection from "../components/category/CcTvCategorySection";
import CcTvFeaturedProductSection from "../components/featured/CcTvFeaturedProductSection";
import OfferSection6 from "../components/offer/OfferSection6";
import TrendyCcTvProducts from "../components/product/TrendyCcTvProducts";
import FlashSaleSection6 from "../components/offer/FlashSaleSection6";
import DiscountSection from "../components/offer/DiscountSection";
import BlogSection9 from "../components/blog/BlogSection9";
import FooterSection10 from "../components/footer/FooterSection10";

const CcTvShop = () => {
  return (
    <main className="fz-11-body">
      <HeaderSection12 />
      <BannerSection11 />
      <CcTvCategorySection />
      <CcTvFeaturedProductSection />
      <OfferSection6 />
      <TrendyCcTvProducts />
      <FlashSaleSection6 />
      <DiscountSection />
      <BlogSection9 />
      <FooterSection10 />
    </main>
  );
};

export default CcTvShop;
