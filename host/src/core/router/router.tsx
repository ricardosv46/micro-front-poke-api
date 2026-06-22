import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "../../modules/auth/presentation/routes";
import { homeRoutes } from "../../modules/home/presentation/routes";
import { historyRoutes } from "../../modules/history/presentation/routes";

export const router = createBrowserRouter([...homeRoutes, ...historyRoutes, ...authRoutes]);
