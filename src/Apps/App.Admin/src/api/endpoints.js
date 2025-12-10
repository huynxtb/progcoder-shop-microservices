/**
 * API Endpoints Configuration
 * All endpoints are relative to VITE_API_GATEWAY base URL
 */

export const API_ENDPOINTS = {
  // Catalog Service
  CATALOG: {
    GET_PRODUCTS: "/catalog-service/admin/products",
    GET_ALL_PRODUCTS: "/catalog-service/admin/products/all",
    GET_PRODUCT_DETAIL: (id) => `/catalog-service/admin/products/${id}`,
    CREATE_PRODUCT: "/catalog-service/admin/products",
    UPDATE_PRODUCT : (id) => `/catalog-service/admin/products/${id}`,
    DELETE_PRODUCT: (id) => `/catalog-service/admin/products/${id}`,
    PUBLISH_PRODUCT: (id) => `/catalog-service/admin/products/${id}/publish`,
    UNPUBLISH_PRODUCT: (id) => `/catalog-service/admin/products/${id}/unpublish`,
    GET_CATEGORIES: "/catalog-service/categories",
    GET_CATEGORY_TREE: "/catalog-service/admin/categories/tree",
    GET_CATEGORY_DETAIL: (id) => `/catalog-service/admin/categories/${id}`,
    CREATE_CATEGORY: "/catalog-service/admin/categories",
    UPDATE_CATEGORY: (id) => `/catalog-service/admin/categories/${id}`,
    DELETE_CATEGORY: (id) => `/catalog-service/admin/categories/${id}`,
    GET_BRANDS: "/catalog-service/brands",
    GET_BRAND_DETAIL: (id) => `/catalog-service/admin/brands/${id}`,
    CREATE_BRAND: "/catalog-service/admin/brands",
    UPDATE_BRAND: (id) => `/catalog-service/admin/brands/${id}`,
    DELETE_BRAND: (id) => `/catalog-service/admin/brands/${id}`
  },

  // Inventory Service
  INVENTORY: {
    GET_LIST: "/inventory-service/inventory-items",
    GET_ALL: "/inventory-service/inventory-items/all",
    GET_DETAIL: (id) => `/inventory-service/inventory-items/${id}`,
    CREATE: "/inventory-service/inventory-items",
    UPDATE: (id) => `/inventory-service/inventory-items/${id}`,
    DELETE: (id) => `/inventory-service/inventory-items/${id}`,
    INCREASE_STOCK: (id) => `/inventory-service/inventory-items/${id}/stock/increase`,
    DECREASE_STOCK: (id) => `/inventory-service/inventory-items/${id}/stock/decrease`,
    GET_LOCATIONS: "/inventory-service/locations",
    GET_LOCATION: (id) => `/inventory-service/locations/${id}`,
    CREATE_LOCATION: "/inventory-service/locations",
    UPDATE_LOCATION: (id) => `/inventory-service/locations/${id}`,
    DELETE_LOCATION: (id) => `/inventory-service/locations/${id}`,
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

  // Keycloak
  KEYCLOAK: {
    GET_ME: "/account/me",
  },
};

export default API_ENDPOINTS;

