import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VideoCallIcon from '@mui/icons-material/VideoCall';
const LobbyHomePage = () => {
  const navigate = useNavigate();
  const handleCreateMeeting = () => {
    navigate('new-meeting');
  };

  const handleJoinMeeting = () => {
    navigate('join-meeting');
  };
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Video calls and meetings for everyone
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button variant="contained" onClick={handleJoinMeeting}>
          Join Meeting
        </Button>
        <Button
          variant="outlined"
          startIcon={<VideoCallIcon />}
          onClick={handleCreateMeeting}
        >
          New meeting
        </Button>
      </Box>
    </Box>
  );
};

export default LobbyHomePage;
