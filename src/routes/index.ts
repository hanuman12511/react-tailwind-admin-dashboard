import { lazy } from 'react';
import Orders from '../pages/Dashboard/Orders';
import CompleteOrder from '../pages/Dashboard/CompleteOrder';
import Users from '../pages/Dashboard/Users';
import AddProduct from '../pages/Dashboard/AddProduct';
import Bill from '../pages/Dashboard/Bill';
import BillPage from '../pages/Dashboard/BillPage';



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
];

const routes = [...coreRoutes];
export default routes;
