/**
 * Type definitions matching the Backend API responses.
 * These are used across the frontend to ensure type safety when interacting with the backend.
 */

export interface Profile {
  id: string;
  name: string;
  title: string;
  email: string;
  linkedin: string;
  location: string;
  summary: string;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  category: string;
  items: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
}
