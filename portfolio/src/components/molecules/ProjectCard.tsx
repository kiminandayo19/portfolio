'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';

export interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string | null;
}

export const ProjectCard = ({ title, description, tags, link }: ProjectCardProps) => {
  return (
    <Card sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      borderRadius: '20px',
      bgcolor: (theme) => theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.65)' : 'rgba(30, 41, 59, 0.65)',
      backdropFilter: 'blur(16px) saturate(180%)',
      border: '1px solid',
      borderColor: (theme) => theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)',
      boxShadow: (theme) => theme.palette.mode === 'light'
        ? '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
        : '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
      '&:hover': {
        transform: 'translateY(-6px)',
        boxShadow: (theme) => theme.palette.mode === 'light'
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          : '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        borderColor: 'primary.main',
      },
      overflow: 'hidden'
    }}>
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
          {description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                backgroundColor: (theme) => theme.palette.mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
                border: 'none',
                fontWeight: 500,
                color: 'text.secondary'
              }}
            />
          ))}
        </Box>
      </CardContent>
      {link && (
        <CardActions sx={{ p: 3, pt: 0 }}>
          <Button
            size="small"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontWeight: 600 }}
            aria-label={`View ${title} project details`}
          >
            View Project
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
