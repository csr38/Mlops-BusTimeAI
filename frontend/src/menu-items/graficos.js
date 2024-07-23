// assets
import { IconChartHistogram } from '@tabler/icons-react';

// constant
const icons = {
  IconChartHistogram
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const graficos = {
  id: 'graficos',
  title: 'Graficos',
  caption: 'Graficos Informacion',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Graficos',
      type: 'collapse',
      icon: icons.IconChartHistogram,

      children: [
        {
          id: 'tabla',
          title: 'Velocidad',
          type: 'item',
          url: '/pages/graphic/GraficosEjemplo',
          breadcrumbs: false
        },
      ]
    }
  ]
};

export default graficos;