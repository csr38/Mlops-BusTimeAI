import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import tables from './tables';
import graficos from './graficos';
import predictions from './predictions';
// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, tables,graficos,  predictions]
};
//items: [dashboard, tables,graficos,  pages, predictions, utilities, other]
export default menuItems;
