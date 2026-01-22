'use client';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { Typography } from '@/components/atoms/Typography';
import { Profile } from '@/types/backend';

interface FooterProps {
  profile: Profile | null;
}

export const Footer = ({ profile }: FooterProps) => {
  if (!profile) return null;

  return (
    <Box component="footer" sx={{ py: 6, bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Box>
          <IconButton href={profile.linkedin} target="_blank" color="primary">
            <LinkedInIcon />
          </IconButton>
          <IconButton href={`mailto:${profile.email}`} color="primary">
            <EmailIcon />
          </IconButton>
          {/* Add GitHub if available in data, handled conditionally or just standard icon if common */}
          <IconButton href="https://github.com/ariffaishal" target="_blank" color="primary">
            <GitHubIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};
