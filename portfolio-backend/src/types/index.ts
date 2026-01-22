// TypeScript interfaces for Portfolio Backend API

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
  readonly name: string;
  readonly title: string;
  readonly email: string;
  readonly linkedin: string;
  readonly location: string;
  readonly summary: string;
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
  readonly role: string;
  readonly company: string;
  readonly period: string;
  readonly description: readonly string[];
  readonly sort_order?: number;
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
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly link?: string;
  readonly sort_order?: number;
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
  readonly category: string;
  readonly items: readonly string[];
  readonly sort_order?: number;
}

// API Response types
export interface ApiResponse<T> {
  readonly success: boolean;
  readonly data: T | null;
  readonly error: string | null;
}

export interface PaginatedResponse<T> {
  readonly success: boolean;
  readonly data: readonly T[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
}
