import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { AUTH_ROUTES } from "./paths";
import { GuestRoute } from "./guards/GuestRoute";

const LoginPage = lazy(() => import("./pages/LoginPage"));

export { AUTH_ROUTES };

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
);

export const authRoutes: RouteObject[] = [
  {
    element: <GuestRoute />,
    children: [{ path: AUTH_ROUTES.LOGIN, element: withSuspense(<LoginPage />) }],
  },
];
