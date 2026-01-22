import { getSupabaseClient, TABLES } from '../config/supabase';
import { Experience, ExperienceInput } from '../types';

// Pure function to get all experiences
export const getAllExperiences = async (): Promise<readonly Experience[]> => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from(TABLES.EXPERIENCES)
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch experiences: ${error.message}`);
  }

  return data ?? [];
};

// Pure function to get experience by ID
export const getExperienceById = async (id: string): Promise<Experience | null> => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from(TABLES.EXPERIENCES)
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to fetch experience: ${error.message}`);
  }

  return data;
};

// Pure function to create experience
export const createExperience = async (input: ExperienceInput): Promise<Experience> => {
  const supabase = getSupabaseClient();

  // Get max sort_order for new entry
  const { data: maxOrderData } = await supabase
    .from(TABLES.EXPERIENCES)
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
    .single();

  const nextOrder = (maxOrderData?.sort_order ?? 0) + 1;

  const experienceData = {
    ...input,
    sort_order: input.sort_order ?? nextOrder,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from(TABLES.EXPERIENCES)
    .insert(experienceData)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create experience: ${error.message}`);
  }

  return data;
};

// Pure function to update experience
export const updateExperience = async (
  id: string,
  input: Partial<ExperienceInput>
): Promise<Experience> => {
  const supabase = getSupabaseClient();

  const updateData = {
    ...input,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from(TABLES.EXPERIENCES)
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update experience: ${error.message}`);
  }

  return data;
};

// Pure function to delete experience
export const deleteExperience = async (id: string): Promise<void> => {
  const supabase = getSupabaseClient();

  const { error } = await supabase
    .from(TABLES.EXPERIENCES)
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete experience: ${error.message}`);
  }
};
