import { Switch, FormControlLabel, Box, Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import useRoomStore from '../../../hooks/useRoomStore';

const MediaToggleOptions = () => {
  const { isCamarasOn, isMicroOn, tougleCam, tougleMic } = useRoomStore();
  return (
    <Box display="flex" alignItems="center">
      <FormControlLabel
        onClick={tougleMic}
        control={<Switch checked={isMicroOn} name="mic" />}
        label={
          <Box display="flex" alignItems="center">
            <MicIcon sx={{ marginRight: 1 }} />
            <Typography>Mic</Typography>
          </Box>
        }
      />
      <FormControlLabel
        onClick={tougleCam}
        control={<Switch checked={isCamarasOn} name="video" />}
        label={
          <Box display="flex" alignItems="center">
            <VideocamIcon sx={{ marginRight: 1 }} />
          </Box>
        }
      />
    </Box>
  );
};

export default MediaToggleOptions;
