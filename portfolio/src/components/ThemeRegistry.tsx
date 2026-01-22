'use client';

import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'; // Compatible with Next 15/16 usually
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { getTheme } from '@/lib/theme';

import useMediaQuery from '@mui/material/useMediaQuery';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = React.useState(false);

  // Handle initial theme detection and persistence after mount to avoid hydration mismatch
  React.useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as 'light' | 'dark' | null;
    if (savedMode) {
      setMode(savedMode);
    } else if (prefersDarkMode) {
      setMode('dark');
    }
    setMounted(true);
  }, [prefersDarkMode]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme-mode', newMode);
          return newMode;
        });
      },
    }),
    [],
  );

  const theme = React.useMemo(() => getTheme(mode), [mode]);

  return (
    <AppRouterCacheProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* 
            Always render children to prevent hydration mismatch.
            Use visibility: hidden only during the very first render pass if not yet mounted.
            The no-transitions class helps prevent visual jumps.
          */}
          <Box
            className={!mounted ? 'no-transitions' : ''}
            sx={{
              opacity: mounted ? 1 : 0,
              transition: 'opacity 0.2s ease-in',
              minHeight: '100vh',
            }}
          >
            {children}
          </Box>
          {!mounted && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: '#F3F6F9', // Matches initial 'light' mode background
                zIndex: 9999,
                pointerEvents: 'none',
              }}
            />
          )}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AppRouterCacheProvider>
  );
}
