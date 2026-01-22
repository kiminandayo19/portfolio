'use client';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { Typography } from '@/components/atoms/Typography';
import { Skill } from '@/types/backend';
import { FadeIn } from '@/components/animations/FadeIn';

interface SkillsSectionProps {
  skills: Skill[];
}

export const SkillsSection = ({ skills }: SkillsSectionProps) => {
  return (
    <Box id="skills" component="section" sx={{ py: 10, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <FadeIn>
          <SectionHeader title="Technical Proficiency" subtitle="Tools and technologies I use to build scalable products." />
        </FadeIn>
        <Grid container spacing={4}>
          {skills.map((category, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <FadeIn delay={0.15 * (index + 1)}>
                <Paper sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: '20px',
                  bgcolor: (theme) => theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.65)' : 'rgba(30, 41, 59, 0.65)',
                  backdropFilter: 'blur(16px) saturate(180%)',
                  border: '1px solid',
                  borderColor: (theme) => theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                  boxShadow: (theme) => theme.palette.mode === 'light'
                    ? '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
                    : '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    borderColor: 'primary.main'
                  }
                }} elevation={0}>
                  <Typography variant="h6" gutterBottom color="primary.main" fontWeight={700} sx={{ letterSpacing: '-0.01em' }}>
                    {category.category}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 3 }}>
                    {category.items.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        sx={{
                          borderRadius: '8px',
                          fontWeight: 500,
                          bgcolor: (theme) => theme.palette.mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
                          border: 'none'
                        }}
                      />
                    ))}
                  </Box>
                </Paper>
              </FadeIn>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
