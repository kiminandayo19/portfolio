import React from 'react';
import { Box, Typography } from '@mui/material';
import LinkButton from '@/components/common/LinkButton';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import ExperienceForm from '@/components/experience/ExperienceForm';

export default function NewExperiencePage() {
  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <LinkButton
          href="/experiences"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
        >
          Back to Experiences
        </LinkButton>
        <Typography variant="h4" component="h1">
          Add New Experience
        </Typography>
      </Box>
      <ExperienceForm />
    </Box>
  );
}
