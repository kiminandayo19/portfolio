import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from './index';

// Singleton pattern for Supabase client
let supabaseClient: SupabaseClient | null = null;

// Pure function to create Supabase client
const createSupabaseClient = (): SupabaseClient =>
  createClient(config.supabase.url, config.supabase.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

// Get or create Supabase client instance
export const getSupabaseClient = (): SupabaseClient => {
  if (!supabaseClient) {
    supabaseClient = createSupabaseClient();
  }
  return supabaseClient;
};

// Table names as constants to avoid typos
export const TABLES = Object.freeze({
  PROFILES: 'profiles',
  EXPERIENCES: 'experiences',
  PROJECTS: 'projects',
  SKILLS: 'skills',
});
