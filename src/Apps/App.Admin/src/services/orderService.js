/**
 * Order Service
 * API service functions for order management
 */

import { api } from "@/api";
import { API_ENDPOINTS } from "@/api/endpoints";

export const orderService = {
  /**
   * Get orders with filter and pagination
   * @param {Object} params - Query parameters (filter, page, pageSize, etc.)
   * @returns {Promise} API response
   */
  getOrders: (params = {}) => {
    return api.get(API_ENDPOINTS.ORDER.GET_LIST, { params });
  },

  /**
   * Get all orders with filter (no pagination)
   * @param {Object} params - Query parameters (filter)
   * @returns {Promise} API response
   */
  getAllOrders: (params = {}) => {
    return api.get(API_ENDPOINTS.ORDER.GET_ALL, { params });
  },

  /**
   * Get order by ID
   * @param {string|Guid} orderId - Order ID
   * @returns {Promise} API response
   */
  getOrderById: (orderId) => {
    return api.get(API_ENDPOINTS.ORDER.GET_DETAIL(orderId));
  },

  /**
   * Get order by order number
   * @param {string} orderNo - Order number
   * @returns {Promise} API response
   */
  getOrderByOrderNo: (orderNo) => {
    return api.get(API_ENDPOINTS.ORDER.GET_BY_ORDER_NO(orderNo));
  },

  /**
   * Create a new order
   * @param {Object} orderData - CreateOrUpdateOrderDto
   * @returns {Promise} API response
   */
  createOrder: (orderData) => {
    return api.post(API_ENDPOINTS.ORDER.CREATE, orderData);
  },

  /**
   * Update an existing order
   * @param {string|Guid} orderId - Order ID
   * @param {Object} orderData - CreateOrUpdateOrderDto
   * @returns {Promise} API response
   */
  updateOrder: (orderId, orderData) => {
    return api.put(API_ENDPOINTS.ORDER.UPDATE(orderId), orderData);
  },

  /**
   * Update order status
   * @param {string|Guid} orderId - Order ID
   * @param {Object} statusData - UpdateOrderStatusRequest { Status, Reason? }
   * @returns {Promise} API response
   */
  updateOrderStatus: (orderId, statusData) => {
    return api.patch(API_ENDPOINTS.ORDER.UPDATE_STATUS(orderId), statusData);
  },
};

export default orderService;

