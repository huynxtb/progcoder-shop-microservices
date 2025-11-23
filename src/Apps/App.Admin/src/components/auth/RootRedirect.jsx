import { useEffect, lazy, Suspense } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useKeycloak } from '@/contexts/KeycloakContext';
import Loading from '@/components/Loading';
import Layout from '@/layout/Layout';

const Ecommerce = lazy(() => import('@/pages/dashboard/ecommerce'));

const RootRedirect = () => {
  const navigate = useNavigate();
  const { authenticated, keycloakReady } = useKeycloak();

  useEffect(() => {
    if (!keycloakReady) {
      return;
    }

    if (!authenticated) {
      // If not authenticated, redirect to /login
      navigate('/login', { replace: true });
    }
  }, [authenticated, keycloakReady, navigate]);

  // If Keycloak is not ready, show loading
  if (!keycloakReady) {
    return <Loading />;
  }

  // If not authenticated, show loading while redirecting
  if (!authenticated) {
    return <Loading />;
  }

  // If authenticated, load ecommerce page directly
  return (
    <Suspense fallback={<Loading />}>
      <Ecommerce />
    </Suspense>
  );
};

export default RootRedirect;

