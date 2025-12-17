/**
 * Order API Service
 * Handles all order-related API calls
 */

import { api } from '../api/axiosInstance';
import { API_ENDPOINTS } from '../api/endpoints';

export const orderService = {
  /**
   * Get all my orders
   * @returns {Promise} API response
   */
  getAllMyOrders: async () => {
    return await api.get(API_ENDPOINTS.ORDER.GET_ALL_MY_ORDERS);
  },

  /**
   * Get my order by ID
   * @param {string} id - Order ID
   * @returns {Promise} API response
   */
  getMyOrderById: async (id) => {
    return await api.get(API_ENDPOINTS.ORDER.GET_MY_ORDER_BY_ID(id));
  },
};

