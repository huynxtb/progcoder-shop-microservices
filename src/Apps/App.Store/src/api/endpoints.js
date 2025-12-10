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

  // Keycloak
  KEYCLOAK: {
    GET_ME: "/account/me",
  },
};

export default API_ENDPOINTS;

