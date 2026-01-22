'use client';

import * as React from 'react';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';

/**
 * ScrollToTop component provides a Floating Action Button (FAB) 
 * that allows users to seamlessly scroll back to the top of the page.
 */
export const ScrollToTop = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000 }}
      >
        <Fab
          color="primary"
          size="medium"
          aria-label="scroll back to top"
          sx={{
            boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
            '&:hover': {
              boxShadow: '0 6px 20px rgba(0,118,255,0.23)',
              backgroundColor: 'primary.dark',
            },
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
};
