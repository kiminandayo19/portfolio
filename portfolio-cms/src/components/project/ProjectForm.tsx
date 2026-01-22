'use client';

import React, { useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography, Paper, Grid, Alert, IconButton } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { ProjectSchema, ProjectFormValues } from '@/lib/schema';
import { createProject, updateProject } from '@/actions/project';
import { Project } from '@/types';

interface ProjectFormProps {
  initialData?: Project | null;
  isEdit?: boolean;
}

export default function ProjectForm({ initialData, isEdit = false }: ProjectFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectSchema) as any,
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      link: initialData?.link || '',
      tags: initialData?.tags && initialData.tags.length > 0
        ? [...initialData.tags]
        : [''],
      sort_order: initialData?.sort_order || 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: control as any,
    name: "tags",
  });

  const onSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      let res;
      if (isEdit && initialData?.id) {
        res = await updateProject(initialData.id, data);
      } else {
        res = await createProject(data);
      }

      if (res.success) {
        router.push('/projects');
        router.refresh();
      } else {
        setError(res.error || 'Failed to save project');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>{isEdit ? 'Edit Project' : 'New Project'}</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit as any)} noValidate>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Project Title"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  multiline
                  rows={3}
                  fullWidth
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="link"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Project Link (URL)"
                  fullWidth
                  error={!!errors.link}
                  helperText={errors.link?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle2" gutterBottom>Tags / Technologies</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
              {fields.map((field, index) => (
                <Box key={field.id} sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    {...register(`tags.${index}` as const)}
                    size="small"
                    placeholder="Tag"
                    error={!!errors.tags?.[index]}
                  />
                  <IconButton size="small" onClick={() => remove(index)} disabled={fields.length === 1}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
              <Button startIcon={<AddIcon />} onClick={() => append('')} size="small">
                Add Tag
              </Button>
            </Box>
            {errors.tags && typeof errors.tags.message === 'string' && (
              <Typography color="error" variant="caption" display="block">{errors.tags.message}</Typography>
            )}
          </Grid>

          <Grid size={{ xs: 12 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Project'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
