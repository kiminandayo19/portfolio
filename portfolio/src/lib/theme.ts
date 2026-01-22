'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const getTheme = (mode: 'light' | 'dark') => {
  let theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#007FFF' : '#3399FF',
      },
      background: {
        default: mode === 'light' ? '#F3F6F9' : '#0A1929',
        paper: mode === 'light' ? '#FFFFFF' : '#001E3C',
      },
      text: {
        primary: mode === 'light' ? '#1A2027' : '#FFFFFF',
        secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)',
      },
      divider: mode === 'light' ? '#E7EBF0' : 'rgba(255, 255, 255, 0.12)',
    },
    typography: {
      fontFamily: inter.style.fontFamily,
      h1: { fontWeight: 700, letterSpacing: '-0.02em' },
      h2: { fontWeight: 700, letterSpacing: '-0.02em' },
      h3: { fontWeight: 700, letterSpacing: '-0.02em' },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 10,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
            },
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: 'background-color 0.4s ease, color 0.4s ease',
          },
          // We apply transition to all elements to capture components like Cards, Paper, etc.
          // However, we only want this during the theme switch.
          // MUI logic makes this always active, which is usually fine for these specific properties.
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            transition: 'background-color 0.4s ease, color 0.4s ease, box-shadow 0.4s ease',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: mode === 'light' ? '1px solid #E7EBF0' : 'none',
            boxShadow: mode === 'light' ? 'none' : '0px 4px 20px rgba(0, 0, 0, 0.5)',
            transition: 'background-color 0.4s ease, color 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            transition: 'background-color 0.4s ease, color 0.4s ease, backdrop-filter 0.4s ease',
          },
        },
      },
    },
  });

  theme = responsiveFontSizes(theme);
  return theme;
};
