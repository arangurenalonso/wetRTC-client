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
  isChatOpen: boolean;
  isPeopleOpen: boolean;
  isCamarasOn: boolean;
  isMicroOn: boolean;
  isShareOn: boolean;
};

export const roomInitialState: RoomState = {
  identity: undefined,
  isRoomHost: false,
  connectOnlyWithAudio: false,
  roomId: undefined,
  participantsOfRoom: [],
  isChatOpen: false,
  isPeopleOpen: false,
  isCamarasOn: true,
  isMicroOn: true,
  isShareOn: false,
};
