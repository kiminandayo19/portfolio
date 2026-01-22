import { Request, Response } from 'express';
import * as projectService from '../services/projectService';
import { createSuccessResponse, createErrorResponse } from '../utils/response';
import { asyncHandler } from '../middlewares/errorHandler';
import { ProjectInput } from '../types';

// GET /api/projects
export const getAllProjects = asyncHandler(async (_req: Request, res: Response) => {
  const projects = await projectService.getAllProjects();
  res.json(createSuccessResponse(projects));
});

// GET /api/projects/:id
export const getProject = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const project = await projectService.getProjectById(id);

  if (!project) {
    res.status(404).json(createErrorResponse('Project not found'));
    return;
  }

  res.json(createSuccessResponse(project));
});

// POST /api/projects
export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const input: ProjectInput = {
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags ?? [],
    link: req.body.link,
    sort_order: req.body.sort_order,
  };

  const project = await projectService.createProject(input);
  res.status(201).json(createSuccessResponse(project));
});

// PUT /api/projects/:id
export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  // Check if project exists
  const existing = await projectService.getProjectById(id);
  if (!existing) {
    res.status(404).json(createErrorResponse('Project not found'));
    return;
  }

  // Build partial input object functionally
  const input = {
    ...(req.body.title !== undefined && { title: req.body.title }),
    ...(req.body.description !== undefined && { description: req.body.description }),
    ...(req.body.tags !== undefined && { tags: req.body.tags }),
    ...(req.body.link !== undefined && { link: req.body.link }),
    ...(req.body.sort_order !== undefined && { sort_order: req.body.sort_order }),
  };

  const project = await projectService.updateProject(id, input);
  res.json(createSuccessResponse(project));
});

// DELETE /api/projects/:id
export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  // Check if project exists
  const existing = await projectService.getProjectById(id);
  if (!existing) {
    res.status(404).json(createErrorResponse('Project not found'));
    return;
  }

  await projectService.deleteProject(id);
  res.json(createSuccessResponse({ message: 'Project deleted successfully' }));
});
