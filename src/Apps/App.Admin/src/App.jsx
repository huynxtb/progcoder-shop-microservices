import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Dashboard
const Ecommerce = lazy(() => import("./pages/dashboard/ecommerce"));

// Auth pages
const Login = lazy(() => import("./pages/auth/login"));
const Register = lazy(() => import("./pages/auth/register"));
const ForgotPass = lazy(() => import("./pages/auth/forgot-password"));
const Error = lazy(() => import("./pages/404"));

import Layout from "./layout/Layout";
import AuthLayout from "./layout/AuthLayout";

// Utility pages
const InvoicePage = lazy(() => import("./pages/utility/invoice"));
const InvoiceAddPage = lazy(() => import("./pages/utility/invoice-add"));
const InvoicePreviewPage = lazy(() => import("./pages/utility/invoice-preview"));
const InvoiceEditPage = lazy(() => import("./pages/utility/invoice-edit"));
const Settings = lazy(() => import("./pages/utility/settings"));
const Profile = lazy(() => import("./pages/utility/profile"));

// Ecommerce pages
const EcommercePage = lazy(() => import("./pages/product"));
const CreateProduct = lazy(() => import("./pages/product/create-product"));
const InventoryPage = lazy(() => import("./pages/inventory"));
const CategoryPage = lazy(() => import("./pages/category"));
const BrandPage = lazy(() => import("./pages/brand"));
const CouponPage = lazy(() => import("./pages/coupon"));
const CreateCoupon = lazy(() => import("./pages/coupon/create-coupon"));
const EditCoupon = lazy(() => import("./pages/coupon/edit-coupon"));
const EditInventory = lazy(() => import("./pages/inventory/edit-inventory"));
const NotificationPage = lazy(() => import("./pages/notification"));

import Loading from "@/components/Loading";
import { ProductDetails } from "./pages/product/productDetails";
import Orders from "./pages/orders";
import OrderDetails from "./pages/orders/details";
import CreateOrder from "./pages/orders/create";
import EditOrder from "./pages/orders/edit";
import EditProduct from "./pages/product/edit-product";
import Customers from "./pages/product/customers";
import InvoiceEPage from "./pages/product/invoice-ecompage";
import RootRedirect from "./components/auth/RootRedirect";

function App() {
  return (
    <main className="App relative">
      <Routes>
        {/* Root route - load ecommerce if authenticated, redirect to login if not */}
        <Route path="/" element={<Layout />}>
          <Route index element={<RootRedirect />} />
        </Route>

        {/* Login route */}
        <Route path="/login" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>

        {/* Auth routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPass />} />
        </Route>

        {/* Main app routes */}
        <Route path="/*" element={<Layout />}>
          {/* Dashboard */}
          <Route path="dashboard" element={<Ecommerce />} />

          {/* Products */}``
          <Route path="products" element={<EcommercePage />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />

          {/* Inventory */}
          <Route path="inventories" element={<InventoryPage />} />
          <Route path="edit-inventory/:id" element={<EditInventory />} />

          {/* Categories */}
          <Route path="categories" element={<CategoryPage />} />

          {/* Brands */}
          <Route path="brands" element={<BrandPage />} />

          {/* Coupons */}
          <Route path="coupons" element={<CouponPage />} />
          <Route path="create-coupon" element={<CreateCoupon />} />
          <Route path="edit-coupon/:id" element={<EditCoupon />} />

          {/* Orders */}
          <Route path="orders" element={<Orders />} />
          <Route path="orders/create" element={<CreateOrder />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="orders/:id/edit" element={<EditOrder />} />

          {/* Notifications */}
          <Route path="notifications" element={<NotificationPage />} />

          {/* Customers */}
          <Route path="customers" element={<Customers />} />

          {/* Invoice */}
          <Route path="invoice" element={<InvoicePage />} />
          <Route path="invoice-add" element={<InvoiceAddPage />} />
          <Route path="invoice-preview" element={<InvoicePreviewPage />} />
          <Route path="invoice-edit" element={<InvoiceEditPage />} />
          <Route path="invoice-ecommerce" element={<InvoiceEPage />} />

          {/* Profile & Settings */}
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>

        {/* 404 page */}
        <Route
          path="/404"
          element={
            <Suspense fallback={<Loading />}>
              <Error />
            </Suspense>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
