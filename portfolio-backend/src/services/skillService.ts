import { getSupabaseClient, TABLES } from '../config/supabase';
import { Skill, SkillInput } from '../types';

// Pure function to get all skills
export const getAllSkills = async (): Promise<readonly Skill[]> => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from(TABLES.SKILLS)
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch skills: ${error.message}`);
  }

  return data ?? [];
};

// Pure function to get skill by ID
export const getSkillById = async (id: string): Promise<Skill | null> => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from(TABLES.SKILLS)
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to fetch skill: ${error.message}`);
  }

  return data;
};

// Pure function to create skill
export const createSkill = async (input: SkillInput): Promise<Skill> => {
  const supabase = getSupabaseClient();

  // Get max sort_order for new entry
  const { data: maxOrderData } = await supabase
    .from(TABLES.SKILLS)
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
    .single();

  const nextOrder = (maxOrderData?.sort_order ?? 0) + 1;

  const skillData = {
    ...input,
    sort_order: input.sort_order ?? nextOrder,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from(TABLES.SKILLS)
    .insert(skillData)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create skill: ${error.message}`);
  }

  return data;
};

// Pure function to update skill
export const updateSkill = async (
  id: string,
  input: Partial<SkillInput>
): Promise<Skill> => {
  const supabase = getSupabaseClient();

  const updateData = {
    ...input,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from(TABLES.SKILLS)
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update skill: ${error.message}`);
  }

  return data;
};

// Pure function to delete skill
export const deleteSkill = async (id: string): Promise<void> => {
  const supabase = getSupabaseClient();

  const { error } = await supabase
    .from(TABLES.SKILLS)
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete skill: ${error.message}`);
  }
};
