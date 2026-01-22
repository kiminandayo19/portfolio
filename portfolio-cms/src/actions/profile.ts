'use server';

import { revalidatePath } from 'next/cache';
import { fetchBackend } from '@/services/api';
import { Profile, ProfileInput, ApiResponse } from '@/types';

const ENDPOINT = '/api/profile';

export async function getProfile(): Promise<ApiResponse<Profile>> {
  try {
    const res = await fetchBackend<ApiResponse<Profile>>(ENDPOINT);
    return res;
  } catch (error: any) {
    return { success: false, data: null, error: error.message };
  }
}

export async function updateProfile(data: ProfileInput): Promise<ApiResponse<Profile>> {
  try {
    const res = await fetchBackend<ApiResponse<Profile>>(ENDPOINT, {
      method: 'PUT',
      body: data,
    });
    revalidatePath('/profile');
    return res;
  } catch (error: any) {
    return { success: false, data: null, error: error.message };
  }
}
