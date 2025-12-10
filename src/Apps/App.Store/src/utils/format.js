/**
 * Format currency helper functions
 */

/**
 * Format a number as Vietnamese Dong (VND) currency
 * @param {number} value - The number to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value) => {
  if (value === null || value === undefined || isNaN(value)) {
    return "0 ₫";
  }
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

/**
 * Calculate discount percentage between original price and sale price
 * @param {number} originalPrice - The original price
 * @param {number} salePrice - The sale price
 * @returns {number} Discount percentage (0-100)
 */
export const calculateDiscount = (originalPrice, salePrice) => {
  if (!originalPrice || !salePrice || originalPrice <= 0 || salePrice <= 0) {
    return 0;
  }
  if (salePrice >= originalPrice) {
    return 0;
  }
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

/**
 * Format date string to local date and time string
 * @param {string} dateString - ISO date string (e.g., "2025-12-07T14:01:45.3036686+00:00")
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return "";
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const defaultOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      ...options,
    };
    
    return new Intl.DateTimeFormat(navigator.language || "vi-VN", defaultOptions).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

