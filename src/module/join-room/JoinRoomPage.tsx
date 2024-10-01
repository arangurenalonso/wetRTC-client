import { useLocation } from 'react-router-dom';
import './JoinRoomPage.css';
import { useEffect } from 'react';
import useRoomStore from '../../hooks/useRoomStore';
import JoinRoomTitle from './JoinRoomTitle';
import JoinRoomContent from './JoinRoomContent';
const JoinRoomPage = () => {
  const location = useLocation();
  const search = location.search;
  const { onSetIsRoomHostProcess, isRoomHost } = useRoomStore();
  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const isHost = queryParams.get('host');
    if (isHost === 'true') {
      onSetIsRoomHostProcess(true);
    }
    if (isHost === 'false') {
      onSetIsRoomHostProcess(false);
    }
  }, [search]);

  return (
    <div className="join_room_page_container">
      <div className="join_room_page_panel">
        <JoinRoomTitle isRoomHost={isRoomHost} />
        <JoinRoomContent isRoomHost={isRoomHost} />
      </div>
    </div>
  );
};

export default JoinRoomPage;
