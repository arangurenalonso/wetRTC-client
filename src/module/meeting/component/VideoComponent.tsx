import { Box } from '@mui/material';
import React from 'react';
type VideoComponentProps = {
  stream: MediaStream;
  mutedVideo?: boolean;
};
const VideoComponent = ({ stream, mutedVideo }: VideoComponentProps) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <Box
      component="video"
      ref={videoRef}
      sx={{
        height: '100%',
        width: '100%',
        objectFit: 'contain',
        lineHeight: 0,
      }}
      muted={mutedVideo}
      autoPlay
    />
  );
};

export default VideoComponent;
