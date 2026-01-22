import React from 'react';
import { Box, Typography } from '@mui/material';
import LinkButton from '@/components/common/LinkButton';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import SkillForm from '@/components/skill/SkillForm';
import { getSkills } from '@/actions/skill';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditSkillPage({ params }: PageProps) {
  const { id } = await params;
  // Fetch specific skill
  const result = await getSkills();
  const skill = result.data?.find((s) => s.id === id);

  if (!skill) {
    return <Box sx={{ p: 3 }}>Skill Category not found</Box>;
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <LinkButton
          href="/skills"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
        >
          Back to Skills
        </LinkButton>
        <Typography variant="h4" component="h1">
          Edit Skill Category
        </Typography>
      </Box>
      <SkillForm initialData={skill} isEdit />
    </Box>
  );
}
