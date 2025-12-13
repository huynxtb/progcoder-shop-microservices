import Keycloak from 'keycloak-js';

// Get configuration from environment variables
const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM ,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  redirectUri: import.meta.env.VITE_KEYCLOAK_REDIRECT_URI,
};

// Check if Keycloak config is valid (not using placeholder values)
const isKeycloakConfigValid = () => {
  // Check if any config value is missing or is a placeholder
  const hasPlaceholderValues = 
    !keycloakConfig.url ||
    !keycloakConfig.realm ||
    !keycloakConfig.clientId ||
    keycloakConfig.realm === 'your-realm-name' || 
    keycloakConfig.clientId === 'your-client-id' ||
    keycloakConfig.url === 'not_config';
  
  return !hasPlaceholderValues;
};

// Log configuration for debugging
  console.log('Keycloak Configuration:', {
    url: keycloakConfig.url,
    realm: keycloakConfig.realm,
    clientId: keycloakConfig.clientId,
    redirectUri: keycloakConfig.redirectUri,
  });

// ==================== Cookie Helper Functions ====================

/**
 * Set a cookie
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} days - Expiration in days (default: 1 day)
 */
const setCookie = (name, value, days = 1) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  
  // Set secure flag only in production (HTTPS)
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  
  document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax${secure}`;
  
    console.log(`Cookie set: ${name}`);
};

/**
 * Delete a cookie
 * @param {string} name - Cookie name
 */
const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  
    console.log(`Cookie deleted: ${name}`);
};

/**
 * Set access token cookie
 * @param {string} token - Access token value
 */
const setAccessTokenCookie = (token) => {
  if (token) {
    // Set cookie to expire in 1 day (token refresh will update it)
    setCookie('access_token', token, 1);
  }
};

/**
 * Delete access token cookie
 */
const deleteAccessTokenCookie = () => {
  deleteCookie('access_token');
};

// ==================== Keycloak Instance ====================

// Initialize Keycloak instance
let keycloakInstance = null;

/**
 * Initialize Keycloak
 * @param {Object} initOptions - Keycloak initialization options
 * @returns {Promise} Promise that resolves when Keycloak is initialized
 */
export const initKeycloak = (initOptions = {}) => {
  // If Keycloak config is not valid, don't initialize
  if (!isKeycloakConfigValid()) {
      console.warn('Keycloak configuration is not valid. Skipping initialization. Please check your .env file.');
    // Return a resolved promise with false to indicate config is invalid
    return Promise.resolve(false);
  }

  // If already initialized, return the authentication status
  if (keycloakInstance) {
    return Promise.resolve(keycloakInstance.authenticated || false);
  }

  keycloakInstance = new Keycloak({
    url: keycloakConfig.url,
    realm: keycloakConfig.realm,
    clientId: keycloakConfig.clientId,
  });

  // Set up event callbacks
  keycloakInstance.onAuthSuccess = () => {
      console.log('Keycloak: Authentication successful');
    // Set access token cookie on successful authentication
    if (keycloakInstance.token) {
      setAccessTokenCookie(keycloakInstance.token);
    }
  };

  keycloakInstance.onAuthRefreshSuccess = () => {
      console.log('Keycloak: Token refresh successful');
    // Update access token cookie after refresh
    if (keycloakInstance.token) {
      setAccessTokenCookie(keycloakInstance.token);
    }
  };

  keycloakInstance.onAuthLogout = () => {
      console.log('Keycloak: User logged out');
    // Delete access token cookie on logout
    deleteAccessTokenCookie();
  };

  keycloakInstance.onTokenExpired = () => {
      console.log('Keycloak: Token expired, attempting refresh...');
    // Try to refresh the token
    keycloakInstance.updateToken(30).then((refreshed) => {
      if (refreshed) {
          console.log('Keycloak: Token refreshed successfully');
        setAccessTokenCookie(keycloakInstance.token);
      }
    }).catch(() => {
      console.warn('Keycloak: Failed to refresh token, user may need to re-login');
      deleteAccessTokenCookie();
    });
  };

  keycloakInstance.onAuthError = (error) => {
    console.error('Keycloak: Authentication error', error);
    deleteAccessTokenCookie();
  };

  // Ensure redirectUri is consistent - use origin (not full URL with path)
  // This matches what Keycloak expects when redirecting back after login
  const getConsistentRedirectUri = (providedUri) => {
    if (providedUri) {
      try {
        const url = new URL(providedUri);
        // Return only origin to ensure consistency
        return url.origin;
      } catch (e) {
        // If URL parsing fails, use the provided URI as-is
        return providedUri;
      }
    }
    return keycloakConfig.redirectUri;
  };

  const defaultInitOptions = {
    onLoad: 'check-sso',
    checkLoginIframe: false,
    pkceMethod: 'S256',
    // Ensure we use the configured redirect URI (or override from initOptions)
    // Normalize to origin for consistency
    redirectUri: getConsistentRedirectUri(initOptions.redirectUri),
  };

  const finalInitOptions = { ...defaultInitOptions, ...initOptions };
  
  // Ensure redirectUri in final options is normalized
  finalInitOptions.redirectUri = getConsistentRedirectUri(finalInitOptions.redirectUri);
  
  // Log for debugging
    console.log('Initializing Keycloak with options:', {
      ...finalInitOptions,
      // Don't log the full redirectUri if it's very long
      redirectUri: finalInitOptions.redirectUri,
    });

  return keycloakInstance.init(finalInitOptions).then((authenticated) => {
    const urlParams = new URLSearchParams(window.location.search);
    const isCallback = urlParams.has('code') || urlParams.has('session_state');
    
    if (authenticated && keycloakInstance.token) {
      // Set access token cookie if already authenticated (e.g., SSO or after redirect)
      setAccessTokenCookie(keycloakInstance.token);
        console.log('Keycloak: User is authenticated', {
          authenticated,
          hasToken: !!keycloakInstance.token,
          tokenParsed: !!keycloakInstance.tokenParsed,
        isCallback: isCallback,
          hasCode: urlParams.has('code'),
          hasSessionState: urlParams.has('session_state'),
          redirectUri: finalInitOptions.redirectUri,
        });
    } else {
      // Make sure cookie is cleared if not authenticated
      deleteAccessTokenCookie();
        console.log('Keycloak: User is not authenticated', {
          authenticated,
          hasToken: !!keycloakInstance.token,
        isCallback: isCallback,
          hasCode: urlParams.has('code'),
          hasSessionState: urlParams.has('session_state'),
          redirectUri: finalInitOptions.redirectUri,
          currentUrl: window.location.href,
        });
      
      // If we have callback params but not authenticated, there might be an issue
      if (isCallback && !authenticated) {
        console.warn('Keycloak: Callback detected but user not authenticated. This might indicate a redirectUri mismatch or authentication failure.');
      }
    }
    return authenticated;
  }).catch((error) => {
    // Enhanced error handling for callback processing
    const urlParams = new URLSearchParams(window.location.search);
    const isCallback = urlParams.has('code') || urlParams.has('session_state');
    
    console.error('Keycloak initialization error:', error);
    if (isCallback) {
      console.error('Keycloak: Error occurred while processing callback. Check redirectUri configuration.');
    }
    throw error;
  });
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
  // Normalize redirectUri to origin for consistency with init()
  // Keycloak redirects back to origin, so we need to match that
  const normalizeRedirectUri = (uri) => {
    if (!uri) {
      return keycloakConfig.redirectUri || window.location.origin;
    }
    try {
      const url = new URL(uri);
      // Return only origin to ensure consistency with init()
      return url.origin;
    } catch (e) {
      // If URL parsing fails, use as-is but prefer origin
      return uri.includes('://') ? uri : window.location.origin;
    }
  };
  
  // Use provided redirectUri or fallback to config/default
  const redirectUri = normalizeRedirectUri(options.redirectUri || keycloakConfig.redirectUri || window.location.origin);
  
  // Log for debugging
  console.log('Keycloak login called with redirectUri:', redirectUri);
  console.log('Keycloak config:', {
    url: keycloakConfig.url,
    realm: keycloakConfig.realm,
    clientId: keycloakConfig.clientId,
    isValid: isKeycloakConfigValid(),
    redirectUri: redirectUri,
  });

  // Check if Keycloak config is valid
  if (!isKeycloakConfigValid()) {
    console.warn('Keycloak configuration is not valid. Attempting to redirect anyway with current config.');
    // Still try to redirect - let Keycloak server show the error if config is wrong
  }

  try {
    // Try to get Keycloak instance and use it
    const keycloak = getKeycloak();
    
    if (keycloak && typeof keycloak.login === 'function') {
      // Use Keycloak instance login method
      console.log('Using Keycloak instance login method');
      keycloak.login({
        redirectUri: redirectUri,
        ...options,
      });
      return;
    }
  } catch (error) {
    console.warn('Keycloak instance not available, constructing login URL manually:', error);
  }

  // If Keycloak instance is not available, construct login URL manually
  // This will always redirect, even if config is invalid (Keycloak server will show error)
  try {
    // Construct Keycloak login URL manually
    const loginUrl = `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/auth?client_id=${encodeURIComponent(keycloakConfig.clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid`;
    
    console.log('Redirecting to Keycloak login URL:', loginUrl);
    
    // Redirect immediately - this will always happen
    window.location.href = loginUrl;
  } catch (urlError) {
    console.error('Failed to construct Keycloak login URL:', urlError);
    // Even if URL construction fails, try to redirect to a basic Keycloak URL
    const fallbackUrl = `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/auth`;
    console.warn('Using fallback Keycloak URL:', fallbackUrl);
    window.location.href = fallbackUrl;
  }
};

/**
 * Logout - Logout and redirect to Keycloak logout page
 * @param {Object} options - Logout options (redirectUri, etc.)
 */
export const logout = (options = {}) => {
  const keycloak = getKeycloak();
  
  // Delete access token cookie before logout
  deleteAccessTokenCookie();
  
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
  return keycloak.updateToken(minValidity).then((refreshed) => {
    if (refreshed && keycloak.token) {
      // Update access token cookie after successful refresh
      setAccessTokenCookie(keycloak.token);
    }
    return refreshed;
  });
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

