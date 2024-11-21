import {createBrowserRouter, Navigate} from "react-router-dom";
import {buildRoutes} from "./buildPage";
import {homeRoutes} from "./homePage";

const router = createBrowserRouter([
    ...buildRoutes,
    ...homeRoutes,
    { path: '*', element: <Navigate to="/HomePage" replace /> },
])
export default router
