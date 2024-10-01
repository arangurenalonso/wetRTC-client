import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { roomInitialState, UserParticipant } from './room.initial-state';

export const roomSlice = createSlice({
  name: 'room',
  initialState: roomInitialState,
  reducers: {
    setIsRoomHost: (state, action: PayloadAction<boolean>) => {
      state.isRoomHost = action.payload;
    },
    setConnectOnlyWithAudio: (state, action: PayloadAction<boolean>) => {
      state.connectOnlyWithAudio = action.payload;
    },
    setRoomId: (state, action: PayloadAction<string | undefined>) => {
      state.roomId = action.payload;
    },
    setIdentity: (state, action: PayloadAction<string | undefined>) => {
      state.identity = action.payload;
    },
    setParticipantsOfRoom: (
      state,
      action: PayloadAction<UserParticipant[]>
    ) => {
      state.participantsOfRoom = action.payload;
      // const index = state.participantsOfRoom?.findIndex(
      //   (room) => room.roomId === action.payload.roomId
      // );
      // if (index !== undefined && index !== -1) {
      //   state.participantsOfRoom![index] = action.payload;
      // } else {
      //   state.participantsOfRoom = [
      //     ...(state.participantsOfRoom || []),
      //     action.payload,
      //   ];
      // }
    },
  },
});

export const {
  setIsRoomHost,
  setConnectOnlyWithAudio,
  setRoomId,
  setIdentity,
  setParticipantsOfRoom,
} = roomSlice.actions;
