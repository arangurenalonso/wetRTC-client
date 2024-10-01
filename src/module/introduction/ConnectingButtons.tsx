import ConnectingButton from './ConnectingButton';
import { useNavigate } from 'react-router-dom';

const ConnectingButtons = () => {
  const navigate = useNavigate();
  const pushToJoinRoomPage = () => {
    const params = new URLSearchParams({
      host: 'false',
      //  roomId: '12345'
    });
    const path = `/join-room?${params.toString()}`;
    navigate(path, { state: { isHost: true } });
  };
  const pushToJoinRoomPageAsHost = () => {
    const params = new URLSearchParams({
      host: 'true',
      //  roomId: '12345'
    });
    const path = `/join-room?${params.toString()}`;

    navigate(path, { state: { isHost: true } });
    // navigate('/room?host=true', { state: { isHost: true } });
  };
  return (
    <div className="connecting_buttons_container">
      <ConnectingButton
        isRoomCreated={false}
        buttonText="Join a meeting"
        onClick={() => {
          pushToJoinRoomPage();
        }}
      />
      <ConnectingButton
        isRoomCreated={true}
        buttonText="Host a meeeting"
        onClick={() => {
          pushToJoinRoomPageAsHost();
        }}
      />
    </div>
  );
};

export default ConnectingButtons;
