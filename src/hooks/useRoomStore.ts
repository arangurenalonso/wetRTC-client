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
} from '../store/main/room.slice';
import { serverApi } from '../api/server';
import { UserParticipant } from '../store/main/room.initial-state';

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
  };
};
export default useRoomStore;
