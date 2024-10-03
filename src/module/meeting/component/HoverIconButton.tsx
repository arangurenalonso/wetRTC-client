import { Box, Typography, useTheme } from '@mui/material';
import { ReactElement } from 'react';

interface HoverIconButtonProps {
  icon: ReactElement;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  direction?: 'row' | 'column';
}

const HoverIconButton = ({
  icon,
  label,
  isActive = false,
  onClick,
  direction = 'column',
}: HoverIconButtonProps) => {
  const theme = useTheme();

  return (
    <Box
      onClick={onClick}
      sx={{
        mx: 0.5,
        display: 'flex',
        flexDirection: { direction },
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(1),
        borderRadius: 1,
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        backgroundColor: isActive
          ? theme.palette.secondary.main
          : 'transparent', // Cambia color si es activo
        color: isActive ? theme.palette.secondary.contrastText : 'inherit', // Cambia el color de texto si es activo
        '&:hover': {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
        },
        py: 0,
      }}
    >
      <Box sx={{ fontSize: 12 }}>{icon}</Box>
      <Typography variant="caption">{label}</Typography>
    </Box>
  );
};

export default HoverIconButton;
