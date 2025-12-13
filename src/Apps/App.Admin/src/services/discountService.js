/**
 * Discount Service
 * API service functions for coupon/discount management
 */

import { api } from "@/api";
import { API_ENDPOINTS } from "@/api/endpoints";

export const discountService = {
  /**
   * Get all coupons (no pagination)
   * @returns {Promise} API response
   */
  getAllCoupons: () => {
    return api.get(API_ENDPOINTS.DISCOUNT.GET_ALL_COUPONS);
  },

  /**
   * Get coupons with filter and pagination
   * @param {Object} params - Query parameters (filter, page, pageSize, etc.)
   * @returns {Promise} API response
   */
  getCoupons: (params = {}) => {
    return api.get(API_ENDPOINTS.DISCOUNT.GET_LIST, { params });
  },

  /**
   * Get coupon by ID
   * @param {string|Guid} couponId - Coupon ID
   * @returns {Promise} API response
   */
  getCouponById: (couponId) => {
    return api.get(API_ENDPOINTS.DISCOUNT.GET_DETAIL(couponId));
  },

  /**
   * Create a new coupon
   * @param {Object} couponData - CreateCouponDto
   * @returns {Promise} API response
   */
  createCoupon: (couponData) => {
    return api.post(API_ENDPOINTS.DISCOUNT.CREATE, couponData);
  },

  /**
   * Update an existing coupon
   * @param {string|Guid} couponId - Coupon ID
   * @param {Object} couponData - UpdateCouponDto
   * @returns {Promise} API response
   */
  updateCoupon: (couponId, couponData) => {
    return api.put(API_ENDPOINTS.DISCOUNT.UPDATE(couponId), couponData);
  },

  /**
   * Delete a coupon
   * @param {string|Guid} couponId - Coupon ID
   * @returns {Promise} API response
   */
  deleteCoupon: (couponId) => {
    return api.delete(API_ENDPOINTS.DISCOUNT.DELETE(couponId));
  },

  /**
   * Approve a coupon
   * @param {string|Guid} couponId - Coupon ID
   * @returns {Promise} API response
   */
  approveCoupon: (couponId) => {
    return api.post(API_ENDPOINTS.DISCOUNT.APPROVE_COUPON(couponId));
  },

  /**
   * Reject a coupon
   * @param {string|Guid} couponId - Coupon ID
   * @returns {Promise} API response
   */
  rejectCoupon: (couponId) => {
    return api.post(API_ENDPOINTS.DISCOUNT.REJECT_COUPON(couponId));
  },

  /**
   * Update coupon validity period
   * @param {string|Guid} couponId - Coupon ID
   * @param {Object} validityData - UpdateValidityPeriodRequest { ValidFrom, ValidTo }
   * @returns {Promise} API response
   */
  updateValidityPeriod: (couponId, validityData) => {
    return api.put(API_ENDPOINTS.DISCOUNT.UPDATE_VALIDITY_PERIOD(couponId), validityData);
  },

  /**
   * Validate a coupon code
   * @param {Object} validateData - ValidateCouponRequest
   * @returns {Promise} API response
   */
  validateCoupon: (validateData) => {
    return api.post(API_ENDPOINTS.DISCOUNT.VALIDATE, validateData);
  },

  /**
   * Apply a coupon to order
   * @param {Object} applyData - ApplyCouponRequest
   * @returns {Promise} API response
   */
  applyCoupon: (applyData) => {
    return api.post(API_ENDPOINTS.DISCOUNT.APPLY, applyData);
  },
};

export default discountService;

