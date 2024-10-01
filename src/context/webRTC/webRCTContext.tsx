import { createContext } from 'react';
import { PeersMap, StreamMap } from './webRCTProvider';
import { SignalData } from 'simple-peer';

// Definir los tipos del contexto
interface WebRCTContextProps {
  peer: PeersMap;
  streams: StreamMap;
  localStream: MediaStream | null;
  loading: boolean;
  isRoomInitiator: boolean;
  createPeerConnection: (
    connectedUsersSocketId: string,
    isInitiator: boolean
  ) => void;
  removePeerConnection: (connectedUsersSocketId: string) => void;
  initializeRoom: () => void;
  signalingData: (data: { signal: SignalData; peerSocketId: string }) => void;
}

// Crear el contexto y asignar un valor inicial
export const WebRCTContext = createContext<WebRCTContextProps>({
  peer: {},
  streams: {},
  localStream: null,
  loading: false,
  isRoomInitiator: false,
  removePeerConnection: () => {},
  createPeerConnection: () => {},
  signalingData: () => {},
  initializeRoom: () => {},
});
