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
    GET_HISTORIES: "/inventory-service/histories",
  },

  // Discount Service
  DISCOUNT: {
    GET_LIST: "/discount-service/admin/coupons",
    GET_ALL_COUPONS: "/discount-service/admin/coupons/all",
    GET_DETAIL: (id) => `/discount-service/admin/coupons/${id}`,
    CREATE: "/discount-service/admin/coupons",
    UPDATE: (id) => `/discount-service/admin/coupons/${id}`,
    DELETE: (id) => `/discount-service/admin/coupons/${id}`,
    APPROVE_COUPON: (id) => `/discount-service/admin/coupons/${id}/approve`,
    REJECT_COUPON: (id) => `/discount-service/admin/coupons/${id}/reject`,
    UPDATE_VALIDITY_PERIOD: (id) => `/discount-service/admin/coupons/${id}/validity-period`,
    VALIDATE: "/discount-service/coupons/validate",
    APPLY: "/discount-service/coupons/apply",
  },

  // Order Service
  ORDER: {
    GET_LIST: "/order-service/admin/orders",
    GET_ALL: "/order-service/admin/orders/all",
    GET_DETAIL: (id) => `/order-service/admin/orders/${id}`,
    CREATE: "/order-service/admin/orders",
    UPDATE: (id) => `/order-service/admin/orders/${id}`,
    UPDATE_STATUS: (id) => `/order-service/admin/orders/${id}/status`,
    GET_BY_ORDER_NO: (orderNo) => `/order-service/orders/order-no/${orderNo}`,
    GET_BY_CURRENT_USER: "/order-service/orders/me",
  },

  // Report Service
  REPORT: {
    DASHBOARD_STATISTICS: "/report-service/admin/dashboard-statistics",
    ORDER_GROWTH_LINE_CHART: "/report-service/admin/order-growth-statistics",
    TOP_PRODUCT_PIE_CHART: "/report-service/admin/top-product-statistics",
  },

  // Notification Service
  NOTIFICATION: {
    GET_LIST: "/notification-service/notifications",
    MARK_AS_READ: "/notification-service/notifications/read",
    GET_ALL: "/notification-service/notifications/all",
    GET_COUNT_UNREAD: "/notification-service/notifications/unread/count",
    GET_TOP_10_UNREAD: "/notification-service/notifications/unread/top10"
  },

  // Communication Service
  COMMUNICATION: {
    NOTIFICATION_HUB: "/communication-service/hubs/notifications",
  },

  // Keycloak
  KEYCLOAK: {
    GET_ME: "/account/me",
  },
};

export default API_ENDPOINTS;

