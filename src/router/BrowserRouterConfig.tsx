import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import Root from './Root';
import LobbyContainer from '../module/looby/LobbyContainer';
import LobbyHomePage from '../module/looby/pages/LobbyHomePage';
import CreateMeetingPage from '../module/looby/pages/CreateMeetingPage';
import JoinMeetingPage from '../module/looby/pages/JoinMeetingPage';
import MeetingContainer from '../module/meeting/MeetingContainer';

const routesConfig: RouteObject[] = [
  {
    path: '',
    element: <LobbyContainer />,
    children: [
      {
        path: '',
        element: <LobbyHomePage />,
      },
      {
        path: 'join-meeting',
        element: <JoinMeetingPage />,
      },
      {
        path: 'new-meeting',
        element: <CreateMeetingPage />,
      },
    ],
  },
  {
    path: 'meeting',
    element: <MeetingContainer />,
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
