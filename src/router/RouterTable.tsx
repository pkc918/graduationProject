import Home from '../views/Home/home';
import Login from '../views/Login/Login';
import QueryPage from '../views/QueryPage/QueryPage';
import FeedbackInfo from '../views/Feedback/FeedbackInfo';
import BrowsingRecords from '../views/BrowsingRecords/BrowsingRecords';

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
  },
  {
    path: '/querypage',
    component: QueryPage
  },
  {
    path: '/feedback',
    component: FeedbackInfo
  },
  {
    path: '/browsingrecords',
    component: BrowsingRecords
  }
]
