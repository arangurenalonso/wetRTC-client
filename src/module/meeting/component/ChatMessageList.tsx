import { Box } from '@mui/material';
import ChatMessage from './ChatMessage';

const ChatMessageList = () => {
  const messages = [
    {
      id: 'fffaawqe',
      user: { name: 'Pablo Castano Prieto', initials: 'PP' },
      time: '17:25',
      content:
        'The database, identified as “vip-v3,” was found to be publicly accessible due to a misconfiguration...',
    },
    {
      id: 'SSddSS',
      user: { name: 'Andres Wladimir Garcia Cuvi', initials: 'AC' },
      time: '17:25',
      content:
        'UMC is still investigating the incident and has not provided details about whether a ransom was paid.',
      isHostMessage: true,
    },
    {
      id: 'fffffwqe',
      user: { name: 'Pablo Castano Prieto', initials: 'PP' },
      time: '17:25',
      content:
        'The database, identified as “vip-v3,” was found to be publicly accessible due to a misconfiguration...',
    },
    {
      id: 'SggSSS',
      user: { name: 'Andres Wladimir Garcia Cuvi', initials: 'AC' },
      time: '17:25',
      content:
        'UMC is still investigating the incident and has not provided details about whether a ransom was paid.',
      isHostMessage: true,
    },
    {
      id: 'fcscdffwqe',
      user: { name: 'Pablo Castano Prieto', initials: 'PP' },
      time: '17:25',
      content:
        'The database, identified as “vip-v3,” was found to be publicly accessible due to a misconfiguration...',
    },
    {
      id: 'SSSqqS',
      user: { name: 'Andres Wladimir Garcia Cuvi', initials: 'AC' },
      time: '17:25',
      content:
        'UMC is still investigating the incident and has not provided details about whether a ransom was paid.',
      isHostMessage: true,
    },
    {
      id: 'fffwrewrqwee',
      user: { name: 'Pablo Castano Prieto', initials: 'PP' },
      time: '17:25',
      content:
        'The database, identified as “vip-v3,” was found to be publicly accessible due to a misconfiguration...',
    },
    {
      id: 'SSSfwefweS',
      user: { name: 'Andres Wladimir Garcia Cuvi', initials: 'AC' },
      time: '17:25',
      content:
        'UMC is still investigating the incident and has not provided details about whether a ransom was paid.',
      isHostMessage: true,
    },
    {
      id: 'fffwaaaddwqe',
      user: { name: 'Pablo Castano Prieto', initials: 'PP' },
      time: '17:25',
      content:
        'The database, identified as “vip-v3,” was found to be publicly accessible due to a misconfiguration...',
    },
    {
      id: 'zzzSSSS',
      user: { name: 'Andres Wladimir Garcia Cuvi', initials: 'AC' },
      time: '17:25',
      content:
        'UMC is still investigating the incident and has not provided details about whether a ransom was paid.',
      isHostMessage: true,
    },
    {
      id: 'fffwuuuqe',
      user: { name: 'Pablo Castano Prieto', initials: 'PP' },
      time: '17:25',
      content:
        'The database, identified as “vip-v3,” was found to be publicly accessible due to a misconfiguration...',
    },
    {
      id: 'SShrehtSS',
      user: { name: 'Andres Wladimir Garcia Cuvi', initials: 'AC' },
      time: '17:25',
      content:
        'UMC is still investigating the incident and has not provided details about whether a ransom was paid.',
      isHostMessage: true,
    },
    {
      id: 'ffjtyjrfwqe',
      user: { name: 'Pablo Castano Prieto' },
      time: '17:25',
      content:
        'The database, identified as “vip-v3,” was found to be publicly accessible due to a misconfiguration...',
    },
    {
      id: 'SSjtyrjtyrfeSS',
      user: { name: 'Andres Wladimir Garcia Cuvi' },
      time: '17:25',
      content:
        'UMC is still investigating the incident and has not provided details about whether a ransom was paid.',
      isHostMessage: true,
    },
  ];

  return (
    <Box sx={{ height: '100%', px: 2, overflowY: 'auto' }}>
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          user={message.user}
          time={message.time}
          content={message.content}
          isHostMessage={message.isHostMessage}
        />
      ))}
    </Box>
  );
};

export default ChatMessageList;
