'use client';

import React, { useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography, Paper, Grid, Alert, IconButton } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { ExperienceSchema, ExperienceFormValues } from '@/lib/schema';
import { createExperience, updateExperience } from '@/actions/experience';
import { Experience } from '@/types';

interface ExperienceFormProps {
  initialData?: Experience | null;
  isEdit?: boolean;
}

export default function ExperienceForm({ initialData, isEdit = false }: ExperienceFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ExperienceFormValues>({
    resolver: zodResolver(ExperienceSchema) as any,
    defaultValues: {
      role: initialData?.role || '',
      company: initialData?.company || '',
      period: initialData?.period || '',
      description: initialData?.description && initialData.description.length > 0
        ? [...initialData.description]
        : [''],
      // sort_order is optional in interface, handled by default in backend or zod? Zod has default(int).
      sort_order: initialData?.sort_order ?? 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: control as any,
    name: "description",
  });

  const onSubmit = async (data: ExperienceFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      let res;
      if (isEdit && initialData?.id) {
        res = await updateExperience(initialData.id, data);
      } else {
        res = await createExperience(data);
      }

      if (res.success) {
        router.push('/experiences');
        router.refresh();
      } else {
        setError(res.error || 'Failed to save experience');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>{isEdit ? 'Edit Experience' : 'New Experience'}</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit as any)} noValidate>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Role"
                  fullWidth
                  error={!!errors.role}
                  helperText={errors.role?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="company"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Company"
                  fullWidth
                  error={!!errors.company}
                  helperText={errors.company?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="period"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Period (e.g. Jan 2020 - Present)"
                  fullWidth
                  error={!!errors.period}
                  helperText={errors.period?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle2" gutterBottom>Description Requirements</Typography>
            {fields.map((field, index) => (
              <Box key={field.id} sx={{ display: 'flex', mb: 2 }}>
                <TextField
                  {...register(`description.${index}` as const)}
                  label={`Point ${index + 1}`}
                  fullWidth
                  error={!!errors.description?.[index]}
                  helperText={errors.description?.[index]?.message}
                  sx={{ mr: 1 }}
                />
                <IconButton onClick={() => remove(index)} disabled={fields.length === 1}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button startIcon={<AddIcon />} onClick={() => append('')}>
              Add Point
            </Button>
            {errors.description && typeof errors.description.message === 'string' && (
              <Typography color="error" variant="caption" display="block">{errors.description.message}</Typography>
            )}
          </Grid>

          <Grid size={{ xs: 12 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Experience'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
