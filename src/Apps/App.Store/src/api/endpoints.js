/**
 * API Endpoints Configuration
 * All endpoints are relative to VITE_API_GATEWAY base URL
 */

export const API_ENDPOINTS = {
  // Catalog Service
  CATALOG: {
    GET_PRODUCT_DETAIL: (id) => `/catalog-service/products/${id}`,
    GET_CATEGORIES: "/catalog-service/categories",
    GET_BRANDS: "/catalog-service/brands"
  },

  // Search Service
  SEARCH: {
    SEARCH_PRODUCT: () => `/search-service/products`
  },

  // Basket Service
  BASKET: {
    CHECKOUT_BASKET: `/basket-service/basket/checkout`,
    GET_BASKET: `/basket-service/basket`,
    STORE_BASKET: `/basket-service/basket`
  },

  // Discount Service
  DISCOUNT: {
    EVALUATE_COUPON: "/discount-service/coupons/evaluate"
  },

  // Order Service
  ORDER: {
    GET_ALL_MY_ORDERS: "/order-service/orders/me/all",
    GET_MY_ORDER_BY_ID: (id) => `/order-service/orders/me/${id}`,
  },

  // Notification Service
  NOTIFICATION: {
    GET_LIST: "/notification-service/notifications",
    MARK_AS_READ: "/notification-service/notifications/read",
    GET_ALL: "/notification-service/notifications/all",
    GET_COUNT_UNREAD: "/notification-service/notifications/unread/count",
    GET_TOP_10_UNREAD: "/notification-service/notifications/unread/top10"
  },

  // Keycloak
  KEYCLOAK: {
    GET_ME: "/account/me",
  },
};

export default API_ENDPOINTS;

