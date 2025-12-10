/**
 * Product API Service
 * Handles all product-related API calls
 */

import { api } from '../axiosInstance';
import { API_ENDPOINTS } from '../endpoints';

/**
 * Search products with filters
 * @param {Object} params - Search parameters
 * @param {string} params.searchText - Search text
 * @param {string} params.categories - Comma-separated category IDs
 * @param {number} params.minPrice - Minimum price
 * @param {number} params.maxPrice - Maximum price
 * @param {number} params.status - Product status (1 = InStock, 2 = OutOfStock)
 * @param {number} params.sortBy - Sort by field (1=Name, 2=Sku, 3=Price, 4=SalePrice, 5=Status, 6=CreatedOnUtc)
 * @param {number} params.sortType - Sort type (1=Asc, 2=Desc)
 * @param {number} params.pageNumber - Page number (default: 1)
 * @param {number} params.pageSize - Page size (default: 9)
 * @returns {Promise} API response
 */
export const searchProducts = async (params = {}) => {
  const {
    searchText,
    categories,
    minPrice,
    maxPrice,
    status,
    sortBy,
    sortType,
    pageNumber = 1,
    pageSize = 9,
  } = params;

  const queryParams = new URLSearchParams();
  
  if (searchText) queryParams.append('searchText', searchText);
  if (categories) queryParams.append('categories', categories);
  if (minPrice !== undefined && minPrice !== null) queryParams.append('minPrice', minPrice);
  if (maxPrice !== undefined && maxPrice !== null) queryParams.append('maxPrice', maxPrice);
  if (status !== undefined && status !== null) queryParams.append('status', status);
  if (sortBy !== undefined && sortBy !== null) queryParams.append('sortBy', sortBy);
  if (sortType !== undefined && sortType !== null) queryParams.append('sortType', sortType);
  
  queryParams.append('pageNumber', pageNumber);
  queryParams.append('pageSize', pageSize);

  const url = `${API_ENDPOINTS.SEARCH.SEARCH_PRODUCT()}?${queryParams.toString()}`;
  
  const response = await api.get(url);
  return response.data;
};

/**
 * Get all categories
 * @returns {Promise} API response
 */
export const getCategories = async () => {
  const response = await api.get(API_ENDPOINTS.CATALOG.GET_CATEGORIES);
  return response.data;
};

/**
 * Get all brands
 * @returns {Promise} API response
 */
export const getBrands = async () => {
  const response = await api.get(API_ENDPOINTS.CATALOG.GET_BRANDS);
  return response.data;
};

