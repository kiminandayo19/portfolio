import { Request, Response } from 'express';
import * as experienceService from '../services/experienceService';
import { createSuccessResponse, createErrorResponse } from '../utils/response';
import { asyncHandler } from '../middlewares/errorHandler';
import { ExperienceInput } from '../types';

// GET /api/experiences
export const getAllExperiences = asyncHandler(async (_req: Request, res: Response) => {
  const experiences = await experienceService.getAllExperiences();
  res.json(createSuccessResponse(experiences));
});

// GET /api/experiences/:id
export const getExperience = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const experience = await experienceService.getExperienceById(id);

  if (!experience) {
    res.status(404).json(createErrorResponse('Experience not found'));
    return;
  }

  res.json(createSuccessResponse(experience));
});

// POST /api/experiences
export const createExperience = asyncHandler(async (req: Request, res: Response) => {
  const input: ExperienceInput = {
    role: req.body.role,
    company: req.body.company,
    period: req.body.period,
    description: req.body.description ?? [],
    sort_order: req.body.sort_order,
  };

  const experience = await experienceService.createExperience(input);
  res.status(201).json(createSuccessResponse(experience));
});

// PUT /api/experiences/:id
export const updateExperience = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  // Check if experience exists
  const existing = await experienceService.getExperienceById(id);
  if (!existing) {
    res.status(404).json(createErrorResponse('Experience not found'));
    return;
  }

  // Build partial input object functionally
  const input = {
    ...(req.body.role !== undefined && { role: req.body.role }),
    ...(req.body.company !== undefined && { company: req.body.company }),
    ...(req.body.period !== undefined && { period: req.body.period }),
    ...(req.body.description !== undefined && { description: req.body.description }),
    ...(req.body.sort_order !== undefined && { sort_order: req.body.sort_order }),
  };

  const experience = await experienceService.updateExperience(id, input);
  res.json(createSuccessResponse(experience));
});

// DELETE /api/experiences/:id
export const deleteExperience = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  // Check if experience exists
  const existing = await experienceService.getExperienceById(id);
  if (!existing) {
    res.status(404).json(createErrorResponse('Experience not found'));
    return;
  }

  await experienceService.deleteExperience(id);
  res.json(createSuccessResponse({ message: 'Experience deleted successfully' }));
});
