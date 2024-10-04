import { Box, useTheme } from '@mui/material';
import { StreamMap } from '../../../context/webRTC/webRCTProvider';
import { UserParticipant } from '../../../store/main/room.initial-state';
import VideoComponent from './VideoComponent';
import { useEffect, useState } from 'react';
import VideoItemThumbGalleryContainer from './VideoItemThumbGalleryContainer';

type VideoThumbGalleryProps = {
  direction: 'row' | 'column';
  screenSharingStream?: MediaStream | null;
  streams: StreamMap;
  participantsOfRoom: UserParticipant[];
  onStream: (stream?: MediaStream) => void;
};

const VideoThumbGallery = ({
  streams,
  participantsOfRoom,
  direction,
  onStream,
  screenSharingStream,
}: VideoThumbGalleryProps) => {
  const [socketIdSelected, setSocketIdSelected] = useState<string | null>();

  useEffect(() => {
    if (socketIdSelected) {
      const stream = streams[socketIdSelected];
      if (stream) {
        onStream(stream.instance);
      }
    }
  }, [socketIdSelected]);
  useEffect(() => {
    if (!socketIdSelected) {
      const socketId = Object.keys(streams)[0];
      setSocketIdSelected(socketId);
    }
  }, [streams]);

  const theme = useTheme();
  return (
    <Box
      sx={
        direction === 'column'
          ? {
              width: '240px',
              height: '100%',
              overflow: 'hidden',
            }
          : direction === 'row'
          ? {
              width: '100%',
              height: '135px',
              overflow: 'hidden',
            }
          : {}
      }
    >
      <Box
        sx={{
          ...(direction === 'column'
            ? {
                height: '100%',
                overflowY: 'auto',
              }
            : direction === 'row'
            ? {
                width: '100%',
                height: '100%',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                lineHeight: 0,

                /* Estilos personalizados para el scrollbar */
                '&::-webkit-scrollbar': {
                  height: '6px', // Grosor del scroll en x
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: theme.palette.primary.main, // Color primario para el thumb
                  borderRadius: '10px', // Bordes redondeados
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: theme.palette.background.default, // Color de fondo del track
                },
              }
            : {}),
        }}
      >
        {screenSharingStream && (
          <VideoItemThumbGalleryContainer
            direction={direction}
            onClick={() => {}}
          >
            <VideoComponent stream={screenSharingStream} mutedVideo={true} />
          </VideoItemThumbGalleryContainer>
        )}
        {Object.entries(streams).map(([socketId, stream]) => {
          return (
            <VideoItemThumbGalleryContainer
              key={socketId}
              direction={direction}
              onClick={() => setSocketIdSelected(socketId)}
            >
              <VideoComponent
                stream={stream.instance}
                mutedVideo={stream.isHost}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  left: 0,
                  zIndex: 1000,
                  backgroundColor: 'rgba(0, 0, 0, 0.75)',
                  // transform: 'translateY(-25%)',
                  width: '100%',
                  px: 1,
                  py: 0.5,
                }}
              >
                <span
                  style={{
                    color: '#FFF',
                    lineHeight: 0,
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {participantsOfRoom.find((x) => x.socketId == socketId)?.name}
                </span>
              </Box>
            </VideoItemThumbGalleryContainer>
          );
        })}
      </Box>
    </Box>
  );
};

export default VideoThumbGallery;
