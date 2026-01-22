import React from 'react';
import { Box, Typography } from '@mui/material';
import LinkButton from '@/components/common/LinkButton';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import ProjectForm from '@/components/project/ProjectForm';

export default function NewProjectPage() {
  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <LinkButton
          href="/projects"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
        >
          Back to Projects
        </LinkButton>
        <Typography variant="h4" component="h1">
          Add New Project
        </Typography>
      </Box>
      <ProjectForm />
    </Box>
  );
}
