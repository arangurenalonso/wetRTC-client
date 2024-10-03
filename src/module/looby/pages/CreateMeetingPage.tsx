import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import MediaToggleOptions from '../views/MediaToggleOptions';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../views/ErrorMessage';
import { useEffect, useState } from 'react';
import useRoomStore from '../../../hooks/useRoomStore';
const CreateMeetingPage = () => {
  const navigate = useNavigate();

  const handleJoinMeeting = () => {
    navigate('/lobby', { replace: true });
  };
  const [nameValue, setNameValue] = useState('');
  const { onSetIsRoomHostProcess, onSetIdentityProcess } = useRoomStore();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  useEffect(() => {
    onSetIsRoomHostProcess(true);
  }, []);

  const handleCreateRoom = () => {
    if (!nameValue) {
      setErrorMessage('Please enter your name');
      return;
    }
    onSetIdentityProcess(nameValue);
    navigate(`/meeting`);
  };

  return (
    <Box>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Host Meeting
      </Typography>
      <TextField
        label="Enter your name"
        fullWidth
        variant="standard"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          },
        }}
        value={nameValue}
        onChange={(e) => {
          setNameValue(e.target.value);
          setErrorMessage(undefined);
        }}
        sx={{ mb: 4 }} // Adds space below the field
      />

      <MediaToggleOptions />
      <ErrorMessage errorMessage={errorMessage} />
      <Box display="flex" justifyContent="end" gap={1.5}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleJoinMeeting}
        >
          Cancel
        </Button>
        <Button onClick={handleCreateRoom} variant="contained" color="primary">
          Join
        </Button>
      </Box>
    </Box>
  );
};

export default CreateMeetingPage;
