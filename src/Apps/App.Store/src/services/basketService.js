/**
 * Basket API Service
 * Handles all basket-related API calls
 */

import { api } from '../api/axiosInstance';
import { API_ENDPOINTS } from '../api/endpoints';

export const basketService = {
  /**
   * Get current user's basket
   * @returns {Promise} API response
   */
  getBasket: async () => {
    return await api.get(API_ENDPOINTS.BASKET.GET_BASKET);
  },

  /**
   * Store/Update basket items
   * @param {Array} items - Array of { productId, quantity }
   * @returns {Promise} API response
   */
  storeBasket: async (items) => {
    return await api.post(API_ENDPOINTS.BASKET.STORE_BASKET, { items });
  },

  /**
   * Checkout basket
   * @param {Object} data - Checkout data
   * @param {Object} data.customer - Customer info { name, email, phoneNumber }
   * @param {Object} data.shippingAddress - Shipping address details
   * @param {string} data.couponCode - Optional coupon code
   * @returns {Promise} API response
   */
  checkoutBasket: async (data) => {
    return await api.post(API_ENDPOINTS.BASKET.CHECKOUT_BASKET, data);
  },
};

