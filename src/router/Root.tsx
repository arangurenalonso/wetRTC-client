import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
      }}
    >
      <Outlet />
    </Box>
  );
};

export default Root;
