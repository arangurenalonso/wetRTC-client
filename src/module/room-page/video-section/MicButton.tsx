import { useEffect, useState } from 'react';
import '../RoomPage.css';
import useWebRTC from '../../../context/webRTC/useWebRTC';
type MicButtonProps = {};
const MicButton = ({}: MicButtonProps) => {
  const [isMicMuted, setIsMicMuted] = useState(true);

  const { localStream, toggleLocalAudio } = useWebRTC();
  useEffect(() => {
    if (localStream) {
      toggleLocalAudio(isMicMuted);
    }
  }, [isMicMuted, localStream]);
  const handleMicButtonClick = () => {
    setIsMicMuted(!isMicMuted);
  };
  return (
    <div className="video_button_container">
      <img
        src={isMicMuted ? '/public/micOff.svg' : '/public/mic.svg'}
        className="video_button_image"
        onClick={handleMicButtonClick}
      />
    </div>
  );
};

export default MicButton;
