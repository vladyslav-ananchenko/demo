import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  palette: {
    primary: {
      main: 'rgb(25, 118, 210)',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f8f8f8',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.08)',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        maxWidthXs: {
          maxWidth: '520px !important',
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        sx: {
          fontSize: '14px',
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        sx: {
          fontSize: '14px',
        },
      },
    },
  },
});

export { theme };
