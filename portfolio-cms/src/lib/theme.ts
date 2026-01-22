'use client';
import { createTheme, alpha } from '@mui/material/styles';
import { Inter } from 'next/font/google';

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// modern palette
const vibrantBlue = '#007FFF';
const softBlue = '#3399FF';
const darkBackground = '#0A1929';
const darkPaper = '#001E3C';

// Shared component overrides
const getComponentOverrides = (mode: 'light' | 'dark') => ({
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 50, // Pill shape
        textTransform: 'none' as const,
        fontWeight: 600,
        boxShadow: 'none',
        padding: '10px 24px',
        '&:hover': {
          boxShadow: '0 4px 12px 0 rgba(0,0,0,0.1)',
        },
      },
      contained: {
        background: mode === 'light'
          ? `linear-gradient(45deg, ${vibrantBlue} 30%, #0059B2 90%)`
          : `linear-gradient(45deg, ${softBlue} 30%, ${vibrantBlue} 90%)`,
      }
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        border: mode === 'light' ? '1px solid #E7EBF0' : '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: mode === 'light'
          ? '0px 4px 20px rgba(0, 0, 0, 0.05)'
          : 'none',
        background: mode === 'light'
          ? '#FFFFFF'
          : alpha(darkPaper, 0.6),
        backdropFilter: mode === 'dark' ? 'blur(20px)' : 'none',
      }
    }
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      }
    }
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        background: mode === 'light'
          ? 'rgba(255, 255, 255, 0.8)'
          : alpha(darkBackground, 0.8),
        backdropFilter: 'blur(20px)',
        boxShadow: 'none',
        borderBottom: `1px solid ${mode === 'light' ? '#E7EBF0' : 'rgba(255, 255, 255, 0.08)'}`,
        color: mode === 'light' ? '#1A2027' : '#FFFFFF',
      }
    }
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        background: mode === 'light'
          ? '#F3F6F9'
          : darkBackground,
        borderRight: 'none',
      }
    }
  }
});

// Light Theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: vibrantBlue },
    background: {
      default: '#F3F6F9',
      paper: '#FFFFFF',
    },
    text: { primary: '#1A2027', secondary: '#6F7E8C' },
    divider: '#E7EBF0',
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600, letterSpacing: '-0.02em' },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 16 },
  components: getComponentOverrides('light'),
});

// Dark Theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: softBlue },
    background: {
      default: darkBackground,
      paper: darkPaper,
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600, letterSpacing: '-0.02em' },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 16 },
  components: getComponentOverrides('dark'),
});
