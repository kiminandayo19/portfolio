'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography, Paper, Grid, Alert, Snackbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ProfileSchema, ProfileFormValues } from '@/lib/schema';
import { updateProfile } from '@/actions/profile';
import { Profile } from '@/types';

interface ProfileFormProps {
  initialData?: Profile | null;
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema) as any,
    defaultValues: {
      name: initialData?.name || '',
      title: initialData?.title || '',
      email: initialData?.email || '',
      linkedin: initialData?.linkedin || '',
      location: initialData?.location || '',
      summary: initialData?.summary || '',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await updateProfile({ ...data, linkedin: data.linkedin || '' });
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/profile');
          router.refresh();
        }, 1500);
      } else {
        setError(res.error || 'Failed to update profile');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Profile Details</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit as any)} noValidate>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Full Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Job Title"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="linkedin"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="LinkedIn URL"
                  fullWidth
                  error={!!errors.linkedin}
                  helperText={errors.linkedin?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Location"
                  fullWidth
                  error={!!errors.location}
                  helperText={errors.location?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="summary"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Professional Summary"
                  multiline
                  rows={4}
                  fullWidth
                  error={!!errors.summary}
                  helperText={errors.summary?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Profile'}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        message="Profile updated successfully"
      />
    </Paper>
  );
}
