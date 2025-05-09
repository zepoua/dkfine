// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA administration MENU ITEMS ||============================== //

const administration = {
  id: 'administration',
  title: 'Administration',
  icon: icons.IconKey,
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Gestion l\'administration',
      type: 'collapse',
      icon: icons.IconKey,
      children: [
        {
          id: 'users',
          title: 'Utilisateurs',
          type: 'item',
          url: '/utilisateurs',
          breadcrumbs: false
        },
        {
          id: 'profils',
          title: 'Prolfils',
          type: 'item',
          url: '/profils',
          breadcrumbs: false
        },
        {
          id: 'roles',
          title: 'Roles',
          type: 'item',
          url: '/roles',
          breadcrumbs: false
        },
        {
          id: 'microfinance',
          title: 'Microfinance',
          type: 'item',
          url: '/microfinance',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default administration;
