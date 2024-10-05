export type UserParticipant = {
  id: string;
  name: string;
  socketId: string;
  roomId: string;
};
export type MessageType = {
  id: string;
  user: UserParticipant;
  message: string;
  time: Date;
};
export type RoomState = {
  identity?: string;
  isRoomHost: boolean;
  connectOnlyWithAudio: boolean;
  roomId?: string;
  participantsOfRoom: UserParticipant[];
  messages: MessageType[];
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
  messages: [],
  isChatOpen: false,
  isPeopleOpen: false,
  isCamarasOn: true,
  isMicroOn: true,
  isShareOn: false,
};
