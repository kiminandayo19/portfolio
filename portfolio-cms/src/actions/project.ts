'use server';

import { revalidatePath } from 'next/cache';
import { fetchBackend } from '@/services/api';
import { Project, ProjectInput, ApiResponse } from '@/types';

const ENDPOINT = '/api/projects';

export async function getProjects(): Promise<ApiResponse<Project[]>> {
  try {
    const res = await fetchBackend<ApiResponse<Project[]>>(ENDPOINT);
    return res;
  } catch (error: any) {
    return { success: false, data: null, error: error.message };
  }
}

export async function createProject(data: ProjectInput): Promise<ApiResponse<Project>> {
  try {
    const res = await fetchBackend<ApiResponse<Project>>(ENDPOINT, {
      method: 'POST',
      body: data,
    });
    revalidatePath('/projects');
    return res;
  } catch (error: any) {
    return { success: false, data: null, error: error.message };
  }
}

export async function updateProject(id: string, data: ProjectInput): Promise<ApiResponse<Project>> {
  try {
    const res = await fetchBackend<ApiResponse<Project>>(`${ENDPOINT}/${id}`, {
      method: 'PUT',
      body: data,
    });
    revalidatePath('/projects');
    return res;
  } catch (error: any) {
    return { success: false, data: null, error: error.message };
  }
}

export async function deleteProject(id: string): Promise<ApiResponse<void>> {
  try {
    const res = await fetchBackend<ApiResponse<void>>(`${ENDPOINT}/${id}`, {
      method: 'DELETE',
    });
    revalidatePath('/projects');
    return res;
  } catch (error: any) {
    return { success: false, data: null, error: error.message };
  }
}
