'use client';

import Box from '@mui/material/Box';
import { Typography } from '@/components/atoms/Typography';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

export const SectionHeader = ({ title, subtitle, align = 'center' }: SectionHeaderProps) => {
  return (
    <Box sx={{ mb: 6, textAlign: align }}>
      <Typography variant="h3" component="h2" gutterBottom color="text.primary">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: align === 'center' ? 'auto' : 0 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};
