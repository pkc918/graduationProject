import Home from '../views/Home/home';
import Login from '../views/Login/Login';

interface routerTable {
  path: string,
  component?: any,
  auth?: boolean
}

export const routerConfig:routerTable[] = [
  {
    path: '/',
    component: Home,
    auth: true
  },
  {
    path: '/home',
    component: Home,
    auth: true
  },
  {
    path: '/login',
    component: Login
  }
]
