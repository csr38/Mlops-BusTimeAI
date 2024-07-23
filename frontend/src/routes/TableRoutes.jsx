import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';


// login option 3 routing
const TablaEjemplo = Loadable(lazy(() => import('views/table/TablaEjemplo')));
const TablaPrincipal = Loadable(lazy(() => import('views/table/TablaPrincipal')))
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const TableRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/pages/table/tablaEjemplo',
      element: <TablaEjemplo />
    },
    {
      path: '/pages/table/tablaPrincipal',
      element: <TablaPrincipal />
    },
    {
      path: '/pages/register/register3',
      element: <AuthRegister3 />
    }
  ]
};

export default TableRoutes;
