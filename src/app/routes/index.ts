import express from 'express';
import { AdminRoutes } from '../modules/admin/admin.route';

import { AuthRoutes } from '../modules/auth/auth.route';
import { BookRoutes } from '../modules/book/book.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth/',
    route: AuthRoutes,
  },
  {
    path:'/users',
    route:UserRoutes
  },
  {
    path:'/books',
    route:BookRoutes

  },
  
  {
    path:'/admins',
    route:AdminRoutes
  }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
