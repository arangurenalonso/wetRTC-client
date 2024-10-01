export type UserParticipant = {
  id: string;
  name: string;
  socketId: string;
  roomId: string;
};
export type RoomState = {
  identity?: string;
  isRoomHost: boolean;
  connectOnlyWithAudio: boolean;
  roomId?: string;
  participantsOfRoom: UserParticipant[];
};

export const roomInitialState: RoomState = {
  identity: undefined,
  isRoomHost: false,
  connectOnlyWithAudio: false,
  roomId: undefined,
  participantsOfRoom: [],
};
