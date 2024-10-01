import { useState } from 'react';
import '../RoomPage.css';
import LocalScreenSharingPreview from './LocalScreenSharingPreview';
import useWebRTC from '../../../context/webRTC/useWebRTC';

type SwitchToScreenSharingButtonProps = {};

const SwitchToScreenSharingButton = ({}: SwitchToScreenSharingButtonProps) => {
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenSharingStream, setScreenSharingStream] =
    useState<MediaStream | null>(null);
  const { peer, localStream } = useWebRTC();
  const handleScreenSharingButtonClick = async () => {
    if (!isScreenSharing) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });
      } catch (error) {
        console.error('Error accessing screen sharing stream:', error);
      }
      if (stream) {
        setScreenSharingStream(stream);
        setIsScreenSharing(true);
        // Cambiar el stream en la conexión peer existente
        if (localStream) {
          Object.values(peer).forEach((peerInstance) => {
            peerInstance.replaceTrack(
              localStream?.getVideoTracks()[0], // El track de video anterior
              stream.getVideoTracks()[0], // El track de video de la pantalla compartida
              localStream // Stream original
            );
          });
        }
      }
    } else {
      setIsScreenSharing(false);
      screenSharingStream?.getTracks().forEach((track) => track.stop());
      setScreenSharingStream(null);
      if (screenSharingStream && localStream) {
        Object.values(peer).forEach((peerInstance) => {
          peerInstance.replaceTrack(
            screenSharingStream?.getVideoTracks()[0],
            localStream?.getVideoTracks()[0],
            localStream
          );
        });
      }
    }
  };

  return (
    <div className="video_button_container">
      <img
        src={'/public/switchToScreenSharing.svg'}
        className="video_button_image"
        alt="Switch to screen sharing"
        onClick={handleScreenSharingButtonClick}
      />
      {screenSharingStream && (
        <LocalScreenSharingPreview stream={screenSharingStream} />
      )}
    </div>
  );
};

export default SwitchToScreenSharingButton;
