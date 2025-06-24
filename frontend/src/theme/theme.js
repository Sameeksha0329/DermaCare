import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8568a5', // Deeper, richer purple
      light: '#c5b1d8',
      dark: '#6a4c8c', // More saturated dark purple
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#50b8c5', // Teal blue - medical color
      light: '#7cdfeb',
      dark: '#338f99',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#f8f9fa',
    },
    text: {
      primary: '#2c2c2c', // Darker text for better contrast
      secondary: '#5f5f5f',
    },
    error: {
      main: '#e53935', // Slightly adjusted for medical theme
    },
    warning: {
      main: '#f5a623',
    },
    info: {
      main: '#42a5f5',
    },
    success: {
      main: '#66bb6a',
    },
    // Additional color options for treatments
    treatment: {
      acne: '#de8fa7', // Soft pink
      psoriasis: '#89a2d2', // Soft blue
      vitiligo: '#9bc995', // Soft green
      eczema: '#e2c391', // Soft amber
      candidiasis: '#b290c5', // Soft purple
    }
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: '10px 20px',
          boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #8568a5 30%, #a087bd 90%)',
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #50b8c5 30%, #7cdfeb 90%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 10px 20px rgba(0,0,0,0.05), 0 6px 6px rgba(0,0,0,0.07)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 15px 30px rgba(0,0,0,0.1), 0 8px 8px rgba(0,0,0,0.08)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

export default theme; 