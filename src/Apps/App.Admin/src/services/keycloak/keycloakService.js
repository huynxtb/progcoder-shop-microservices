import Keycloak from 'keycloak-js';

// Get configuration from environment variables
const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080',
  realm: import.meta.env.VITE_KEYCLOAK_REALM || 'your-realm-name',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'your-client-id',
  redirectUri: import.meta.env.VITE_KEYCLOAK_REDIRECT_URI || window.location.origin + '/ecommerce',
};

// Log configuration for debugging (only in development)
if (import.meta.env.DEV) {
  console.log('Keycloak Configuration:', {
    url: keycloakConfig.url,
    realm: keycloakConfig.realm,
    clientId: keycloakConfig.clientId,
    redirectUri: keycloakConfig.redirectUri,
  });
}

// Initialize Keycloak instance
let keycloakInstance = null;

/**
 * Initialize Keycloak
 * @param {Object} initOptions - Keycloak initialization options
 * @returns {Promise} Promise that resolves when Keycloak is initialized
 */
export const initKeycloak = (initOptions = {}) => {
  if (keycloakInstance) {
    return Promise.resolve(keycloakInstance);
  }

  keycloakInstance = new Keycloak({
    url: keycloakConfig.url,
    realm: keycloakConfig.realm,
    clientId: keycloakConfig.clientId,
  });

  const defaultInitOptions = {
    onLoad: 'check-sso',
    checkLoginIframe: false,
    pkceMethod: 'S256',
    // Ensure we use the configured redirect URI
    redirectUri: keycloakConfig.redirectUri,
  };

  const finalInitOptions = { ...defaultInitOptions, ...initOptions };
  
  // Log for debugging
  if (import.meta.env.DEV) {
    console.log('Initializing Keycloak with options:', {
      ...finalInitOptions,
      // Don't log the full redirectUri if it's very long
      redirectUri: finalInitOptions.redirectUri,
    });
  }

  return keycloakInstance.init(finalInitOptions);
};

/**
 * Get Keycloak instance
 * @returns {Keycloak} Keycloak instance
 */
export const getKeycloak = () => {
  if (!keycloakInstance) {
    throw new Error('Keycloak has not been initialized. Call initKeycloak() first.');
  }
  return keycloakInstance;
};

/**
 * Get default redirect URI from config
 * @returns {string} Redirect URI
 */
export const getRedirectUri = () => {
  return keycloakConfig.redirectUri;
};

/**
 * Login - Redirect to Keycloak login page
 * @param {Object} options - Login options (redirectUri, etc.)
 */
export const login = (options = {}) => {
  const keycloak = getKeycloak();
  const redirectUri = options.redirectUri || keycloakConfig.redirectUri;
  
  // Log for debugging
  if (import.meta.env.DEV) {
    console.log('Keycloak login called with redirectUri:', redirectUri);
  }
  
  keycloak.login({
    redirectUri: redirectUri,
    ...options,
  });
};

/**
 * Logout - Logout and redirect to Keycloak logout page
 * @param {Object} options - Logout options (redirectUri, etc.)
 */
export const logout = (options = {}) => {
  const keycloak = getKeycloak();
  keycloak.logout({
    redirectUri: window.location.origin,
    ...options,
  });
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated
 */
export const isAuthenticated = () => {
  const keycloak = getKeycloak();
  return keycloak.authenticated || false;
};

/**
 * Get access token
 * @returns {string|null} Access token or null
 */
export const getToken = () => {
  const keycloak = getKeycloak();
  return keycloak.token || null;
};

/**
 * Get refresh token
 * @returns {string|null} Refresh token or null
 */
export const getRefreshToken = () => {
  const keycloak = getKeycloak();
  return keycloak.refreshToken || null;
};

/**
 * Get user info from Keycloak token
 * @returns {Object|null} User info object or null
 */
export const getUserInfo = () => {
  const keycloak = getKeycloak();
  if (!keycloak.authenticated) {
    return null;
  }

  // If tokenParsed is available, use it
  if (keycloak.tokenParsed) {
    const tokenParsed = keycloak.tokenParsed;
    return {
      id: tokenParsed.sub || keycloak.subject || 'unknown',
      username: tokenParsed.preferred_username || tokenParsed.username || 'user',
      email: tokenParsed.email || '',
      firstName: tokenParsed.given_name || '',
      lastName: tokenParsed.family_name || '',
      name: tokenParsed.name || (tokenParsed.given_name && tokenParsed.family_name 
        ? `${tokenParsed.given_name} ${tokenParsed.family_name}` 
        : tokenParsed.preferred_username || 'User'),
      roles: tokenParsed.realm_access?.roles || [],
      ...tokenParsed,
    };
  }

  // Fallback: if tokenParsed is not available but we have a token, try to decode it
  // or return a minimal user object based on available info
  if (keycloak.token) {
    try {
      // Try to decode JWT token manually as fallback
      const base64Url = keycloak.token.split('.')[1];
      if (base64Url) {
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const decoded = JSON.parse(jsonPayload);
        
        return {
          id: decoded.sub || keycloak.subject || 'unknown',
          username: decoded.preferred_username || decoded.username || 'user',
          email: decoded.email || '',
          firstName: decoded.given_name || '',
          lastName: decoded.family_name || '',
          name: decoded.name || (decoded.given_name && decoded.family_name 
            ? `${decoded.given_name} ${decoded.family_name}` 
            : decoded.preferred_username || 'User'),
          roles: decoded.realm_access?.roles || [],
          ...decoded,
        };
      }
    } catch (error) {
      console.warn('Failed to decode token manually:', error);
    }
  }

  // Last resort: return minimal user object if we have subject
  if (keycloak.subject) {
    return {
      id: keycloak.subject,
      username: 'user',
      email: '',
      firstName: '',
      lastName: '',
      name: 'User',
      roles: [],
    };
  }

  return null;
};

/**
 * Update token - Refresh the access token
 * @param {number} minValidity - Minimum validity in seconds
 * @returns {Promise} Promise that resolves with boolean indicating if token was updated
 */
export const updateToken = (minValidity = 5) => {
  const keycloak = getKeycloak();
  return keycloak.updateToken(minValidity);
};

/**
 * Check if token is expired or will expire soon
 * @param {number} minValidity - Minimum validity in seconds
 * @returns {boolean} True if token needs refresh
 */
export const isTokenExpired = (minValidity = 5) => {
  const keycloak = getKeycloak();
  return keycloak.isTokenExpired(minValidity);
};

/**
 * Load user profile from Keycloak
 * @returns {Promise} Promise that resolves with user profile
 */
export const loadUserProfile = () => {
  const keycloak = getKeycloak();
  return keycloak.loadUserProfile();
};

