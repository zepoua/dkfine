import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Membres from '../views/membres/membres';
import Carnets from '../views/membres/Carnets';
import Comptes from '../views/membres/Comptes';
import Cotisations from '../views/caisse/Cotisations';
import Retraits from '../views/caisse/Retraits';
import Transactions from '../views/caisse/Transactions';
import Prets from '../views/caisse/Prets';
import Remboursements from '../views/caisse/Remboursements';
import Recettes from '../views/recettes/recettes';
import Utilisateurs from '../pages/UserPage';
import Profils from '../views/administration/Profils';
import Roles from '../views/administration/Roles';
import Microfinance from '../views/administration/Microfinance';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'membres',
      element: <Membres />
    },
    {
      path: 'carnets',
      element: <Carnets />
    },
    {
      path: 'comptes',
      element: <Comptes />
    },
    {
      path: '/cotisations',
      element: <Cotisations />
    },
    {
      path: '/retraits',
      element: <Retraits />
    },
    {
      path: '/transactions',
      element: <Transactions />
    },
    {
      path: '/prets',
      element: <Prets />
    },
    {
      path: '/remboursements',
      element: <Remboursements />
    },
    {
      path: '/recettes',
      element: <Recettes />
    },
    {
      path: '/utilisateurs',
      element: <Utilisateurs />
    },
    {
      path: '/profils',
      element: <Profils />
    },
    {
      path: '/roles',
      element: <Roles />
    },
    {
      path: '/microfinance',
      element: <Microfinance />
    },
  ]
};

export default MainRoutes;
