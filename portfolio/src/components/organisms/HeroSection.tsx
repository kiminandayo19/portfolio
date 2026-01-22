'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Profile } from '@/types/backend';
import { FadeIn } from '@/components/animations/FadeIn';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  profile: Profile | null;
}

export const HeroSection = ({ profile }: HeroSectionProps) => {
  if (!profile) return null;

  return (
    <Box sx={{
      py: { xs: 8, md: 20 },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      bgcolor: 'background.default'
    }}>
      {/* Decorative Blobs */}
      <Box sx={{
        position: 'absolute',
        top: '-15%',
        right: '-5%',
        width: { xs: '300px', md: '600px' },
        height: { xs: '300px', md: '600px' },
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,127,255,0.15) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(60px)',
        zIndex: 0,
        willChange: 'transform, filter',
        transform: 'translateZ(0)',
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: '-5%',
        left: '-5%',
        width: { xs: '250px', md: '500px' },
        height: { xs: '250px', md: '500px' },
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(51,153,255,0.1) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(40px)',
        zIndex: 0,
        willChange: 'transform, filter',
        transform: 'translateZ(0)',
      }} />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <FadeIn>
          <Typography variant="h1" gutterBottom sx={{
            fontSize: { xs: '2.5rem', md: '4.5rem' },
            fontWeight: 800,
            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary?.main || theme.palette.info.light})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            letterSpacing: '-0.03em'
          }}>
            {profile.name}
          </Typography>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Typography variant="h4" component="h2" color="text.secondary" gutterBottom sx={{ mb: 4, fontWeight: 500 }}>
            {profile.title}
          </Typography>
        </FadeIn>

        <FadeIn delay={0.4}>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.25rem', maxWidth: '800px', mb: 6, lineHeight: 1.8 }}>
            {profile.summary}
          </Typography>
        </FadeIn>

        <FadeIn delay={0.6}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Box component={motion.div} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} sx={{ width: { xs: '100%', sm: 'auto' } }}>
              <Button variant="contained" size="large" href="#projects" sx={{ borderRadius: 50, px: 4, width: '100%' }}>
                View My Work
              </Button>
            </Box>
            <Box component={motion.div} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} sx={{ width: { xs: '100%', sm: 'auto' } }}>
              <Button variant="outlined" size="large" href={`mailto:${profile.email}`} sx={{ borderRadius: 50, px: 4, width: '100%' }}>
                Contact Me
              </Button>
            </Box>
          </Box>
        </FadeIn>
      </Container>
    </Box>
  );
};
