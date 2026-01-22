'use client';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@/components/atoms/Typography';

export interface ExperienceItemProps {
  role: string;
  company: string;
  period: string;
  description?: string[];
  isLast?: boolean;
}

export const ExperienceItem = ({ role, company, period, description, isLast }: ExperienceItemProps) => {
  return (
    <Box sx={{ display: 'flex', gap: { xs: 2, md: 4 }, mb: isLast ? 0 : 4, position: 'relative' }}>
      {/* Timeline Line - hidden on mobile */}
      {!isLast && (
        <Box sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          left: '16px',
          top: '40px',
          bottom: '-32px',
          width: '2px',
          bgcolor: 'divider',
          zIndex: 0
        }} />
      )}

      {/* Dot - hidden on mobile */}
      <Box sx={{
        display: { xs: 'none', md: 'flex' },
        width: '34px',
        height: '34px',
        borderRadius: '50%',
        bgcolor: 'background.paper',
        border: '2px solid',
        borderColor: 'primary.main',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        flexShrink: 0
      }}>
        <Box sx={{ width: '12px', height: '12px', borderRadius: '50%', bgcolor: 'primary.main' }} />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Paper elevation={0} sx={{
          p: { xs: 2, md: 3 },
          bgcolor: 'background.paper',
          border: 1,
          borderColor: 'divider',
          borderRadius: { xs: '12px', md: '10px' }
        }}>
          <Typography variant="h6" component="h3" fontWeight={700} sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
            {role}
          </Typography>
          <Typography variant="subtitle1" color="primary.main" gutterBottom sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
            {company}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {period}
          </Typography>
          {description && (
            <Box component="ul" sx={{ m: 0, pl: 2, '& li': { mb: 0.5, color: 'text.secondary' } }}>
              {description.map((item, index) => (
                <li key={index}>
                  <Typography variant="body2" component="span">{item}</Typography>
                </li>
              ))}
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};
