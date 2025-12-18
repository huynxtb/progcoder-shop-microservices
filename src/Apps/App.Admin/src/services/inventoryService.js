/**
 * Inventory Service
 * API service functions for inventory management
 */

import { api } from "@/api";
import { API_ENDPOINTS } from "@/api/endpoints";

export const inventoryService = {
  // ==================== Inventory Items ====================

  /**
   * Get all inventory items (no pagination)
   * @returns {Promise} API response
   */
  getAllInventoryItems: () => {
    return api.get(API_ENDPOINTS.INVENTORY.GET_ALL);
  },

  /**
   * Get inventory items with filter and pagination
   * @param {Object} params - Query parameters (filter, page, pageSize, etc.)
   * @returns {Promise} API response
   */
  getInventoryItems: (params = {}) => {
    return api.get(API_ENDPOINTS.INVENTORY.GET_LIST, { params });
  },

  /**
   * Get inventory item by ID
   * @param {string|Guid} itemId - Inventory item ID
   * @returns {Promise} API response
   */
  getInventoryItemById: (itemId) => {
    return api.get(API_ENDPOINTS.INVENTORY.GET_DETAIL(itemId));
  },

  /**
   * Create a new inventory item
   * @param {Object} itemData - CreateInventoryItemDto
   * @returns {Promise} API response
   */
  createInventoryItem: (itemData) => {
    return api.post(API_ENDPOINTS.INVENTORY.CREATE, itemData);
  },

  /**
   * Update an existing inventory item
   * @param {string|Guid} itemId - Inventory item ID
   * @param {Object} itemData - UpdateInventoryItemDto
   * @returns {Promise} API response
   */
  updateInventoryItem: (itemId, itemData) => {
    return api.put(API_ENDPOINTS.INVENTORY.UPDATE(itemId), itemData);
  },

  /**
   * Delete an inventory item
   * @param {string|Guid} itemId - Inventory item ID
   * @returns {Promise} API response
   */
  deleteInventoryItem: (itemId) => {
    return api.delete(API_ENDPOINTS.INVENTORY.DELETE(itemId));
  },

  /**
   * Increase stock quantity
   * @param {string|Guid} itemId - Inventory item ID
   * @param {Object} stockData - IncreaseStockRequest { Quantity, Reason }
   * @returns {Promise} API response
   */
  increaseStock: (itemId, stockData) => {
    return api.put(API_ENDPOINTS.INVENTORY.INCREASE_STOCK(itemId), stockData);
  },

  /**
   * Decrease stock quantity
   * @param {string|Guid} itemId - Inventory item ID
   * @param {Object} stockData - DecreaseStockRequest { Quantity, Reason }
   * @returns {Promise} API response
   */
  decreaseStock: (itemId, stockData) => {
    return api.put(API_ENDPOINTS.INVENTORY.DECREASE_STOCK(itemId), stockData);
  },

  // ==================== Locations ====================

  /**
   * Get all locations
   * @returns {Promise} API response
   */
  getLocations: () => {
    return api.get(API_ENDPOINTS.INVENTORY.GET_LOCATIONS);
  },

  /**
   * Get location by ID
   * @param {string|Guid} locationId - Location ID
   * @returns {Promise} API response
   */
  getLocationById: (locationId) => {
    return api.get(API_ENDPOINTS.INVENTORY.GET_LOCATION(locationId));
  },

  /**
   * Create a new location
   * @param {Object} locationData - CreateLocationDto
   * @returns {Promise} API response
   */
  createLocation: (locationData) => {
    return api.post(API_ENDPOINTS.INVENTORY.CREATE_LOCATION, locationData);
  },

  /**
   * Update an existing location
   * @param {string|Guid} locationId - Location ID
   * @param {Object} locationData - UpdateLocationDto
   * @returns {Promise} API response
   */
  updateLocation: (locationId, locationData) => {
    return api.put(API_ENDPOINTS.INVENTORY.UPDATE_LOCATION(locationId), locationData);
  },

  /**
   * Delete a location
   * @param {string|Guid} locationId - Location ID
   * @returns {Promise} API response
   */
  deleteLocation: (locationId) => {
    return api.delete(API_ENDPOINTS.INVENTORY.DELETE_LOCATION(locationId));
  },

  // ==================== Histories ====================

  /**
   * Get inventory change histories
   * @returns {Promise} API response
   */
  getHistories: () => {
    return api.get(API_ENDPOINTS.INVENTORY.GET_HISTORIES);
  },
};

export default inventoryService;


