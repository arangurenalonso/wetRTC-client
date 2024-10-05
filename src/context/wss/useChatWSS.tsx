import { useContext, useEffect } from 'react';
import { SocketContext } from './socketContext';
import useRoomStore from '../../hooks/useRoomStore';
import { MessageType } from '../../store/main/room.initial-state';

const useChatWSS = () => {
  const { socket } = useContext(SocketContext);
  const { onSetMessagesProcess, onSetNewMessageProcess } = useRoomStore();

  // Definir los handlers fuera del useEffect
  const handleNewMessage = (data: { message: MessageType }) => {
    const { message } = data;
    onSetNewMessageProcess(message);
  };

  const handleMessages = (data: { messages: MessageType[] }) => {
    const { messages } = data;
    onSetMessagesProcess(messages);
  };

  useEffect(() => {
    if (!socket) return;
    if (socket.listeners('chat/messages').length == 0) {
      socket.on('chat/messages', handleMessages);
    }
    if (socket.listeners('chat/new-message').length == 0) {
      socket.on('chat/new-message', handleNewMessage);
    }

    return () => {
      socket.off('chat/messages');
      socket.off('chat/new-message');
    };
  }, [socket]);

  return {};
};
export default useChatWSS;
