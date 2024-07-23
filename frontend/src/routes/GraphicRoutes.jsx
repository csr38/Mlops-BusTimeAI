import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';


// login option 3 routing
const GraficosEjemplo = Loadable(lazy(() => import('views/graphic/GraficosEjemplo')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const GraphicRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/pages/graphic/GraficosEjemplo',
      element: <GraficosEjemplo />
    },
    {
      path: '/pages/register/register3',
      element: <AuthRegister3 />
    }
  ]
};

export default GraphicRoutes;
