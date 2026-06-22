import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthenticated } from "../store/useAuthStore";
import { AUTH_ROUTES } from "../paths";
import { Layout } from "../../../../core/layout/Layout";

export const ProtectedRoute = () => {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) return <Navigate to={AUTH_ROUTES.LOGIN} replace />;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
