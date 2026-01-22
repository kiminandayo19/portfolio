'use server';

import { revalidatePath } from 'next/cache';
import { fetchBackend } from '@/services/api';
import { Skill, SkillInput, ApiResponse } from '@/types';

const ENDPOINT = '/api/skills';

export async function getSkills(): Promise<ApiResponse<Skill[]>> {
  try {
    const res = await fetchBackend<ApiResponse<Skill[]>>(ENDPOINT);
    return res;
  } catch (error: any) {
    return { success: false, data: null, error: error.message };
  }
}

export async function createSkill(data: SkillInput): Promise<ApiResponse<Skill>> {
  try {
    const res = await fetchBackend<ApiResponse<Skill>>(ENDPOINT, {
      method: 'POST',
      body: data,
    });
    revalidatePath('/skills');
    return res;
  } catch (error: any) {
    return { success: false, data: null, error: error.message };
  }
}

export async function updateSkill(id: string, data: SkillInput): Promise<ApiResponse<Skill>> {
  try {
    const res = await fetchBackend<ApiResponse<Skill>>(`${ENDPOINT}/${id}`, {
      method: 'PUT',
      body: data,
    });
    revalidatePath('/skills');
    return res;
  } catch (error: any) {
    return { success: false, data: null, error: error.message };
  }
}

export async function deleteSkill(id: string): Promise<ApiResponse<void>> {
  try {
    const res = await fetchBackend<ApiResponse<void>>(`${ENDPOINT}/${id}`, {
      method: 'DELETE',
    });
    revalidatePath('/skills');
    return res;
  } catch (error: any) {
    return { success: false, data: null, error: error.message };
  }
}
