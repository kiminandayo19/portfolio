import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import LinkButton from '@/components/common/LinkButton';
import DeleteButton from '@/components/common/DeleteButton';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
import { getExperiences, deleteExperience } from '@/actions/experience';

export default async function ExperiencesPage() {
  const result = await getExperiences();
  const experiences = result.data || [];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Experiences
        </Typography>
        <LinkButton
          href="/experiences/new"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add Experience
        </LinkButton>
      </Box>

      <Grid container spacing={3}>
        {experiences.map((exp) => (
          <Grid size={{ xs: 12 }} key={exp.id}>
            <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{exp.role} at {exp.company}</Typography>
                <Typography color="text.secondary" gutterBottom>{exp.period}</Typography>
                {exp.description.map((desc, index) => (
                  <Typography key={index} variant="body2" paragraph sx={{ mb: 1 }}>
                    • {desc}
                  </Typography>
                ))}
              </CardContent>
              <Box sx={{ p: 2 }}>
                <LinkButton
                  href={`/experiences/${exp.id}/edit`}
                  startIcon={<EditIcon />}
                  size="small"
                  sx={{ mr: 1 }}
                >
                  Edit
                </LinkButton>
                <DeleteButton
                  id={exp.id}
                  deleteAction={deleteExperience}
                  resourceName="Experience"
                />
              </Box>

            </Card>
          </Grid>
        ))}
        {experiences.length === 0 && (
          <Grid size={{ xs: 12 }}>
            <Typography color="text.secondary" textAlign="center">
              No experiences found. Add one to get started.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box >
  );
}
