import '../RoomPage.css';
import CamaraButton from './CamaraButton';
import LeaveRoomButton from './LeaveRoomButton';
import MicButton from './MicButton';
import SwitchToScreenSharingButton from './SwitchToScreenSharingButton';
type VideoButtonsProps = {};

const VideoButtons = ({}: VideoButtonsProps) => {
  return (
    <div className="video_buttons_container">
      <MicButton />
      <CamaraButton />
      <LeaveRoomButton />
      <SwitchToScreenSharingButton />
    </div>
  );
};

export default VideoButtons;
