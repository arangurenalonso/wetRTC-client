import { Divider, Grid2, Paper } from '@mui/material';
import useRoomStore from '../../../hooks/useRoomStore';
import TitleSidebar from '../component/TitleSidebar';
import ParticipantList from '../component/ParticipantList';

const ParticipantSection = () => {
  const { isPeopleOpen, touglePeople, participantsOfRoom } = useRoomStore();
  return (
    <Paper
      sx={{
        width: '320px',
        height: '100%',
        display: isPeopleOpen ? 'block' : 'none',
        overflow: 'hidden',
      }}
    >
      <Grid2
        container
        sx={{
          height: '100%',
        }}
        direction="column"
      >
        <Grid2 size="auto">
          <TitleSidebar label={'Participants'} onClose={touglePeople} />
        </Grid2>
        <Divider />
        <Grid2
          size="grow"
          sx={{
            overflow: 'hidden',
          }}
        >
          <ParticipantList participants={participantsOfRoom} />
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default ParticipantSection;
