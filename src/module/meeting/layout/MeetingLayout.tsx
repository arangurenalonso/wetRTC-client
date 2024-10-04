import { Box, Divider, Grid2 } from '@mui/material';
import { ReactNode } from 'react';
interface MeetingLayoutProps {
  toolbar: ReactNode;
  sideBar: ReactNode;
  children: ReactNode;
}
const MeetingLayout = ({ toolbar, children, sideBar }: MeetingLayoutProps) => {
  return (
    <Grid2
      container
      sx={{
        height: '100%',
      }}
      direction="column"
      spacing={0.5}
    >
      <Grid2 size="auto">{toolbar}</Grid2>

      <Divider />
      <Grid2
        size="grow"
        sx={{
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            height: '100%',
          }}
        >
          <Grid2
            container
            sx={{
              height: '100%',
            }}
            spacing={1}
          >
            <Grid2
              size={'grow'}
              sx={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
              }}
            >
              {children}
            </Grid2>
            <Grid2 size={'auto'}>{sideBar}</Grid2>
          </Grid2>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default MeetingLayout;
