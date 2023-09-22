import { DashBoardIcon } from './icons/DashBoardIcon';
import { AccountIcon } from './icons/AccountIcon';
import { ProductIcon } from './icons/ProductIcon';
import { OrderIcon } from './icons/OrderIcon';
import { DocIcon } from './icons/DocIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import routes from '@/constant/routes';

export const data = [
  {
    title: 'Dashboard',
    icon: <DashBoardIcon />,
    link: routes.DASHBOARD,
  },
  {
    title: 'Accounts',
    icon: <AccountIcon />,
    link: routes.ACCOUNT,
  },
  {
    title: 'Products',
    icon: <ProductIcon />,
    link: routes.PRODUCT,
  },
  {
    title: 'Orders',
    icon: <OrderIcon />,
    link: routes.ORDER,
  },
  {
    title: 'Settings',
    icon: <SettingsIcon />,
    link: '/admin/settings',
  },
  {
    title: 'Documentation',
    icon: <DocIcon />,
    link: '/admin/documentation',
  },
];
