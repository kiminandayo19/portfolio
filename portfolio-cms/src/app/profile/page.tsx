import React from 'react';
import { Box, Typography, Card, CardContent, Button, Divider, Grid } from '@mui/material';
import LinkButton from '@/components/common/LinkButton';
import { getProfile } from '@/actions/profile';
import { Edit as EditIcon } from '@mui/icons-material';

export default async function ProfilePage() {
  const result = await getProfile();

  if (!result.success || !result.data) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Profile</Typography>
        {result.error && <Typography color="error">Error: {result.error}</Typography>}
        <Box sx={{ mt: 2 }}>
          <Typography>No profile found. Please create one.</Typography>
          <LinkButton variant="contained" href="/profile/edit" sx={{ mt: 2 }}>
            Create Profile
          </LinkButton>
        </Box>
      </Box>
    );
  }

  const profile = result.data;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Profile
        </Typography>
        <LinkButton
          href="/profile/edit"
          variant="contained"
          startIcon={<EditIcon />}
        >
          Edit Profile
        </LinkButton>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Box sx={{ width: 100, height: 100, borderRadius: '50%', bgcolor: 'primary.main', mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '2rem' }}>
                  {profile.name.charAt(0)}
                </Box>
                <Typography variant="h5">{profile.name}</Typography>
                <Typography color="text.secondary" gutterBottom>{profile.title}</Typography>
                <Typography variant="body2">{profile.location}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>About</Typography>
              <Typography variant="body1" paragraph style={{ whiteSpace: 'pre-line' }}>
                {profile.summary}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>Contact Information</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                  <Typography variant="body1">{profile.email}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">LinkedIn</Typography>
                  <Typography variant="body1">
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                      {profile.linkedin}
                    </a>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
