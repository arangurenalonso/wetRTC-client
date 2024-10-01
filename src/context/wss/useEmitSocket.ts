import { useContext } from 'react';
import { SocketContext } from '../wss/socketContext';
import { SignalData } from 'simple-peer';

const useEmitSocket = () => {
  const { socket } = useContext(SocketContext);

  const createNewRoom = (userName: string) => {
    const data = { userName };
    console.log('socket', socket);
    try {
      socket?.emit('room/create', data);
    } catch {
      console.log('error');
    }
  };

  const joinRoom = (roomId: string, participantName: string) => {
    const data = { roomId, participantName };
    socket?.emit('room/join', data);
  };

  const signalPeerData = (data: {
    signal: SignalData;
    peerSocketId: string;
  }) => {
    socket?.emit('webRTC/signal-exchange', data);
  };
  return {
    socket,
    createNewRoom,
    joinRoom,
    signalPeerData,
  };
};
export default useEmitSocket;
