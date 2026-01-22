'use client';

import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, useTheme } from '@mui/material';
import { Work as WorkIcon, Architecture as ProjectIcon, Code as CodeIcon, ArrowForward } from '@mui/icons-material';
import Link from 'next/link';

interface DashboardWidgetsProps {
  stats: {
    experiences: number;
    projects: number;
    skills: number;
  };
}

export default function DashboardWidgets({ stats }: DashboardWidgetsProps) {
  const theme = useTheme();

  const statItems = [
    {
      label: 'Experiences',
      value: stats.experiences,
      icon: <WorkIcon fontSize="large" sx={{ opacity: 0.8 }} />,
      color: '#007FFF',
      link: '/experiences'
    },
    {
      label: 'Projects',
      value: stats.projects,
      icon: <ProjectIcon fontSize="large" sx={{ opacity: 0.8 }} />,
      color: '#3399FF',
      link: '/projects'
    },
    {
      label: 'Skill Categories',
      value: stats.skills,
      icon: <CodeIcon fontSize="large" sx={{ opacity: 0.8 }} />,
      color: '#0059B2',
      link: '/skills'
    },
  ];

  return (
    <Box>
      {/* Banner */}
      <Box sx={{
        mb: 6,
        p: 4,
        borderRadius: 4,
        background: theme.palette.mode === 'light'
          ? 'linear-gradient(135deg, #E3F2FD 0%, #F3F6F9 100%)'
          : 'linear-gradient(135deg, rgba(0, 127, 255, 0.1) 0%, rgba(0, 30, 60, 0.2) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
            Welcome back, Arif!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mb: 3 }}>
            Manage your portfolio content, update your projects, and showcase your latest skills from this unified dashboard.
          </Typography>
          <Button
            component={Link}
            href="/profile"
            variant="contained"
            endIcon={<ArrowForward />}
            sx={{ px: 4 }}
          >
            View Profile
          </Button>
        </Box>
      </Box>

      {/* Stats Grid */}
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>Overview</Typography>
      <Grid container spacing={3}>
        {statItems.map((stat) => (
          <Grid size={{ xs: 12, md: 4 }} key={stat.label}>
            <Card sx={{ height: '100%', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
              <CardContent sx={{ p: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: stat.color, mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" fontWeight={600}>
                    {stat.label}
                  </Typography>
                </Box>
                <Box sx={{
                  p: 2,
                  borderRadius: '50%',
                  bgcolor: theme.palette.mode === 'light' ? `${stat.color}15` : `${stat.color}30`,
                  color: stat.color,
                  display: 'flex'
                }}>
                  {stat.icon}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
