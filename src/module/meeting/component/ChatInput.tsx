import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import useEmitSocket from '../../../context/wss/useEmitSocket';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const { handleNewMessage } = useEmitSocket();
  const handleSendMessage = () => {
    const messageTrim = message.trim();
    if (messageTrim.length > 0) {
      // Lógica para enviar el mensaje
      handleNewMessage(messageTrim);
      setMessage(''); // Limpiar el campo de texto
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1,
        px: 2,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="write a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <IconButton color="primary" onClick={handleSendMessage}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatInput;
