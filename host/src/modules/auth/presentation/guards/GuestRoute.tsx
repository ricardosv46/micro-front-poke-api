import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthenticated } from "../store/useAuthStore";
import { HOME_ROUTES } from "../../../home/presentation/paths";

export const GuestRoute = () => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) return <Navigate to={HOME_ROUTES.HOME} replace />;

  return <Outlet />;
};
