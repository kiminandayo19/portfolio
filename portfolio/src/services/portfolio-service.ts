import { fetchBackend } from './api-service';
import { ApiResponse, Profile, Experience, Project, Skill } from '@/types/backend';

/**
 * Portfolio Service to fetch data from the Express.js backend.
 */

export const getProfile = async (): Promise<Profile | null> => {
  const response = await fetchBackend<ApiResponse<Profile>>('/api/profile');
  return response.data;
};

export const getExperiences = async (): Promise<Experience[]> => {
  const response = await fetchBackend<ApiResponse<Experience[]>>('/api/experiences');
  return response.data || [];
};

export const getProjects = async (): Promise<Project[]> => {
  const response = await fetchBackend<ApiResponse<Project[]>>('/api/projects');
  return response.data || [];
};

export const getSkills = async (): Promise<Skill[]> => {
  const response = await fetchBackend<ApiResponse<Skill[]>>('/api/skills');
  return response.data || [];
};
