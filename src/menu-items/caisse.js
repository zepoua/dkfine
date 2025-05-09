// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA caisse MENU ITEMS ||============================== //

const caisse = {
  id: 'caisse',
  title: 'Gestion de la Caisse',
  icon: icons.IconKey,
  type: 'group',
  children: [
    {
      id: 'tresorerie',
      title: 'Tresorerie',
      type: 'collapse',
      icon: icons.IconKey,
      children: [
        {
          id: 'cotisations',
          title: 'Cotisations',
          type: 'item',
          url: '/cotisations',
          breadcrumbs: false
        },
        {
          id: 'retraits',
          title: 'Retraits',
          type: 'item',
          url: '/retraits',
          breadcrumbs: false
        },
        {
          id: 'transactions',
          title: 'Transactions',
          type: 'item',
          url: '/transactions',
          breadcrumbs: false
        },
        {
          id: 'dossier_prets',
          title: 'Dossier Prets',
          type: 'item',
          url: '/dossier_prets',
          breadcrumbs: false
        },
        {
          id: 'prets',
          title: 'Prets',
          type: 'item',
          url: '/prets',
          breadcrumbs: false
        },
        {
          id: 'remboursements',
          title: 'Remboursements',
          type: 'item',
          url: '/remboursements',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default caisse;
