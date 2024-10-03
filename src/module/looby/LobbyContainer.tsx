import { Outlet } from 'react-router-dom';
import LobbyLayout from './layout/LobbyLayout';

const LobbyContainer = () => {
  return (
    <>
      <LobbyLayout>
        <Outlet />
      </LobbyLayout>
    </>
  );
};

export default LobbyContainer;
