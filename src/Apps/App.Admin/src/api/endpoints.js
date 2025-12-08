/**
 * API Endpoints Configuration
 * All endpoints are relative to VITE_API_GATEWAY base URL
 */

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    PROFILE: "/auth/profile",
    CHANGE_PASSWORD: "/auth/change-password",
  },

  // Catalog Service
  CATALOG: {
    GET_PRODUCTS: "/catalog-service/products",
    GET_ALL_PRODUCTS: "/catalog-service/products/all",
    GET_PRODUCT_DETAIL: (id) => `/catalog-service/products/${id}`,
    CREATE_PRODUCT: "/catalog-service/products",
    UPDATE_PRODUCT : (id) => `/catalog-service/products/${id}`,
    DELETE_PRODUCT: (id) => `/catalog-service/products/${id}`,
    PUBLISH_PRODUCT: (id) => `/catalog-service/products/${id}/publish`,
    UNPUBLISH_PRODUCT: (id) => `/catalog-service/products/${id}/unpublish`,
    GET_CATEGORIES: "/catalog-service/categories",
    GET_CATEGORY_TREE: "/catalog-service/categories/tree",
    GET_CATEGORY_DETAIL: (id) => `/catalog-service/categories/${id}`,
    CREATE_CATEGORY: "/catalog-service/categories",
    UPDATE_CATEGORY: (id) => `/catalog-service/categories/${id}`,
    DELETE_CATEGORY: (id) => `/catalog-service/categories/${id}`,
    GET_BRANDS: "/catalog-service/brands",
    GET_BRAND_DETAIL: (id) => `/catalog-service/brands/${id}`,
    CREATE_BRAND: "/catalog-service/brands",
    UPDATE_BRAND: (id) => `/catalog-service/brands/${id}`,
    DELETE_BRAND: (id) => `/catalog-service/brands/${id}`
  },

  // Inventory
  INVENTORY: {
    GET_LIST: "/inventories",
    GET_DETAIL: (id) => `/inventories/${id}`,
    UPDATE: (id) => `/inventories/${id}`,
    IMPORT: "/inventories/import",
    EXPORT: "/inventories/export",
    ADJUST: (id) => `/inventories/${id}/adjust`,
    HISTORY: (id) => `/inventories/${id}/history`,
  },

  // Coupons
  COUPON: {
    GET_LIST: "/coupons",
    GET_DETAIL: (id) => `/coupons/${id}`,
    CREATE: "/coupons",
    UPDATE: (id) => `/coupons/${id}`,
    DELETE: (id) => `/coupons/${id}`,
    VALIDATE: "/coupons/validate",
    APPLY: "/coupons/apply",
  },

  // Orders
  ORDER: {
    GET_LIST: "/orders",
    GET_DETAIL: (id) => `/orders/${id}`,
    CREATE: "/orders",
    UPDATE: (id) => `/orders/${id}`,
    UPDATE_STATUS: (id) => `/orders/${id}/status`,
    CANCEL: (id) => `/orders/${id}/cancel`,
    EXPORT: "/orders/export",
    PRINT: (id) => `/orders/${id}/print`,
  },

  // Customers
  CUSTOMER: {
    GET_LIST: "/customers",
    GET_DETAIL: (id) => `/customers/${id}`,
    CREATE: "/customers",
    UPDATE: (id) => `/customers/${id}`,
    DELETE: (id) => `/customers/${id}`,
    GET_ORDERS: (id) => `/customers/${id}/orders`,
    SEARCH: "/customers/search",
  },

  // Invoice
  INVOICE: {
    GET_LIST: "/invoices",
    GET_DETAIL: (id) => `/invoices/${id}`,
    CREATE: "/invoices",
    UPDATE: (id) => `/invoices/${id}`,
    DELETE: (id) => `/invoices/${id}`,
    PRINT: (id) => `/invoices/${id}/print`,
    SEND: (id) => `/invoices/${id}/send`,
  },

  // Dashboard & Reports
  REPORT: {
    DASHBOARD: "/dashboard",
    SALES_SUMMARY: "/reports/sales-summary",
    REVENUE: "/reports/revenue",
    TOP_PRODUCTS: "/reports/top-products",
    ORDERS_STATS: "/reports/orders-stats",
    CUSTOMERS_STATS: "/reports/customers-stats",
    INVENTORY_ALERTS: "/reports/inventory-alerts",
  },

  // Settings
  SETTINGS: {
    GET: "/settings",
    UPDATE: "/settings",
    GET_PROFILE: "/settings/profile",
    UPDATE_PROFILE: "/settings/profile",
    UPLOAD_AVATAR: "/settings/avatar",
  },

  // Upload
  UPLOAD: {
    IMAGE: "/upload/image",
    FILE: "/upload/file",
    BULK: "/upload/bulk",
  },
};

export default API_ENDPOINTS;

