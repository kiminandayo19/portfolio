// TypeScript interfaces matched to Portfolio Backend API

export interface Profile {
  readonly id: string;
  readonly name: string;
  readonly title: string;
  readonly email: string;
  readonly linkedin: string;
  readonly location: string;
  readonly summary: string;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface ProfileInput {
  name: string;
  title: string;
  email: string;
  linkedin: string;
  location: string;
  summary: string;
}

export interface Experience {
  readonly id: string;
  readonly role: string;
  readonly company: string;
  readonly period: string;
  readonly description: readonly string[];
  readonly sort_order: number;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface ExperienceInput {
  role: string;
  company: string;
  period: string;
  description: string[];
  sort_order?: number;
}

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly link: string | null;
  readonly sort_order: number;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface ProjectInput {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  sort_order?: number;
}

export interface Skill {
  readonly id: string;
  readonly category: string;
  readonly items: readonly string[];
  readonly sort_order: number;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface SkillInput {
  category: string;
  items: string[];
  sort_order?: number;
}

// API Response types match backend
export interface ApiResponse<T> {
  readonly success: boolean;
  readonly data: T | null;
  readonly error: string | null;
}
