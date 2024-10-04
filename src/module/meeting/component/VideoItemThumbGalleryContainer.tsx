import { Box } from '@mui/material';
type VideoItemThumbGalleryContainerProps = {
  onClick: () => void;
  direction: 'row' | 'column';
  children?: React.ReactNode;
};
const VideoItemThumbGalleryContainer = ({
  onClick,
  direction,
  children,
}: VideoItemThumbGalleryContainerProps) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'relative',
        ...(direction === 'column'
          ? {
              width: '100%',
            }
          : direction === 'row'
          ? {
              height: '100%',
              display: 'inline-block',
              // width: '240px',
              mr: 1,
            }
          : {}),
      }}
    >
      {children}
    </Box>
  );
};

export default VideoItemThumbGalleryContainer;
