import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    error: {
      main: '#f44336',
    },
    primary: {
      main: '#90caf9', // Azul claro
    },
    secondary: {
      main: '#f48fb1', // Rosa claro
    },
    background: {
      default: '#121212', // Fondo oscuro
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bdbdbd',
    },
  },
  typography: {
    fontFamily: 'Arial',
  },
});
