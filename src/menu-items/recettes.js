// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const recettes = {
    id: 'sample-docs-roadmap',
    type: 'group',
    title: 'Etats Financiers',
    icon: icons.IconBrandChrome,
    children: [
        {
            id: 'sample-page',
            title: 'Etat Recettes',
            type: 'item',
            url: '/recettes',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
    ]
};

export default recettes;
