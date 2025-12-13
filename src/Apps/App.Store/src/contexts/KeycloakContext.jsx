import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { initKeycloak, getKeycloak, isAuthenticated, getUserInfo, updateToken, login as keycloakLogin, logout as keycloakLogout, loadUserProfile } from '../services/keycloakService';

const KeycloakContext = createContext(null);

export const useKeycloak = () => {
  const context = useContext(KeycloakContext);
  if (!context) {
    throw new Error('useKeycloak must be used within a KeycloakProvider');
  }
  return context;
};

export const KeycloakProvider = ({ children }) => {
  const [keycloakReady, setKeycloakReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const tokenRefreshIntervalRef = useRef(null);
  const hasProcessedRedirectRef = useRef(false);

  // Check if we're processing a callback (URL has code parameter)
  const isProcessingCallback = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('code') || urlParams.has('session_state');
  };

  // Clear URL parameters after processing callback
  const clearCallbackParams = () => {
    if (isProcessingCallback()) {
      const url = new URL(window.location.href);
      url.searchParams.delete('code');
      url.searchParams.delete('session_state');
      url.searchParams.delete('state');
      // Use replaceState to avoid adding to history
      window.history.replaceState({}, '', url.toString());
    }
  };

  // Initialize Keycloak
  useEffect(() => {
    const initializeKeycloak = async () => {
      try {
        setLoading(true);
        
        // Check if we're processing a callback
        const processingCallback = isProcessingCallback();
        
        if (processingCallback) {
          console.log('Keycloak: Processing callback from redirect');
        }
        
        // Ensure redirectUri is consistent - use origin (not full URL with path)
        const redirectUri = import.meta.env.VITE_KEYCLOAK_REDIRECT_URI || window.location.origin;
        
        // Try to initialize Keycloak
        const initResult = await initKeycloak({
          onLoad: 'check-sso',
          checkLoginIframe: false,
          redirectUri: redirectUri,
        });

        // initResult can be:
        // - true: authenticated
        // - false: not authenticated but initialization successful (can still login) OR config invalid
        // - throws error: initialization failed (server not accessible, wrong config, etc.)
        
        // Get the keycloak instance
        // If initResult is false, it could mean:
        // 1. Config is invalid (keycloakInstance was never created) - getKeycloak() will throw
        // 2. User is not authenticated (keycloakInstance exists but authenticated = false)
        let keycloak;
        try {
          keycloak = getKeycloak();
          // If we can get instance, initialization was successful
        } catch (error) {
          // If we can't get instance, it means initialization failed (config invalid, etc.)
          console.warn('Keycloak initialization failed or config invalid:', error);
          setLoading(false);
          setKeycloakReady(true); // Mark as ready so ProtectedRoute can handle it
          setAuthenticated(false);
          return;
        }

        // Verify keycloak is a valid object before setting event handlers
        if (!keycloak || typeof keycloak !== 'object') {
          console.error('Invalid Keycloak instance');
          setLoading(false);
          setKeycloakReady(false);
          return;
        }

        // If processing callback, wait a bit for Keycloak to process it
        if (processingCallback) {
          // Wait for Keycloak to process the callback
          // Keycloak.init() should have already processed it, but token might not be ready immediately
          let retries = 5;
          let delay = 200;
          
          while (retries > 0 && !keycloak.authenticated && !keycloak.token) {
            await new Promise(resolve => setTimeout(resolve, delay));
            retries--;
            // Check again if authenticated state changed
            if (keycloak.authenticated || keycloak.token) {
              break;
            }
          }
          
          console.log('Keycloak: After callback processing', {
            authenticated: keycloak.authenticated,
            hasToken: !!keycloak.token,
            hasTokenParsed: !!keycloak.tokenParsed,
          });
        }

        setAuthenticated(keycloak.authenticated || false);

        // If authenticated, store user info in localStorage
        if (keycloak.authenticated) {
          const syncUserInfo = async (retries = 3, delay = 100) => {
            for (let i = 0; i < retries; i++) {
              // Wait a bit for tokenParsed to be available
              if (i > 0) {
                await new Promise(resolve => setTimeout(resolve, delay));
              }
              
              const userInfo = getUserInfo();
              if (userInfo) {
                localStorage.setItem('user', JSON.stringify(userInfo));
                return;
              }
              
              // If tokenParsed is still not available, try loading user profile as fallback
              if (i === retries - 1 && keycloak.tokenParsed === undefined) {
                try {
                  const profile = await loadUserProfile();
                  if (profile) {
                    const fallbackUserInfo = {
                      id: profile.id || keycloak.subject || 'unknown',
                      username: profile.username || profile.preferred_username || 'user',
                      email: profile.email || '',
                      firstName: profile.firstName || profile.given_name || '',
                      lastName: profile.lastName || profile.family_name || '',
                      name: profile.firstName && profile.lastName 
                        ? `${profile.firstName} ${profile.lastName}` 
                        : profile.name || '',
                      roles: [],
                    };
                    localStorage.setItem('user', JSON.stringify(fallbackUserInfo));
                  }
                } catch (error) {
                  console.warn('Failed to load user profile:', error);
                }
              }
            }
          };
          
          syncUserInfo();
        }

        // Set up event listeners only if keycloak is valid
        if (keycloak && typeof keycloak === 'object') {
          keycloak.onAuthSuccess = async () => {
            setAuthenticated(true);
            
            // Retry getting user info in case tokenParsed isn't ready yet
            const syncUserInfo = async (retries = 3, delay = 100) => {
              for (let i = 0; i < retries; i++) {
                if (i > 0) {
                  await new Promise(resolve => setTimeout(resolve, delay));
                }
                
                const userInfo = getUserInfo();
                if (userInfo) {
                  localStorage.setItem('user', JSON.stringify(userInfo));
                  return;
                }
              }
            };
            
            await syncUserInfo();
            
            // Clear callback params after successful authentication
            if (isProcessingCallback()) {
              clearCallbackParams();
            }
          };

          keycloak.onAuthError = () => {
            setAuthenticated(false);
            localStorage.removeItem('user');
          };

          keycloak.onAuthLogout = () => {
            setAuthenticated(false);
            localStorage.removeItem('user');
            navigate('/');
          };

          keycloak.onTokenExpired = () => {
            updateToken().catch(() => {
              // If token refresh fails, logout
              if (keycloak && typeof keycloak.logout === 'function') {
                keycloak.logout();
              }
            });
          };

          // Set up token refresh interval
          tokenRefreshIntervalRef.current = setInterval(() => {
            if (keycloak && keycloak.authenticated) {
              updateToken(30).catch(() => {
                if (tokenRefreshIntervalRef.current) {
                  clearInterval(tokenRefreshIntervalRef.current);
                  tokenRefreshIntervalRef.current = null;
                }
              });
            }
          }, 60000); // Check every minute
        }

        // Mark Keycloak as ready after initialization
        setKeycloakReady(true);
        
        // Clear callback params if we successfully authenticated after callback
        if (processingCallback && keycloak.authenticated) {
          // Small delay to ensure everything is processed
          setTimeout(() => {
            clearCallbackParams();
          }, 500);
        }

        setLoading(false);
      } catch (error) {
        console.error('Failed to initialize Keycloak:', error);
        // Don't block the app if Keycloak fails to initialize
        // Just mark as not ready and continue without authentication
        setLoading(false);
        setKeycloakReady(true); // Mark as ready so ProtectedRoute can handle it
        setAuthenticated(false);
      }
    };

    initializeKeycloak();

    // Cleanup function - runs when component unmounts or dependencies change
    return () => {
      if (tokenRefreshIntervalRef.current) {
        clearInterval(tokenRefreshIntervalRef.current);
        tokenRefreshIntervalRef.current = null;
      }
    };
  }, [navigate]); // Only run once on mount (redirect callback is a new page load)


  const login = useCallback((options = {}) => {
    keycloakLogin(options);
  }, []);

  const logout = useCallback((options = {}) => {
    keycloakLogout(options);
  }, []);

  const value = {
    keycloakReady,
    authenticated,
    login,
    logout,
    getKeycloak,
    getUserInfo,
    updateToken,
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <KeycloakContext.Provider value={value}>
      {children}
    </KeycloakContext.Provider>
  );
};
