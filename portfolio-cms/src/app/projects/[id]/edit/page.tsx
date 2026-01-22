import React from 'react';
import { Box, Typography } from '@mui/material';
import LinkButton from '@/components/common/LinkButton';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import ProjectForm from '@/components/project/ProjectForm';
import { getProjects } from '@/actions/project';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  // Fetch specific project or from list
  const result = await getProjects();
  const project = result.data?.find((p) => p.id === id);

  if (!project) {
    return <Box sx={{ p: 3 }}>Project not found</Box>;
  }

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
          Edit Project
        </Typography>
      </Box>
      <ProjectForm initialData={project} isEdit />
    </Box>
  );
}
