import { Box } from '@mui/material';

const VerticalDivider = () => {
  return (
    <Box
      sx={{
        width: '1px',
        height: '40px', // Puedes ajustar la altura según lo que necesites
        backgroundColor: '#e0e0e0', // Color gris claro
        marginLeft: '8px',
        marginRight: '8px',
      }}
    />
  );
};

export default VerticalDivider;
