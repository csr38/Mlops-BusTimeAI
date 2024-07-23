// assets
import { IconTableFilled } from '@tabler/icons-react';

// constant
const icons = {
  IconTableFilled
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const tables = {
  id: 'tablas',
  title: 'Tablas',
  caption: 'Tabla Informacion',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Tablas',
      type: 'collapse',
      icon: icons.IconTableFilled,

      children: [
        {
          id: 'tabla',
          title: 'Dato Transporte',
          type: 'item',
          url: '/pages/table/tablaEjemplo',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default tables;