import React from 'react';
import { Box, Typography } from '@mui/material';
import LinkButton from '@/components/common/LinkButton';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { getProfile } from '@/actions/profile';
import ProfileForm from '@/components/profile/ProfileForm';

export default async function EditProfilePage() {
  const result = await getProfile();
  const profile = result.data;

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ mb: 3 }}>
        <LinkButton
          href="/profile"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
        >
          Back to Profile
        </LinkButton>
        <Typography variant="h4" component="h1">
          {profile ? 'Edit Profile' : 'Create Profile'}
        </Typography>
      </Box>
      <ProfileForm initialData={profile} />
    </Box>
  );
}
