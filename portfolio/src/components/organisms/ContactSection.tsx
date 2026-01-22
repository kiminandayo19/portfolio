'use client';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { Profile } from '@/types/backend';
import { FadeIn } from '@/components/animations/FadeIn';

interface ContactSectionProps {
  profile: Profile | null;
}

export const ContactSection = ({ profile }: ContactSectionProps) => {
  if (!profile) return null;

  return (
    <Box id="contact" component="section" sx={{ py: 10, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <FadeIn>
          <SectionHeader title="Get In Touch" subtitle="Interested in working together? Feel free to reach out." />
        </FadeIn>
        <FadeIn delay={0.2}>
          <Paper elevation={0} sx={{
            p: { xs: 4, md: 6 },
            borderRadius: '24px',
            bgcolor: (theme) => theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.65)' : 'rgba(30, 41, 59, 0.65)',
            backdropFilter: 'blur(16px) saturate(180%)',
            border: '1px solid',
            borderColor: (theme) => theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)',
            boxShadow: (theme) => theme.palette.mode === 'light'
              ? '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
              : '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
          }}>
            <form action={`mailto:${profile.email}`} method="GET" encType="text/plain">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    variant="filled"
                    required
                    sx={{ '& .MuiFilledInput-root': { borderRadius: 3, bgcolor: 'rgba(0,0,0,0.03)' } }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    variant="filled"
                    required
                    sx={{ '& .MuiFilledInput-root': { borderRadius: 3, bgcolor: 'rgba(0,0,0,0.03)' } }}
                  />
                </Box>
                <TextField
                  fullWidth
                  label="Message"
                  name="body"
                  multiline
                  rows={4}
                  variant="filled"
                  required
                  sx={{ '& .MuiFilledInput-root': { borderRadius: 3, bgcolor: 'rgba(0,0,0,0.03)' } }}
                />
                <Box sx={{ alignSelf: 'center' }}>
                  <Button type="submit" variant="contained" size="large" sx={{ minWidth: 200, borderRadius: 50, py: 1.5, fontSize: '1.1rem' }}>
                    Send Message
                  </Button>
                </Box>
              </Box>
            </form>
          </Paper>
        </FadeIn>
      </Container>
    </Box>
  );
};
