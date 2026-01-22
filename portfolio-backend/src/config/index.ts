import dotenv from 'dotenv';

dotenv.config();

// Pure function to get required env variable
const getRequiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

// Pure function to get optional env variable with default
const getOptionalEnv = (key: string, defaultValue: string): string =>
  process.env[key] ?? defaultValue;

// Immutable configuration object
export const config = Object.freeze({
  port: parseInt(getOptionalEnv('PORT', '3001'), 10),
  nodeEnv: getOptionalEnv('NODE_ENV', 'development'),
  supabase: Object.freeze({
    url: getRequiredEnv('SUPABASE_URL'),
    anonKey: getRequiredEnv('SUPABASE_ANON_KEY'),
    serviceRoleKey: getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY'),
  }),
  cors: Object.freeze({
    origin: getOptionalEnv('CORS_ORIGIN', 'http://localhost:3000'),
  }),
  isDevelopment: getOptionalEnv('NODE_ENV', 'development') === 'development',
  isProduction: getOptionalEnv('NODE_ENV', 'development') === 'production',
});

export type Config = typeof config;
