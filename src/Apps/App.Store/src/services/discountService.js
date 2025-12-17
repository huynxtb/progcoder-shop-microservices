/**
 * Discount API Service
 * Handles all discount-related API calls
 */

import { api } from '../api/axiosInstance';
import { API_ENDPOINTS } from '../api/endpoints';

export const discountService = {
  /**
   * Evaluate coupon code
   * @param {string} code - Coupon code
   * @param {number} amount - Original amount before discount
   * @returns {Promise} API response with discount details
   */
  evaluateCoupon: async (code, amount) => {
    return await api.post(API_ENDPOINTS.DISCOUNT.EVALUATE_COUPON, {
      code,
      amount,
    });
  },
};

