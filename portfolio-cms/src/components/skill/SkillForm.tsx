'use client';

import React, { useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography, Paper, Grid, Alert, IconButton } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { SkillSchema, SkillFormValues } from '@/lib/schema';
import { createSkill, updateSkill } from '@/actions/skill';
import { Skill } from '@/types';

interface SkillFormProps {
  initialData?: Skill | null;
  isEdit?: boolean;
}

export default function SkillForm({ initialData, isEdit = false }: SkillFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SkillFormValues>({
    resolver: zodResolver(SkillSchema) as any,
    defaultValues: {
      category: initialData?.category || '',
      items: initialData?.items && initialData.items.length > 0
        ? [...initialData.items]
        : [''],
      sort_order: initialData?.sort_order || 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: control as any,
    name: "items",
  });

  const onSubmit = async (data: SkillFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      let res;
      if (isEdit && initialData?.id) {
        res = await updateSkill(initialData.id, data);
      } else {
        res = await createSkill(data);
      }

      if (res.success) {
        router.push('/skills');
        router.refresh();
      } else {
        setError(res.error || 'Failed to save skill set');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>{isEdit ? 'Edit Skills' : 'New Skill Category'}</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit as any)} noValidate>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Category Name (e.g. Frontend, Backend)"
                  fullWidth
                  error={!!errors.category}
                  helperText={errors.category?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle2" gutterBottom>Skill Items</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
              {fields.map((field, index) => (
                <Box key={field.id} sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    {...register(`items.${index}` as const)}
                    size="small"
                    placeholder="Skill (e.g. React)"
                    error={!!errors.items?.[index]}
                  />
                  <IconButton size="small" onClick={() => remove(index)} disabled={fields.length === 1}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
              <Button startIcon={<AddIcon />} onClick={() => append('')} size="small">
                Add Item
              </Button>
            </Box>
            {errors.items && typeof errors.items.message === 'string' && (
              <Typography color="error" variant="caption" display="block">{errors.items.message}</Typography>
            )}
          </Grid>

          <Grid size={{ xs: 12 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Category'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
