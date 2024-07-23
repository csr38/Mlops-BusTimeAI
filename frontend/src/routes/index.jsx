import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './AuthenticationRoutes';
import TableRoutes from './TableRoutes';
import GraphicRoutes from './GraphicRoutes';

// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([MainRoutes, LoginRoutes, TableRoutes, GraphicRoutes], {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
