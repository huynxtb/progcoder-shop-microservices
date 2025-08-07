import React from "react";
import HeaderSection11 from "../components/header/HeaderSection11";
import BannerSection10 from "../components/banner/BannerSection10";
import BagCategorySection from "../components/category/BagCategorySection";
import BagFeaturedProductSection from "../components/featured/BagFeaturedProductSection";
import OfferSection5 from "../components/offer/OfferSection5";
import TreandyBagSection from "../components/product/TreandyBagSection";
import FlashSaleSection5 from "../components/offer/FlashSaleSection5";
import VideoSection2 from "../components/video/VideoSection2";
import BagBlogSection from "../components/blog/BagBlogSection";
import FooterSection9 from "../components/footer/FooterSection9";

const BagShop = () => {
  return (
    <main className="fz-10-body">
      <HeaderSection11 />
      <BannerSection10 />
      <BagCategorySection />
      <BagFeaturedProductSection />
      <OfferSection5 />
      <TreandyBagSection />
      <FlashSaleSection5 />
      <VideoSection2 />
      <BagBlogSection />
      <FooterSection9 style="fz-10-footer" />
    </main>
  );
};

export default BagShop;
