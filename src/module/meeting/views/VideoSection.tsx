import { Box, Grid2, useMediaQuery, useTheme } from '@mui/material';
import VideoThumbGallery from '../component/VideoThumbGallery';
import useWebRTC from '../../../context/webRTC/useWebRTC';
import useRoomStore from '../../../hooks/useRoomStore';
import VideoComponent from '../component/VideoComponent';
import { useState } from 'react';

const VideoGrid = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { streams, localStream, socketIdHost, screenSharingStream } =
    useWebRTC();
  const { participantsOfRoom } = useRoomStore();
  const [stream, setStream] = useState<MediaStream | null>(null);
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Grid2
        container
        sx={{
          height: '100%',
        }}
        spacing={1}
        direction={isSmallScreen ? 'column' : 'row'}
      >
        <Grid2
          size={'grow'}
          sx={{
            overflow: 'hidden',
            height: '100%',
            ...(isSmallScreen ? { height: '100%' } : {}),
          }}
        >
          <Box sx={{ height: '100%', width: '100%' }}>
            {stream && <VideoComponent stream={stream} mutedVideo={true} />}
          </Box>
        </Grid2>
        <Grid2
          size={'auto'}
          sx={{
            overflow: 'hidden',
            ...(isSmallScreen ? { width: '100%' } : { height: '100%' }),
          }}
        >
          <VideoThumbGallery
            screenSharingStream={screenSharingStream}
            onStream={(stream) => stream && setStream(stream)}
            streams={{
              ...streams,
              ...(socketIdHost && localStream
                ? {
                    [socketIdHost]: {
                      instance: localStream,
                      isHost: true,
                    },
                  }
                : {}),
            }}
            participantsOfRoom={participantsOfRoom}
            direction={isSmallScreen ? 'row' : 'column'}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};
export default VideoGrid;
/**
const VideoGrid = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const videos = [
    { src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    // { src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    // { src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    // { src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    // { src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    // { src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    // { src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    // { src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    // { src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    // { src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    // { src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    // { src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  ];

  const getGridItemSizes = () => {
    if (videos.length === 1) {
      return { xs: 12 };
    } else if (videos.length <= 4) {
      return { xs: 12, md: 6 };
    } else if (videos.length <= 7) {
      return { xs: 12, sm: 6, md: 4 };
    } else {
      return { xs: 12, sm: 6, md: 3 };
    }
  };

  const gridItemSizes = getGridItemSizes();

  return (
    <Box
      sx={{
        height: '100%',
        overflowY: 'auto',
        px: 1,
        pt: 1,
      }}
    >
      <Grid2
        container
        spacing={1}
        sx={{
          maxHeight: isSmallScreen ? 'auto' : '100%',
          height: videos.length == 1 ? '100%' : 'auto',
        }}
      >
        {videos.map((video, index) => (
          <Grid2
            size={{ ...gridItemSizes }}
            key={index}
            sx={{ maxHeight: '100%' }}
          >
            <video
              src={video.src}
              style={{
                width: '100%',
                objectFit: 'contain',
              }}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default VideoGrid; 

 */
