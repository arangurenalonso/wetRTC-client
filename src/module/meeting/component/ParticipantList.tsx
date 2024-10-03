import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { UserParticipant } from '../../../store/main/room.initial-state';
import getInitials from '../../../utils/methods/getInitials';

const ParticipantList = () => {
  const participant: UserParticipant[] = [
    {
      id: 'fwefewqfqwe',
      name: 'Pablo Castano Prieto',
      socketId: '123',
      roomId: '123',
    },
    {
      id: 'fwefewqfqwe',
      name: 'Pablo Castano Prieto',
      socketId: '123',
      roomId: '123',
    },
  ];

  return (
    <Box sx={{ height: '100%', p: 2, overflowY: 'auto' }}>
      <List sx={{ width: '100%' }}>
        {participant.map((user) => {
          return (
            <ListItem key={user.id} sx={{ bgcolor: 'background.paper', mb: 2 }}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp">{getInitials(user.name)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default ParticipantList;
