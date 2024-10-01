import { useNavigate } from 'react-router-dom';
import './JoinRoomPage.css';
import JoinRoomButton from './JoinRoomButton';
type JoinRoomButtonsProps = {
  handleJoinRoom: () => void;
  isRoomHost: boolean;
};

const JoinRoomButtons = ({
  handleJoinRoom,
  isRoomHost,
}: JoinRoomButtonsProps) => {
  const navigate = useNavigate();
  const successButtonText = isRoomHost ? 'Host' : 'Join';

  const pushToIntroductionPage = () => {
    navigate('/');
  };

  return (
    <div className="join_room_buttons_container">
      <JoinRoomButton buttonText={successButtonText} onClick={handleJoinRoom} />
      <JoinRoomButton
        buttonText="Cancel"
        cancelButton
        onClick={pushToIntroductionPage}
      />
    </div>
  );
};

export default JoinRoomButtons;
