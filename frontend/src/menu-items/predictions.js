// assets
import { IconBus, IconHelp } from '@tabler/icons-react';

// constant
const icons = { IconBus, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const predictions = {
  id: 'prediction',
  type: 'group',
  children: [
    {
      id: 'util-prediccion',
      title: 'Prediccion',
      type: 'item',
      url: 'prediction/page-prediccion',
      icon: icons.IconBus,
      breadcrumbs: false
    },

  ]
};

export default predictions;
