import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CallEndIcon from '@mui/icons-material/CallEnd';
import HoverIconButton from '../component/HoverIconButton';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import VerticalDivider from '../component/VerticalDivider';
import Contometer from '../component/Contometer';
import ThemeSwitcher from '../../../theme/ThemeSwitcher';
import { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useRoomStore from '../../../hooks/useRoomStore';
import MenuItemHover from '../component/MenuItemHover';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import useWebRTC from '../../../context/webRTC/useWebRTC';
const MeetingToolbar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [openDialog, setOpenDialog] = useState(false);

  const {
    isChatOpen,
    isPeopleOpen,
    isCamarasOn,
    isMicroOn,
    isShareOn,
    tougleChat,
    touglePeople,
    tougleCam,
    tougleMic,
    tougleShare,
    roomId,
  } = useRoomStore();
  const { localStream, toggleLocalVideo, toggleLocalAudio, handleShareScreen } =
    useWebRTC();
  useEffect(() => {
    handleShareScreen(isShareOn);
  }, [isShareOn]);

  useEffect(() => {
    if (localStream) {
      toggleLocalVideo(!isCamarasOn);
    }
  }, [isCamarasOn, localStream]);

  useEffect(() => {
    if (localStream) {
      toggleLocalAudio(!isMicroOn);
    }
  }, [isMicroOn, localStream]);

  useEffect(() => {
    if (roomId) {
      setOpenDialog(true);
    }
  }, [roomId]);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleCopyRoomId = () => {
    navigator.clipboard
      .writeText(roomId || '')
      .then(() => {
        console.log('Room ID copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy room ID: ', err);
      });
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Contometer />

        {roomId && (
          <IconButton onClick={handleOpenDialog}>
            <VpnKeyIcon />
          </IconButton>
        )}
      </Box>
      <Box sx={{ display: 'flex' }}>
        <>
          {!isSmallScreen ? (
            <>
              <ThemeSwitcher />
              <HoverIconButton
                icon={<ChatIcon />}
                label="Chat"
                isActive={isChatOpen}
                onClick={tougleChat}
              />
              <HoverIconButton
                icon={<PeopleIcon />}
                label="People"
                isActive={isPeopleOpen}
                onClick={touglePeople}
              />
              <VerticalDivider />
              <HoverIconButton
                icon={isCamarasOn ? <VideocamIcon /> : <VideocamOffIcon />}
                label="Camara"
                isActive={isCamarasOn}
                onClick={tougleCam}
              />
              <HoverIconButton
                icon={isMicroOn ? <MicIcon /> : <MicOffIcon />}
                label="Mic"
                isActive={isMicroOn}
                onClick={tougleMic}
              />
              <HoverIconButton
                icon={isShareOn ? <ScreenShareIcon /> : <StopScreenShareIcon />}
                label="Share"
                isActive={isShareOn}
                onClick={tougleShare}
              />
            </>
          ) : (
            <Box>
              <IconButton onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                keepMounted
              >
                <MenuItemHover
                  icon={<ChatIcon sx={{ mr: 1 }} />}
                  label="Chat"
                  isActive={isChatOpen}
                  onClick={tougleChat}
                />
                <MenuItemHover
                  icon={<PeopleIcon sx={{ mr: 1 }} />}
                  label="People"
                  isActive={isPeopleOpen}
                  onClick={touglePeople}
                />
                <MenuItemHover
                  icon={
                    isCamarasOn ? (
                      <VideocamIcon sx={{ mr: 1 }} />
                    ) : (
                      <VideocamOffIcon sx={{ mr: 1 }} />
                    )
                  }
                  label="Camara"
                  isActive={isCamarasOn}
                  onClick={tougleCam}
                />
                <MenuItemHover
                  icon={
                    isMicroOn ? (
                      <MicIcon sx={{ mr: 1 }} />
                    ) : (
                      <MicOffIcon sx={{ mr: 1 }} />
                    )
                  }
                  label="Mic"
                  isActive={isMicroOn}
                  onClick={tougleMic}
                />
                <MenuItemHover
                  icon={
                    isShareOn ? (
                      <ScreenShareIcon sx={{ mr: 1 }} />
                    ) : (
                      <StopScreenShareIcon sx={{ mr: 1 }} />
                    )
                  }
                  label="Share"
                  isActive={isShareOn}
                  onClick={tougleShare}
                />
              </Menu>
            </Box>
          )}
        </>
        <Button variant="contained" color="error" startIcon={<CallEndIcon />}>
          Leave
        </Button>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Code of the reunión</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Typography>{roomId}</Typography>
            <IconButton onClick={handleCopyRoomId}>
              <ContentCopyIcon />
            </IconButton>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MeetingToolbar;
