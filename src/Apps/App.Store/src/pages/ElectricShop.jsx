import React, { useContext } from "react";
import HeaderSection5 from "../components/header/HeaderSection5";
import BannerSection4 from "../components/banner/BannerSection4";
import CategorySection4 from "../components/category/CategorySection4";
import PopularProducts from "../components/product/PopularProducts";
import OfferSection3 from "../components/offer/OfferSection3";
import LedBulbSlider from "../components/sliders/LedBulbSlider";
import NewsletterSection from "../components/newsletter/NewsletterSection";
import CompactDeviceSection from "../components/sliders/CompactDeviceSection";
import TestimonialSlider2 from "../components/sliders/TestimonialSlider2";
import BrandSection from "../components/brands/BrandSection";
import BlogSection4 from "../components/blog/BlogSection4";
import FeatureSection from "../components/feature/FeatureSection";
import FooterSection from "../components/footer/FooterSection";
import CartModal from "../components/modal/CartModal";
import { FarzaaContext } from "../context/FarzaaContext";
import BottomMobileMenu from "../components/navigation/BottomMobileMenu";

const ElectricShop = () => {
  const { cartItems, handleRemoveItem, handleQuantityChange } =
    useContext(FarzaaContext);
  return (
    <main className="fz-4-body">
      <HeaderSection5 />
      <BannerSection4 />
      <CategorySection4 />
      <PopularProducts />
      <OfferSection3 />
      <LedBulbSlider />
      <NewsletterSection />
      <CompactDeviceSection />
      <TestimonialSlider2 />
      <BrandSection />
      <BlogSection4 />
      <FeatureSection />
      <FooterSection logo="/assets/images/logo-4.png" />
      <CartModal
        cartArray={cartItems}
        remove={handleRemoveItem}
        quantity={handleQuantityChange}
      />
      <BottomMobileMenu style="" logo="assets/images/logo-4.png" />
    </main>
  );
};

export default ElectricShop;
