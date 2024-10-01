import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import Root from './Root';
import JoinRoomPage from '../module/join-room/JoinRoomPage';
import IntroductionPage from '../module/introduction/IntroductionPage';
import RoomPage from '../module/room-page/RoomPage';

const routesConfig: RouteObject[] = [
  {
    path: '',
    element: <IntroductionPage />,
  },
  {
    path: 'join-room',
    element: <JoinRoomPage />,
  },
  {
    path: 'room',
    element: <RoomPage />,
  },
  {
    path: '*',
    element: <Navigate to="" replace />,
  },
];

const wrapper: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    children: routesConfig,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
const BrowserRouterConfig = createBrowserRouter(wrapper);
export default BrowserRouterConfig;
