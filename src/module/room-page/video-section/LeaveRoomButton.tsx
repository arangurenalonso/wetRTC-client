import { useNavigate } from 'react-router-dom';
import '../RoomPage.css';
type LeaveRoomButtonProps = {};
const LeaveRoomButton = ({}: LeaveRoomButtonProps) => {
  const navigate = useNavigate();
  const handleRoomDisconnected = () => {
    navigate('/');
  };
  return (
    <div className="video_button_container">
      <button className="video_button_end" onClick={handleRoomDisconnected}>
        Leave Room
      </button>
    </div>
  );
};

export default LeaveRoomButton;
