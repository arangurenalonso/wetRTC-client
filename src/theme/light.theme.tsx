import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Color principal (azul)
    },
    error: {
      main: '#f44336',
    },
    secondary: {
      main: '#d32f2f', // Color secundario (rojo)
    },
    background: {
      default: '#f5f5f5', // Fondo claro
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: 'Arial',
  },
});
