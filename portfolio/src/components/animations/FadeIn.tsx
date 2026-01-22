'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Box, { BoxProps } from '@mui/material/Box';

interface FadeInProps extends BoxProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

export const FadeIn = ({ children, delay = 0, duration = 0.5, yOffset = 20, ...props }: FadeInProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <Box ref={ref} component={motion.div}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{ duration: duration, delay: delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </Box>
  );
};
