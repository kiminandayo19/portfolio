import { getSupabaseClient, TABLES } from '../config/supabase';
import { Project, ProjectInput } from '../types';

// Pure function to get all projects
export const getAllProjects = async (): Promise<readonly Project[]> => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from(TABLES.PROJECTS)
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }

  return data ?? [];
};

// Pure function to get project by ID
export const getProjectById = async (id: string): Promise<Project | null> => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from(TABLES.PROJECTS)
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to fetch project: ${error.message}`);
  }

  return data;
};

// Pure function to create project
export const createProject = async (input: ProjectInput): Promise<Project> => {
  const supabase = getSupabaseClient();

  // Get max sort_order for new entry
  const { data: maxOrderData } = await supabase
    .from(TABLES.PROJECTS)
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
    .single();

  const nextOrder = (maxOrderData?.sort_order ?? 0) + 1;

  const projectData = {
    ...input,
    sort_order: input.sort_order ?? nextOrder,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from(TABLES.PROJECTS)
    .insert(projectData)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create project: ${error.message}`);
  }

  return data;
};

// Pure function to update project
export const updateProject = async (
  id: string,
  input: Partial<ProjectInput>
): Promise<Project> => {
  const supabase = getSupabaseClient();

  const updateData = {
    ...input,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from(TABLES.PROJECTS)
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update project: ${error.message}`);
  }

  return data;
};

// Pure function to delete project
export const deleteProject = async (id: string): Promise<void> => {
  const supabase = getSupabaseClient();

  const { error } = await supabase
    .from(TABLES.PROJECTS)
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete project: ${error.message}`);
  }
};
