import axios from "axios";
import { toast } from "react-toastify";
import i18n from "@/i18n/config";

// Get the API Gateway URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_GATEWAY || "not_config";

// Helper function to get cookie by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
  return null;
};

// Toast configuration
const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

/**
 * Show error toast with i18n translation
 * @param {string} errorKey - The error key from API response
 */
const showErrorToast = (errorKey) => {
  const translationKey = `error_response.${errorKey}`;
  const defaultKey = "error_response.DEFAULT_ERROR";
  
  // Check if translation exists for the error key
  const translatedMessage = i18n.exists(translationKey)
    ? i18n.t(translationKey)
    : i18n.t(defaultKey);
  
  toast.error(translatedMessage, toastConfig);
};

/**
 * Handle API error response and show appropriate toast messages
 * @param {Object} response - The error response object
 */
const handleErrorResponse = (response) => {
  const data = response?.data;
  
  // Check if response has errors array
  if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
    // Show toast for each error message
    data.errors.forEach((error) => {
      if (error.errorMessage) {
        showErrorToast(error.errorMessage);
      }
    });
  } else if (data?.message) {
    // If no errors array but has message, show the message
    showErrorToast(data.message);
  } else {
    // Fallback to status-based error handling
    handleStatusError(response.status);
  }
};

/**
 * Handle HTTP status code errors
 * @param {number} status - HTTP status code
 */
const handleStatusError = (status) => {
  switch (status) {
    case 400:
      showErrorToast("BAD_REQUEST");
      break;
    case 401:
      showErrorToast("UNAUTHORIZED");
      break;
    case 403:
      showErrorToast("FORBIDDEN");
      break;
    case 404:
      showErrorToast("NOT_FOUND");
      break;
    case 500:
      showErrorToast("SERVER_ERROR");
      break;
    default:
      showErrorToast("DEFAULT_ERROR");
  }
};

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add Bearer token from cookie
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from cookie
    const token = getCookie("access_token");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    if (response) {
      // Handle API error response
      handleErrorResponse(response);
      
      // Special handling for 401 - redirect to login
      if (response.status === 401) {
        document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/login";
      }
    } else if (error.request) {
      // Network error - no response received
      showErrorToast("NETWORK_ERROR");
    } else {
      // Something else happened
      showErrorToast("DEFAULT_ERROR");
    }
    
    return Promise.reject(error);
  }
);

// Export helper methods for common HTTP operations
export const api = {
  get: (url, config = {}) => axiosInstance.get(url, config),
  post: (url, data, config = {}) => axiosInstance.post(url, data, config),
  put: (url, data, config = {}) => axiosInstance.put(url, data, config),
  patch: (url, data, config = {}) => axiosInstance.patch(url, data, config),
  delete: (url, config = {}) => axiosInstance.delete(url, config),
};

export default axiosInstance;
