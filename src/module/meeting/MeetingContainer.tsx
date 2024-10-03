import { useEffect } from 'react';
import useWebRTC from '../../context/webRTC/useWebRTC';
import MeetingLayout from './layout/MeetingLayout';
import ChatSection from './views/ChatSection';
import MeetingToolbar from './views/MeetingToolbar';
import ParticipantSection from './views/ParticipantSection';
import VideoGrid from './views/VideoSection';
import useRoomStore from '../../hooks/useRoomStore';
import useParticipantsWSS from '../../context/wss/useParticipantsWSS';
import useStreammingWSS from '../../context/wss/useStreammingWSS';

const MeetingContainer = () => {
  useParticipantsWSS();
  useStreammingWSS();
  const { roomId, identity, isRoomHost } = useRoomStore();
  const { initializeRoom, getLocalPreviewAndInitRoomConnection } = useWebRTC();

  useEffect(() => {
    initializeRoom();
    getLocalPreviewAndInitRoomConnection(isRoomHost, identity, roomId);
  }, []);

  return (
    <MeetingLayout
      toolbar={<MeetingToolbar />}
      sideBar={
        <>
          <ChatSection />
          <ParticipantSection />
        </>
      }
    >
      <VideoGrid />
    </MeetingLayout>
  );
};

export default MeetingContainer;
