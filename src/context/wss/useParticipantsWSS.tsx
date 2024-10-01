import { useContext, useEffect } from 'react';
import { SocketContext } from './socketContext';
import useRoomStore from '../../hooks/useRoomStore';
import { UserParticipant } from '../../store/main/room.initial-state';

const useParticipantsWSS = () => {
  const { socket } = useContext(SocketContext);
  const { onSetRoomIdProcess, onSetParticipantsProcess } = useRoomStore();

  // Definir los handlers fuera del useEffect
  const handleListenerRoomJoin = (data: { roomId: string }) => {
    const { roomId } = data;

    onSetRoomIdProcess(roomId);
  };

  const handleListenerRoomParticipants = (data: {
    participants: UserParticipant[];
  }) => {
    const { participants } = data;
    onSetParticipantsProcess(participants);
  };

  useEffect(() => {
    if (!socket) return;
    if (socket.listeners('room/join').length == 0) {
      socket.on('room/join', handleListenerRoomJoin);
    }
    if (socket.listeners('room/participants').length == 0) {
      socket.on('room/participants', handleListenerRoomParticipants);
    }

    return () => {
      /**
       * Con callback: Si proporcionas la misma función de callback que usaste en socket.on, se eliminará ese listener específico.
       * Example: socket.off('room/join', handleRoomId);
       */
      /**
       * Sin callback: Si llamas a socket.off solo con el nombre del evento, se eliminarán todos los listeners asociados a ese evento.
       */
      socket.off('room/join');
      socket.off('room/participants');
    };
  }, [socket]);

  return {};
};
export default useParticipantsWSS;
