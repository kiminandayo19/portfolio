import React from 'react';
import { Box, Typography } from '@mui/material';
import LinkButton from '@/components/common/LinkButton';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import ExperienceForm from '@/components/experience/ExperienceForm';
import { getExperiences } from '@/actions/experience';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditExperiencePage({ params }: PageProps) {
  const { id } = await params;
  // Since we don't have getExperienceById, we find it from the list or need a new action.
  // Standard Backend Guidelines: usually GET /experiences/:id exists.
  // I will check `portfolio-backend/src/routes/experienceRoutes.ts` or assume list fetch and find.
  // Efficient way: GET /experiences/:id.
  // I'll assume list fetching for now to be safe or add getExperience(id) to actions.
  // Let's check actions first by reading `src/actions/experience.ts`.
  // I haven't implemented getExperience(id) yet. I will implement it now in actions/experience.ts.

  // Wait, I can't update actions in this same tool turn easily without breaking flow. 
  // I'll fetch all and find. It's a portfolio, data is small.
  const result = await getExperiences();
  const experience = result.data?.find((e) => e.id === id);

  if (!experience) {
    return <Box sx={{ p: 3 }}>Experience not found</Box>;
  }

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
          Edit Experience
        </Typography>
      </Box>
      <ExperienceForm initialData={experience} isEdit />
    </Box>
  );
}
