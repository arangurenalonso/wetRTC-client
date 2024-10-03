import { Box, useTheme } from '@mui/material';

type VideoThumbGalleryProps = {
  videos: { src: string }[];
  direction: 'row' | 'column';
};

const VideoThumbGallery = ({ videos, direction }: VideoThumbGalleryProps) => {
  const theme = useTheme(); // Utilizamos el tema de Material-UI para obtener el color primario

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
        sx={
          direction === 'column'
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
            : {}
        }
      >
        {videos.map((video, index) => (
          <Box
            key={index} // Moved the key to the outer Box
            sx={
              direction === 'column'
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
                : {}
            }
          >
            <video
              src={video.src}
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'contain',
                lineHeight: 0,
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default VideoThumbGallery;
