import React from 'react';
import { Box, Typography, Button, Card, CardContent, Grid, Chip } from '@mui/material';
import LinkButton from '@/components/common/LinkButton';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
import { getSkills } from '@/actions/skill';

export default async function SkillsPage() {
  const result = await getSkills();
  const skills = result.data || [];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Skills
        </Typography>
        <LinkButton
          href="/skills/new"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add Skill Category
        </LinkButton>
      </Box>

      <Grid container spacing={3}>
        {skills.map((skill) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={skill.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                    {skill.category}
                  </Typography>
                  <LinkButton
                    href={`/skills/${skill.id}/edit`}
                    startIcon={<EditIcon />}
                    size="small"
                  >
                    Edit
                  </LinkButton>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {skill.items.map((item, index) => (
                    <Chip key={index} label={item} size="small" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {skills.length === 0 && (
          <Grid size={{ xs: 12 }}>
            <Typography color="text.secondary" textAlign="center">
              No skills found. Add a category to get started.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
