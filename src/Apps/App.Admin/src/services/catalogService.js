/**
 * Catalog Service
 * API service functions for product, category, and brand management
 */

import { api } from "@/api";
import { API_ENDPOINTS } from "@/api/endpoints";

export const catalogService = {
  // ==================== Products ====================
  
  /**
   * Get all products (no pagination)
   * @returns {Promise} API response
   */
  getAllProducts: () => {
    return api.get(API_ENDPOINTS.CATALOG.GET_ALL_PRODUCTS);
  },

  /**
   * Get products with filter and pagination
   * @param {Object} params - Query parameters (filter, page, pageSize, etc.)
   * @returns {Promise} API response
   */
  getProducts: (params = {}) => {
    return api.get(API_ENDPOINTS.CATALOG.GET_PRODUCTS, { params });
  },

  /**
   * Get product by ID
   * @param {string|Guid} productId - Product ID
   * @returns {Promise} API response
   */
  getProductById: (productId) => {
    return api.get(API_ENDPOINTS.CATALOG.GET_PRODUCT_DETAIL(productId));
  },

  /**
   * Create a new product
   * @param {FormData} productFormData - Product data (multipart/form-data)
   * @returns {Promise} API response
   */
  createProduct: (productFormData) => {
    return api.post(API_ENDPOINTS.CATALOG.CREATE_PRODUCT, productFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  /**
   * Update an existing product
   * @param {string|Guid} productId - Product ID
   * @param {FormData} productFormData - Product data (multipart/form-data)
   * @returns {Promise} API response
   */
  updateProduct: (productId, productFormData) => {
    return api.put(API_ENDPOINTS.CATALOG.UPDATE_PRODUCT(productId), productFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  /**
   * Delete a product
   * @param {string|Guid} productId - Product ID
   * @returns {Promise} API response
   */
  deleteProduct: (productId) => {
    return api.delete(API_ENDPOINTS.CATALOG.DELETE_PRODUCT(productId));
  },

  /**
   * Publish a product
   * @param {string|Guid} productId - Product ID
   * @returns {Promise} API response
   */
  publishProduct: (productId) => {
    return api.post(API_ENDPOINTS.CATALOG.PUBLISH_PRODUCT(productId));
  },

  /**
   * Unpublish a product
   * @param {string|Guid} productId - Product ID
   * @returns {Promise} API response
   */
  unpublishProduct: (productId) => {
    return api.post(API_ENDPOINTS.CATALOG.UNPUBLISH_PRODUCT(productId));
  },

  // ==================== Categories ====================

  /**
   * Get all categories
   * @returns {Promise} API response
   */
  getCategories: () => {
    return api.get(API_ENDPOINTS.CATALOG.GET_CATEGORIES);
  },

  /**
   * Get category tree
   * @returns {Promise} API response
   */
  getCategoryTree: () => {
    return api.get(API_ENDPOINTS.CATALOG.GET_CATEGORY_TREE);
  },

  /**
   * Get category by ID
   * @param {string|Guid} categoryId - Category ID
   * @returns {Promise} API response
   */
  getCategoryById: (categoryId) => {
    return api.get(API_ENDPOINTS.CATALOG.GET_CATEGORY_DETAIL(categoryId));
  },

  /**
   * Create a new category
   * @param {Object} categoryData - CreateCategoryDto
   * @returns {Promise} API response
   */
  createCategory: (categoryData) => {
    return api.post(API_ENDPOINTS.CATALOG.CREATE_CATEGORY, categoryData);
  },

  /**
   * Update an existing category
   * @param {string|Guid} categoryId - Category ID
   * @param {Object} categoryData - UpdateCategoryDto
   * @returns {Promise} API response
   */
  updateCategory: (categoryId, categoryData) => {
    return api.put(API_ENDPOINTS.CATALOG.UPDATE_CATEGORY(categoryId), categoryData);
  },

  /**
   * Delete a category
   * @param {string|Guid} categoryId - Category ID
   * @returns {Promise} API response
   */
  deleteCategory: (categoryId) => {
    return api.delete(API_ENDPOINTS.CATALOG.DELETE_CATEGORY(categoryId));
  },

  // ==================== Brands ====================

  /**
   * Get all brands
   * @returns {Promise} API response
   */
  getBrands: () => {
    return api.get(API_ENDPOINTS.CATALOG.GET_BRANDS);
  },

  /**
   * Get brand by ID
   * @param {string|Guid} brandId - Brand ID
   * @returns {Promise} API response
   */
  getBrandById: (brandId) => {
    return api.get(API_ENDPOINTS.CATALOG.GET_BRAND_DETAIL(brandId));
  },

  /**
   * Create a new brand
   * @param {Object} brandData - CreateBrandDto
   * @returns {Promise} API response
   */
  createBrand: (brandData) => {
    return api.post(API_ENDPOINTS.CATALOG.CREATE_BRAND, brandData);
  },

  /**
   * Update an existing brand
   * @param {string|Guid} brandId - Brand ID
   * @param {Object} brandData - UpdateBrandDto
   * @returns {Promise} API response
   */
  updateBrand: (brandId, brandData) => {
    return api.put(API_ENDPOINTS.CATALOG.UPDATE_BRAND(brandId), brandData);
  },

  /**
   * Delete a brand
   * @param {string|Guid} brandId - Brand ID
   * @returns {Promise} API response
   */
  deleteBrand: (brandId) => {
    return api.delete(API_ENDPOINTS.CATALOG.DELETE_BRAND(brandId));
  },
};

export default catalogService;


