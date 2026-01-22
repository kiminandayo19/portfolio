'use server';

import * as portfolioService from '@/services/portfolio-service';
import { Profile, Experience, Project, Skill } from '@/types/backend';

/**
 * Server Actions for Portfolio Data.
 * These actions provide a secure way for Client Components to access backend data.
 */

export const getProfileData = async (): Promise<Profile | null> => {
  try {
    return await portfolioService.getProfile();
  } catch (error) {
    console.error('Error in getProfileData action:', error);
    return null;
  }
};

export const getExperiencesData = async (): Promise<Experience[]> => {
  try {
    return await portfolioService.getExperiences();
  } catch (error) {
    console.error('Error in getExperiencesData action:', error);
    return [];
  }
};

export const getProjectsData = async (): Promise<Project[]> => {
  try {
    return await portfolioService.getProjects();
  } catch (error) {
    console.error('Error in getProjectsData action:', error);
    return [];
  }
};

export const getSkillsData = async (): Promise<Skill[]> => {
  try {
    return await portfolioService.getSkills();
  } catch (error) {
    console.error('Error in getSkillsData action:', error);
    return [];
  }
};
