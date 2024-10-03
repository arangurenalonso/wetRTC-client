import { Provider } from 'react-redux';
import './App.css';
import store from './store/store';
import RouterConfig from './router/RouterConfig';
import WebRCTProvider from './context/webRTC/webRCTProvider';
import SocketProvider from './context/wss/socketProvider';
import AppTheme from './theme/AppTheme';

function App() {
  return (
    <Provider store={store}>
      <AppTheme>
        <SocketProvider>
          <WebRCTProvider>
            <RouterConfig />
          </WebRCTProvider>
        </SocketProvider>
      </AppTheme>
    </Provider>
  );
}

export default App;
