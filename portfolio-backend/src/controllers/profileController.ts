import { Request, Response } from 'express';
import * as profileService from '../services/profileService';
import { createSuccessResponse, createErrorResponse } from '../utils/response';
import { asyncHandler } from '../middlewares/errorHandler';
import { ProfileInput } from '../types';

// GET /api/profile
export const getProfile = asyncHandler(async (_req: Request, res: Response) => {
  const profile = await profileService.getProfile();

  if (!profile) {
    res.status(404).json(createErrorResponse('Profile not found'));
    return;
  }

  res.json(createSuccessResponse(profile));
});

// PUT /api/profile
export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const input: ProfileInput = {
    name: req.body.name,
    title: req.body.title,
    email: req.body.email,
    linkedin: req.body.linkedin,
    location: req.body.location,
    summary: req.body.summary,
  };

  const profile = await profileService.upsertProfile(input);
  res.json(createSuccessResponse(profile));
});
