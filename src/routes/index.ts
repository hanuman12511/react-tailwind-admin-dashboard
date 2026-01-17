import { lazy } from 'react';
import Orders from '../pages/Dashboard/Orders';
import CompleteOrder from '../pages/Dashboard/CompleteOrder';
import Users from '../pages/Dashboard/Users';
import AddProduct from '../pages/Dashboard/AddProduct';
import Bill from '../pages/Dashboard/Bill';
import BillPage from '../pages/Dashboard/BillPage';
import StackPage from '../pages/Dashboard/StockPage';
import StockPage from '../pages/Dashboard/StockPage';



const Profile = lazy(() => import('../pages/Profile'));

const Prodcut = lazy(() => import('../pages/Dashboard/Product'));

const coreRoutes = [
  {
    path: '/prodcut',
    title: 'Prodcut',
    component: Prodcut,
  },
  {
    path: '/addproduct',
    title: 'Add Prodcut',
    component: AddProduct,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/order',
    title: 'Orders',
    component: Orders,
  },
  {
    path: '/completeorder',
    title: 'Complete Order',
    component: CompleteOrder,
  },
  
  {
    path: '/bill',
    title: 'Bill',
    component: BillPage,
  },
  {
    path: '/users',
    title: 'Users',
    component: Users,
  },
  {
    path: '/stock',
    title: 'stock',
    component: StockPage,
  },
];

const routes = [...coreRoutes];
export default routes;
