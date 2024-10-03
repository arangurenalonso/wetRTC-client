import { useEffect } from 'react';
import useRoomStore from '../../hooks/useRoomStore';
import ChatSection from './chat-section/ChatSection';
import ParticipantsSection from './participant-section/ParticipantsSection';
import RoomLabel from './RoomLabel';
import './RoomPage.css';
import VideoSection from './video-section/VideoSection';
import Overlay from './Overlay';
import useWebRTC from '../../context/webRTC/useWebRTC';
import useParticipantsWSS from '../../context/wss/useParticipantsWSS';
import useStreammingWSS from '../../context/wss/useStreammingWSS';

type RoomPageProps = {};

const RoomPage = ({}: RoomPageProps) => {
  useParticipantsWSS();
  useStreammingWSS();
  const { roomId, identity, isRoomHost } = useRoomStore();

  const { initializeRoom, getLocalPreviewAndInitRoomConnection, loading } =
    useWebRTC();

  useEffect(() => {
    initializeRoom();
  }, []);

  useEffect(() => {
    getLocalPreviewAndInitRoomConnection(isRoomHost, identity, roomId);
  }, []);

  return (
    <div className="room_container">
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
      <RoomLabel roomId={roomId} />
      {loading && <Overlay />}
    </div>
  );
};

export default RoomPage;
