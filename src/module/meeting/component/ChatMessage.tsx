import { Box, Avatar, Paper, Typography } from '@mui/material';
import getInitials from '../../../utils/methods/getInitials';
type ChatMessageProps = {
  user: {
    name: string;
  };
  time: Date;
  content: string;
  isHostMessage?: boolean;
};

const ChatMessage = ({
  user,
  time,
  content,
  isHostMessage,
}: ChatMessageProps) => {
  return (
    <Box
      mb={2}
      sx={{
        pr: isHostMessage ? 0 : 3,
        ml: isHostMessage ? 0 : 1,
        pl: isHostMessage ? 3 : 0,
        mr: isHostMessage ? 1 : 0,
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography
          variant="caption"
          color={isHostMessage ? 'primary' : 'warning'}
          fontWeight="bold"
        >
          {user.name}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {new Date(time).toLocaleTimeString()}
        </Typography>
      </Box>
      <Paper
        sx={{
          py: 1,

          pr: isHostMessage ? 2 : 1,
          pl: isHostMessage ? 1 : 2,
          flexGrow: 1,
          position: 'relative',
        }}
      >
        <Avatar
          sx={{
            width: 24,
            height: 24,
            bgcolor: '#5A67D8',
            fontSize: '0.75rem',
            position: 'absolute',
            top: 0,
            left: !isHostMessage ? 0 : 'auto',
            right: isHostMessage ? 0 : 'auto',
            transform: isHostMessage ? 'translateX(50%)' : 'translateX(-50%) ',
          }}
        >
          {getInitials(user.name)}
        </Avatar>
        <Typography variant="body2">{content}</Typography>
      </Paper>
    </Box>
  );
};

export default ChatMessage;
