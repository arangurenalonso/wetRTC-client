import { Box } from '@mui/material';
import ChatMessage from './ChatMessage';
import { MessageType } from '../../../store/main/room.initial-state';
type ChatMessageListProps = {
  messages: MessageType[];
  socketIdHost?: string;
};

const ChatMessageList = ({ messages, socketIdHost }: ChatMessageListProps) => {
  return (
    <Box sx={{ height: '100%', px: 2, overflowY: 'auto' }}>
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          user={message.user}
          time={message.time}
          content={message.message}
          isHostMessage={message.user.socketId == socketIdHost}
        />
      ))}
    </Box>
  );
};

export default ChatMessageList;
