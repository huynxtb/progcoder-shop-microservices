/**
 * Notification API Service
 * Handles all notification-related API calls
 */

import { api } from '../api/axiosInstance';
import { API_ENDPOINTS } from '../api/endpoints';

export const notificationService = {
  /**
   * Get top 10 unread notifications for dropdown
   * @returns {Promise} API response
   */
  getTop10Unread: async () => {
    return await api.get(API_ENDPOINTS.NOTIFICATION.GET_TOP_10_UNREAD);
  },

  /**
   * Get unread count for badge
   * @returns {Promise} API response
   */
  getUnreadCount: async () => {
    return await api.get(API_ENDPOINTS.NOTIFICATION.GET_COUNT_UNREAD);
  },

  /**
   * Get all notifications with pagination
   * @returns {Promise} API response
   */
  getAll: async () => {
    return await api.get(API_ENDPOINTS.NOTIFICATION.GET_ALL);
  },

  /**
   * Mark notifications as read
   * @param {Array<string>} ids - Array of notification IDs
   * @returns {Promise} API response
   */
  markAsRead: async (ids) => {
    return await api.post(API_ENDPOINTS.NOTIFICATION.MARK_AS_READ, { ids });
  },
};

