import React from 'react';
import { Box, Typography, Button, Card, CardContent, Grid, Chip } from '@mui/material';
import LinkButton from '@/components/common/LinkButton';
import DeleteButton from '@/components/common/DeleteButton';
import { Add as AddIcon, Edit as EditIcon, Launch as LaunchIcon } from '@mui/icons-material';
import { getProjects, deleteProject } from '@/actions/project';

export default async function ProjectsPage() {
  const result = await getProjects();
  const projects = result.data || [];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Projects
        </Typography>
        <LinkButton
          href="/projects/new"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add Project
        </LinkButton>
      </Box>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid size={{ xs: 12, md: 6 }} key={project.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6">{project.title}</Typography>
                  <Box>
                    <LinkButton
                      href={`/projects/${project.id}/edit`}
                      startIcon={<EditIcon />}
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </LinkButton>
                    <DeleteButton
                      id={project.id}
                      deleteAction={deleteProject}
                      resourceName="Project"
                    />
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {project.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  {project.tags.map((tag, index) => (
                    <Chip key={index} label={tag} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                  ))}
                </Box>

                {project.link && (
                  <Button
                    size="small"
                    endIcon={<LaunchIcon />}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
        {projects.length === 0 && (
          <Grid size={{ xs: 12 }}>
            <Typography color="text.secondary" textAlign="center">
              No projects found. Add one to get started.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
