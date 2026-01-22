'use client';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { Project } from '@/types/backend';
import { FadeIn } from '@/components/animations/FadeIn';

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  return (
    <Box id="projects" component="section" sx={{ py: 10, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <FadeIn>
          <SectionHeader title="Featured Projects" subtitle="Key initiatives and applications I have delivered." />
        </FadeIn>
        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index} sx={{ display: 'flex' }}>
              <FadeIn delay={0.1 * (index + 1)} sx={{ width: '100%' }}>
                <ProjectCard {...project} />
              </FadeIn>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
