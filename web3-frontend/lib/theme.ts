import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00E676',
      light: '#69F0AE',
      dark: '#00C853',
    },
    secondary: {
      main: '#1DE9B6',
    },
    background: {
      default: '#050A14',
      paper: '#0D1B2A',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#8899AA',
    },
    success: {
      main: '#00E676',
    },
    error: {
      main: '#FF5252',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
        contained: {
          background: 'linear-gradient(135deg, #00E676 0%, #1DE9B6 100%)',
          color: '#050A14',
          '&:hover': {
            background: 'linear-gradient(135deg, #69F0AE 0%, #64FFDA 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(13, 27, 42, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 230, 118, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(0, 230, 118, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 230, 118, 0.6)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00E676',
            },
          },
        },
      },
    },
  },
});

export default theme;
