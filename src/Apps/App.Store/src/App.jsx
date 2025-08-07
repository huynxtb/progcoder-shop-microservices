import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoorShop from "./pages/DoorShop";
import JewelleryShop from "./pages/JewelleryShop";
import CakeShop from "./pages/CakeShop";
import Shop from "./pages/Shop";
import ShopDetails from "./pages/ShopDetails";
import About from "./pages/About";
import Faq from "./pages/Faq";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Checkout from "./pages/Checkout";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import ElectricShop from "./pages/ElectricShop";
import SunglassShop from "./pages/SunglassShop";
import CarPartShop from "./pages/CarPartShop";
import WatchShop from "./pages/WatchShop";
import CycleShop from "./pages/CycleShop";
import KidsClothingShop from "./pages/KidsClothingShop";
import BagShop from "./pages/BagShop";
import CcTvShop from "./pages/CcTvShop";
import BagShop2 from "./pages/BagShop2";
import Shop2 from "./pages/Shop2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoorShop />} />
        <Route path="/jewellery-shop" element={<JewelleryShop />} />
        <Route path="/cake-shop" element={<CakeShop />} />
        <Route path="/electric-shop" element={<ElectricShop />} />
        <Route path="/sunglass-shop" element={<SunglassShop />} />
        <Route path="/car-part-shop" element={<CarPartShop />} />
        <Route path="/watch-shop" element={<WatchShop />} />
        <Route path="/cycle-shop" element={<CycleShop />} />
        <Route path="/kids-cloth-shop" element={<KidsClothingShop />} />
        <Route path="/bag-shop" element={<BagShop />} />
        <Route path="/bag-shop-2" element={<BagShop2 />} />
        <Route path="/cctv-shop" element={<CcTvShop />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop-2" element={<Shop2 />} />
        <Route path="/shopDetails" element={<ShopDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blogDetails" element={<BlogDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
