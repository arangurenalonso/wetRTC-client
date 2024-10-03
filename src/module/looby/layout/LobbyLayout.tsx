import { Box, Typography, Paper, Grid2, Divider } from '@mui/material';
import { ReactNode } from 'react';
import ThemeSwitcher from '../../../theme/ThemeSwitcher';

const LobbyLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      maxWidth="sm"
      sx={{
        mx: 'auto',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Paper elevation={5} sx={{ padding: 1.5 }}>
          <Grid2 container spacing={1.5}>
            <Grid2 size={12}>
              <div>
                <Grid2 container spacing={1}>
                  <Grid2 size="grow">
                    <Typography
                      variant="h3"
                      component="div"
                      color="primary"
                      sx={{ textAlign: 'center' }}
                    >
                      FreeMeet
                    </Typography>
                  </Grid2>
                  <Grid2 size="auto">
                    <ThemeSwitcher />
                  </Grid2>
                </Grid2>
              </div>
            </Grid2>
            <Grid2 size={12}>
              <Divider sx={{ marginY: 2 }} /> {/* Divider added here */}
            </Grid2>
            <Grid2 size={12}>
              <div>{children}</div>
            </Grid2>
          </Grid2>
        </Paper>
      </Box>
    </Box>
  );
};

export default LobbyLayout;
