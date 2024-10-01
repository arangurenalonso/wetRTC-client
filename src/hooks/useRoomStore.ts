import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import {
  setConnectOnlyWithAudio,
  setIdentity,
  setIsRoomHost,
  setParticipantsOfRoom,
  setRoomId,
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
  return {
    //*Properties
    identity,
    isRoomHost,
    connectOnlyWithAudio,
    roomId,
    participantsOfRoom,
    //*Methods
    onSetIsRoomHostProcess,
    ontSetConnectOnlyWithAudioProcess,
    onCheckRoomExitProcess,
    onSetIdentityProcess,
    onSetRoomIdProcess,
    onSetParticipantsProcess,
  };
};
export default useRoomStore;
