import { api } from "@/api/axiosInstance";
import { API_ENDPOINTS } from "@/api/endpoints";

/**
 * Report Service
 * Handles all API calls related to dashboard reports and statistics
 */
export const reportService = {
  /**
   * Fetch dashboard statistics (Growth, Products Sold, Total Revenue, Total Users)
   * @returns {Promise} Promise with statistics data
   */
  getDashboardStatistics: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.REPORT.DASHBOARD_STATISTICS);
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard statistics:", error);
      throw error;
    }
  },

  /**
   * Fetch order growth statistics for line chart
   * @returns {Promise} Promise with order growth data
   */
  getOrderGrowthStatistics: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.REPORT.ORDER_GROWTH_LINE_CHART);
      return response.data;
    } catch (error) {
      console.error("Error fetching order growth statistics:", error);
      throw error;
    }
  },

  /**
   * Fetch top products statistics for pie chart
   * @returns {Promise} Promise with top products data
   */
  getTopProductStatistics: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.REPORT.TOP_PRODUCT_PIE_CHART);
      return response.data;
    } catch (error) {
      console.error("Error fetching top product statistics:", error);
      throw error;
    }
  },
};

export default reportService;

