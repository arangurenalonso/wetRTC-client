import { useEffect, useState } from 'react';
import '../RoomPage.css';
import useWebRTC from '../../../context/webRTC/useWebRTC';
type CamaraButtonProps = {};
const CamaraButton = ({}: CamaraButtonProps) => {
  const [isCamaraOff, setIsCamaraOff] = useState(true);

  const { localStream, toggleLocalVideo } = useWebRTC();
  useEffect(() => {
    if (localStream) {
      toggleLocalVideo(isCamaraOff);
    }
  }, [isCamaraOff, localStream]);
  const handleCamaraButtonClick = () => {
    setIsCamaraOff(!isCamaraOff);
  };
  return (
    <div className="video_button_container">
      <img
        src={isCamaraOff ? '/public/cameraOff.svg' : '/public/camera.svg'}
        className="video_button_image"
        onClick={handleCamaraButtonClick}
      />
    </div>
  );
};

export default CamaraButton;
