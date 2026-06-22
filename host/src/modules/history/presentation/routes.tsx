import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "../../auth/presentation/guards/ProtectedRoute";
import { HISTORY_ROUTES } from "./paths";

const HistoryPage = lazy(() => import("./pages/HistoryPage"));

export { HISTORY_ROUTES };

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
);

export const historyRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [{ path: HISTORY_ROUTES.HISTORY, element: withSuspense(<HistoryPage />) }],
  },
];
