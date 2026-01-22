import React from 'react';
import { Box, Typography } from '@mui/material';
import LinkButton from '@/components/common/LinkButton';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import SkillForm from '@/components/skill/SkillForm';

export default function NewSkillPage() {
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
          Add New Skill Category
        </Typography>
      </Box>
      <SkillForm />
    </Box>
  );
}
