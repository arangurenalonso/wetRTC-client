import { useState } from 'react';
import './JoinRoomPage.css';
import JoinRoomInputs from './JoinRoomInputs';
import OnlyWithAudioCheckbox from './OnlyWithAudioCheckbox';
import ErrorMessage from './ErrorMessage';
import JoinRoomButtons from './JoinRoomButtons';
import useRoomStore from '../../hooks/useRoomStore';
import { useNavigate } from 'react-router-dom';
type JoinRoomContentProps = {
  isRoomHost: boolean;
};

const JoinRoomContent = ({ isRoomHost }: JoinRoomContentProps) => {
  const navigate = useNavigate();
  const [roomIdValue, setRoomIdValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const { onCheckRoomExitProcess, onSetIdentityProcess, onSetRoomIdProcess } =
    useRoomStore();

  const handleJoinRoom = async () => {
    onSetIdentityProcess(nameValue);
    if (isRoomHost) {
      await createRoom();
    } else {
      setErrorMessage(undefined);
      await joinRoom();
    }
  };
  const joinRoom = async () => {
    const responseMessage = await onCheckRoomExitProcess(roomIdValue);
    const { roomExist, roomFull } = responseMessage;
    if (!roomExist) {
      setErrorMessage('Room does not exist');
      return;
    }
    if (roomExist && roomFull) {
      setErrorMessage('Room is full');
      return;
    }
    setErrorMessage(undefined);
    onSetRoomIdProcess(roomIdValue);
    navigate(`/room`);
  };
  const createRoom = () => {
    navigate(`/room`);
  };

  return (
    <>
      <JoinRoomInputs
        roomIdValue={roomIdValue}
        setRoomIdValue={setRoomIdValue}
        nameValue={nameValue}
        setNameValue={setNameValue}
        isRoomHost={isRoomHost}
      />
      <OnlyWithAudioCheckbox />
      <ErrorMessage errorMessage={errorMessage} />
      <JoinRoomButtons
        handleJoinRoom={handleJoinRoom}
        isRoomHost={isRoomHost}
      />
    </>
  );
};

export default JoinRoomContent;
