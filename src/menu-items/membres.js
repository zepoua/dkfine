// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA membres MENU ITEMS ||============================== //

const membres = {
  id: 'Membres',
  title: 'Membres',
  icon: icons.IconKey,
  type: 'group',
  children: [
    {
      id: 'gestion_membres',
      title: 'Gestion des Membres',
      type: 'collapse',
      icon: icons.IconKey,
      children: [
        {
          id: 'membres',
          title: 'Les Membres',
          type: 'item',
          url: '/membres',
          breadcrumbs: false
        },
        {
          id: 'carnets',
          title: 'Les Carnets',
          type: 'item',
          url: '/carnets',
          breadcrumbs: false
        },
        {
          id: 'comptes',
          title: 'Les Comptes',
          type: 'item',
          url: '/comptes',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default membres;
