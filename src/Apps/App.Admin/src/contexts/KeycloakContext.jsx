import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initKeycloak, getKeycloak, isAuthenticated, getUserInfo, updateToken, login as keycloakLogin, logout as keycloakLogout, loadUserProfile } from '@/services/keycloak/keycloakService';
import { setUser, logOut } from '@/store/api/auth/authSlice';
import Loading from '@/components/Loading';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokenRefreshIntervalRef = useRef(null);

  // Initialize Keycloak
  useEffect(() => {
    const initializeKeycloak = async () => {
      try {
        setLoading(true);
        
        // Try to initialize Keycloak
        const initResult = await initKeycloak({
          onLoad: 'check-sso',
          checkLoginIframe: false,
        });

        // initResult can be:
        // - true: authenticated
        // - false: not authenticated but initialization successful (can still login)
        // - throws error: initialization failed (server not accessible, wrong config, etc.)
        
        // Get the keycloak instance
        let keycloak;
        try {
          keycloak = getKeycloak();
        } catch (error) {
          console.error('Failed to get Keycloak instance:', error);
          setLoading(false);
          setKeycloakReady(false);
          return;
        }

        // Verify keycloak is a valid object before setting event handlers
        if (!keycloak || typeof keycloak !== 'object') {
          console.error('Invalid Keycloak instance');
          setLoading(false);
          setKeycloakReady(false);
          return;
        }

        setKeycloakReady(true);
        setAuthenticated(keycloak.authenticated || false);

        // If authenticated, sync user info with Redux
        // Use retry logic in case tokenParsed isn't ready yet
        if (keycloak.authenticated) {
          const syncUserInfo = async (retries = 3, delay = 100) => {
            for (let i = 0; i < retries; i++) {
              // Wait a bit for tokenParsed to be available
              if (i > 0) {
                await new Promise(resolve => setTimeout(resolve, delay));
              }
              
              const userInfo = getUserInfo();
              if (userInfo) {
                dispatch(setUser(userInfo));
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
                    dispatch(setUser(fallbackUserInfo));
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
                  dispatch(setUser(userInfo));
                  localStorage.setItem('user', JSON.stringify(userInfo));
                  return;
                }
              }
            };
            
            await syncUserInfo();
          };

          keycloak.onAuthError = () => {
            setAuthenticated(false);
            dispatch(logOut());
            localStorage.removeItem('user');
          };

          keycloak.onAuthLogout = () => {
            setAuthenticated(false);
            dispatch(logOut());
            localStorage.removeItem('user');
            navigate('/login');
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

        setLoading(false);
      } catch (error) {
        console.error('Failed to initialize Keycloak:', error);
        setLoading(false);
        setKeycloakReady(false);
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
  }, [dispatch, navigate]);

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
    return <Loading />;
  }

  return (
    <KeycloakContext.Provider value={value}>
      {children}
    </KeycloakContext.Provider>
  );
};

