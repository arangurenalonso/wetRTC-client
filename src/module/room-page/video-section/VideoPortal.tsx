import { useRef, useEffect } from 'react';
import './VideoPortal.css';
import useWebRTC from '../../../context/webRTC/useWebRTC';
import useRoomStore from '../../../hooks/useRoomStore';
type VideoPortalProps = {};
const VideoPortal = ({}: VideoPortalProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { streams, localStream } = useWebRTC();
  const { participantsOfRoom } = useRoomStore();
  useEffect(() => {
    if (videoRef.current && localStream) {
      // Asignar el stream al elemento de video
      videoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  return (
    <div className=" videos_portal_styles">
      <div>
        <video
          ref={videoRef}
          autoPlay
          muted
          style={{
            width: '200px',
            height: '200px',
          }}
        />
      </div>
      {Object.entries(streams).map(([socketId, stream]) => {
        return (
          <div
            style={{
              width: '200px',
              backgroundColor: 'red',
            }}
            key={socketId}
          >
            <video
              style={{
                width: '200px',
                height: '200px',
              }}
              autoPlay
              ref={(el) => {
                if (el) {
                  el.srcObject = stream;
                }
              }}
            />
            <p>
              {participantsOfRoom.find((x) => x.socketId == socketId)?.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default VideoPortal;
