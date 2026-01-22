import { getSupabaseClient, TABLES } from '../config/supabase';
import { Profile, ProfileInput } from '../types';

// Pure function to get profile from Supabase
export const getProfile = async (): Promise<Profile | null> => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from(TABLES.PROFILES)
    .select('*')
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to fetch profile: ${error.message}`);
  }

  return data;
};

// Pure function to update or create profile
export const upsertProfile = async (input: ProfileInput): Promise<Profile> => {
  const supabase = getSupabaseClient();

  // Check if profile exists
  const existingProfile = await getProfile();

  const profileData = {
    ...input,
    updated_at: new Date().toISOString(),
  };

  if (existingProfile) {
    // Update existing profile
    const { data, error } = await supabase
      .from(TABLES.PROFILES)
      .update(profileData)
      .eq('id', existingProfile.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update profile: ${error.message}`);
    }

    return data;
  } else {
    // Create new profile
    const { data, error } = await supabase
      .from(TABLES.PROFILES)
      .insert({
        ...profileData,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create profile: ${error.message}`);
    }

    return data;
  }
};
