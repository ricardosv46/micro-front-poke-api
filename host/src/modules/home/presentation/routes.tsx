import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "../../auth/presentation/guards/ProtectedRoute";
import { HOME_ROUTES } from "./paths";

const HomePage = lazy(() => import("./pages/HomePage"));
const PokemonDetailPage = lazy(() => import("./pages/PokemonDetailPage"));

export { HOME_ROUTES };

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
);

export const homeRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      { path: HOME_ROUTES.HOME, element: withSuspense(<HomePage />) },
      { path: HOME_ROUTES.POKEMON_DETAIL, element: withSuspense(<PokemonDetailPage />) },
    ],
  },
];
