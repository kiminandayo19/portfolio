import { z } from 'zod';

export const ProfileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  email: z.string().email('Invalid email address'),
  linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  location: z.string().min(1, 'Location is required'),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
});

export const ExperienceSchema = z.object({
  role: z.string().min(1, 'Role is required'),
  company: z.string().min(1, 'Company is required'),
  period: z.string().min(1, 'Period is required'),
  description: z.array(z.string()).min(1, 'At least one description point is required'),
  sort_order: z.number().int().default(0),
});

export const ProjectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  link: z.string().url('Invalid URL').optional().or(z.literal('')),
  sort_order: z.number().int().default(0),
});

export const SkillSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  items: z.array(z.string()).min(1, 'At least one skill item is required'),
  sort_order: z.number().int().default(0),
});

export type ProfileFormValues = z.infer<typeof ProfileSchema>;
export type ExperienceFormValues = z.infer<typeof ExperienceSchema>;
export type ProjectFormValues = z.infer<typeof ProjectSchema>;
export type SkillFormValues = z.infer<typeof SkillSchema>;
