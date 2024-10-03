import {
  Box,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from '@mui/material';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import PersonIcon from '@mui/icons-material/Person';
import MediaToggleOptions from '../views/MediaToggleOptions';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../views/ErrorMessage';
import { useEffect, useState } from 'react';
import useRoomStore from '../../../hooks/useRoomStore';

const JoinMeetingPage = () => {
  const navigate = useNavigate();
  const [nameValue, setNameValue] = useState('');
  const [roomIdValue, setRoomIdValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const {
    onCheckRoomExitProcess,
    onSetIdentityProcess,
    onSetRoomIdProcess,
    onSetIsRoomHostProcess,
  } = useRoomStore();
  useEffect(() => {
    onSetIsRoomHostProcess(false);
  }, []);

  const handleJoinMeeting = () => {
    navigate('/lobby', { replace: true });
  };

  const handleJoinRoom = async () => {
    if (!nameValue) {
      setErrorMessage('Please enter your name');
      return;
    }
    onSetIdentityProcess(nameValue);
    const responseMessage = await onCheckRoomExitProcess(roomIdValue);
    const { roomExist, roomFull } = responseMessage;
    if (!roomExist) {
      setErrorMessage('Room does not exist');
      return;
    }
    if (roomExist && roomFull) {
      setErrorMessage('Room is full');
      return;
    }
    setErrorMessage(undefined);
    onSetRoomIdProcess(roomIdValue);
    navigate(`/meeting`);
  };
  return (
    <Box>
      {/* Title */}
      <Typography
        variant="h6"
        color="textSecondary"
        textAlign="center"
        gutterBottom
      >
        Join Meeting
      </Typography>

      {/* Input for Name with Icon */}
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
        sx={{ mb: 2 }} // Adds space below the field
      />

      {/* Input for Meeting ID with Icon */}
      <TextField
        label="ID of meeting"
        fullWidth
        variant="standard"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <KeyboardIcon />
              </InputAdornment>
            ),
          },
        }}
        value={roomIdValue}
        onChange={(e) => {
          setRoomIdValue(e.target.value);
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
        <Button onClick={handleJoinRoom} variant="contained" color="primary">
          Join
        </Button>
      </Box>
    </Box>
  );
};

export default JoinMeetingPage;
