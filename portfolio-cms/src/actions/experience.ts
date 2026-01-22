'use server';

import { revalidatePath } from 'next/cache';
import { fetchBackend } from '@/services/api';
import { Experience, ExperienceInput, ApiResponse } from '@/types';

const ENDPOINT = '/api/experiences';

export async function getExperiences(): Promise<ApiResponse<Experience[]>> {
  try {
    const res = await fetchBackend<ApiResponse<Experience[]>>(ENDPOINT);
    return res;
  } catch (error: any) {
    return { success: false, data: null, error: error.message };
  }
}

export async function createExperience(data: ExperienceInput): Promise<ApiResponse<Experience>> {
  try {
    const res = await fetchBackend<ApiResponse<Experience>>(ENDPOINT, {
      method: 'POST',
      body: data,
    });
    revalidatePath('/experiences');
    return res;
  } catch (error: any) {
    return { success: false, data: null, error: error.message };
  }
}

export async function updateExperience(id: string, data: ExperienceInput): Promise<ApiResponse<Experience>> {
  try {
    const res = await fetchBackend<ApiResponse<Experience>>(`${ENDPOINT}/${id}`, {
      method: 'PUT',
      body: data,
    });
    revalidatePath('/experiences');
    return res;
  } catch (error: any) {
    return { success: false, data: null, error: error.message };
  }
}

export async function deleteExperience(id: string): Promise<ApiResponse<void>> {
  try {
    const res = await fetchBackend<ApiResponse<void>>(`${ENDPOINT}/${id}`, {
      method: 'DELETE',
    });
    revalidatePath('/experiences');
    return res;
  } catch (error: any) {
    return { success: false, data: null, error: error.message };
  }
}
