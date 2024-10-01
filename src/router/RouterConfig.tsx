import { RouterProvider } from 'react-router-dom';
import BrowserRouterConfig from './BrowserRouterConfig';
const RouterConfig = () => {
  return <RouterProvider router={BrowserRouterConfig} />;
};
export default RouterConfig;
