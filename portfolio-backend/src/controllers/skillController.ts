import { Request, Response } from 'express';
import * as skillService from '../services/skillService';
import { createSuccessResponse, createErrorResponse } from '../utils/response';
import { asyncHandler } from '../middlewares/errorHandler';
import { SkillInput } from '../types';

// GET /api/skills
export const getAllSkills = asyncHandler(async (_req: Request, res: Response) => {
  const skills = await skillService.getAllSkills();
  res.json(createSuccessResponse(skills));
});

// GET /api/skills/:id
export const getSkill = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const skill = await skillService.getSkillById(id);

  if (!skill) {
    res.status(404).json(createErrorResponse('Skill not found'));
    return;
  }

  res.json(createSuccessResponse(skill));
});

// POST /api/skills
export const createSkill = asyncHandler(async (req: Request, res: Response) => {
  const input: SkillInput = {
    category: req.body.category,
    items: req.body.items ?? [],
    sort_order: req.body.sort_order,
  };

  const skill = await skillService.createSkill(input);
  res.status(201).json(createSuccessResponse(skill));
});

// PUT /api/skills/:id
export const updateSkill = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  // Check if skill exists
  const existing = await skillService.getSkillById(id);
  if (!existing) {
    res.status(404).json(createErrorResponse('Skill not found'));
    return;
  }

  // Build partial input object functionally
  const input = {
    ...(req.body.category !== undefined && { category: req.body.category }),
    ...(req.body.items !== undefined && { items: req.body.items }),
    ...(req.body.sort_order !== undefined && { sort_order: req.body.sort_order }),
  };

  const skill = await skillService.updateSkill(id, input);
  res.json(createSuccessResponse(skill));
});

// DELETE /api/skills/:id
export const deleteSkill = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  // Check if skill exists
  const existing = await skillService.getSkillById(id);
  if (!existing) {
    res.status(404).json(createErrorResponse('Skill not found'));
    return;
  }

  await skillService.deleteSkill(id);
  res.json(createSuccessResponse({ message: 'Skill deleted successfully' }));
});
