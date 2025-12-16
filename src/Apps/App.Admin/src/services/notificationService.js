import { api } from "@/api";
import { API_ENDPOINTS } from "@/api/endpoints";

export const notificationService = {
  // Get top 10 unread notifications for dropdown
  getTop10Unread: async () => {
    return await api.get(API_ENDPOINTS.NOTIFICATION.GET_TOP_10_UNREAD);
  },

  // Get unread count for badge
  getUnreadCount: async () => {
    return await api.get(API_ENDPOINTS.NOTIFICATION.GET_COUNT_UNREAD);
  },

  // Get all notifications with pagination
  getAll: async () => {
    return await api.get(API_ENDPOINTS.NOTIFICATION.GET_ALL);
  },

  // Mark notifications as read
  markAsRead: async (ids) => {
    return await api.post(API_ENDPOINTS.NOTIFICATION.MARK_AS_READ, { ids });
  },
};

