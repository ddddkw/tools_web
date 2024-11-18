import {createBrowserRouter} from "react-router-dom";
import {buildRoutes} from "./buildPage";
import {homeRoutes} from "./homePage";

const router = createBrowserRouter([
    ...buildRoutes,
    ...homeRoutes
])
export default router
