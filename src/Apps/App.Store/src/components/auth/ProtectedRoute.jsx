import React from 'react';
import { Navigate } from 'react-router-dom';
import { useKeycloak } from '../../contexts/KeycloakContext';

const ProtectedRoute = ({ children }) => {
  const { authenticated, login, keycloakReady } = useKeycloak();
  const [redirecting, setRedirecting] = React.useState(false);

  // Check if we're processing a callback (URL has code parameter)
  const isProcessingCallback = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('code') || urlParams.has('session_state');
  };

  // Try to login when Keycloak is ready and user is not authenticated
  React.useEffect(() => {
    // Don't trigger login if we're processing a callback
    // KeycloakContext will handle the callback processing
    if (isProcessingCallback()) {
      console.log('ProtectedRoute: Waiting for callback processing');
      return;
    }

    if (keycloakReady && !authenticated && !redirecting) {
      setRedirecting(true);
      // Use VITE_KEYCLOAK_REDIRECT_URI from environment variables, fallback to current location
      // Use origin (not full URL) to match what Keycloak expects
      const redirectUri = import.meta.env.VITE_KEYCLOAK_REDIRECT_URI || window.location.origin;
      
      // Log for debugging
      console.log('ProtectedRoute: Redirecting to Keycloak login', { redirectUri });
      
      // Immediately redirect to Keycloak login
      login({ redirectUri });
    }
  }, [keycloakReady, authenticated, login, redirecting]);

  // Wait for Keycloak to be ready or if we're processing a callback
  if (!keycloakReady || isProcessingCallback()) {
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

  // If not authenticated, login() should have been called and redirect should happen
  // Return null while redirecting (should not reach here if redirect works)
  if (!authenticated) {
    return null;
  }

  // User is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;

