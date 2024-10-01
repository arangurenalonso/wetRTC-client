import { Provider } from 'react-redux';
import './App.css';
import store from './store/store';
import RouterConfig from './router/RouterConfig';
import WebRCTProvider from './context/webRTC/webRCTProvider';
import SocketProvider from './context/wss/socketProvider';

function App() {
  return (
    <Provider store={store}>
      <SocketProvider>
        <WebRCTProvider>
          <RouterConfig />
        </WebRCTProvider>
      </SocketProvider>
    </Provider>
  );
}

export default App;
