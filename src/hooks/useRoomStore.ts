import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import {
  setCam,
  setChat,
  setConnectOnlyWithAudio,
  setIdentity,
  setIsRoomHost,
  setMic,
  setParticipantsOfRoom,
  setPeople,
  setRoomId,
  setShare,
  setMessages,
  setMessage,
} from '../store/main/room.slice';
import { serverApi } from '../api/server';
import { MessageType, UserParticipant } from '../store/main/room.initial-state';

const useRoomStore = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    identity,
    isRoomHost,
    connectOnlyWithAudio,
    roomId,
    participantsOfRoom,
    isChatOpen,
    isPeopleOpen,
    isCamarasOn,
    isMicroOn,
    isShareOn,
    messages,
  } = useSelector((state: RootState) => state.room);

  const onSetIsRoomHostProcess = async (isHostedRoom: boolean) => {
    dispatch(setIsRoomHost(isHostedRoom));
  };
  const ontSetConnectOnlyWithAudioProcess = async (
    connectOnlyWithAudio: boolean
  ) => {
    dispatch(setConnectOnlyWithAudio(connectOnlyWithAudio));
  };
  const onCheckRoomExitProcess = async (roomId: string) => {
    const response = await serverApi.checkRoom(roomId);
    return response;
  };
  const onSetIdentityProcess = async (identity: string) => {
    dispatch(setIdentity(identity));
  };
  const onSetRoomIdProcess = async (roomId: string) => {
    dispatch(setRoomId(roomId));
  };
  const onSetParticipantsProcess = async (participants: UserParticipant[]) => {
    dispatch(setParticipantsOfRoom(participants));
  };
  const tougleChat = () => {
    dispatch(setChat(!isChatOpen));
  };
  const touglePeople = () => {
    dispatch(setPeople(!isPeopleOpen));
  };
  const tougleCam = () => {
    dispatch(setCam(!isCamarasOn));
  };
  const tougleMic = () => {
    dispatch(setMic(!isMicroOn));
  };
  const tougleShare = () => {
    dispatch(setShare(!isShareOn));
  };
  const onSetMessagesProcess = async (messages: MessageType[]) => {
    dispatch(setMessages(messages));
  };
  const onSetNewMessageProcess = async (message: MessageType) => {
    dispatch(setMessage(message));
  };
  return {
    //*Properties
    identity,
    isRoomHost,
    connectOnlyWithAudio,
    roomId,
    participantsOfRoom,
    isChatOpen,
    isPeopleOpen,
    isCamarasOn,
    isMicroOn,
    isShareOn,
    messages,
    //*Methods
    onSetIsRoomHostProcess,
    ontSetConnectOnlyWithAudioProcess,
    onCheckRoomExitProcess,
    onSetIdentityProcess,
    onSetRoomIdProcess,
    onSetParticipantsProcess,
    tougleChat,
    touglePeople,
    tougleCam,
    tougleMic,
    tougleShare,
    onSetMessagesProcess,
    onSetNewMessageProcess,
  };
};
export default useRoomStore;
