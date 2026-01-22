import { Router } from 'express';
import * as projectController from '../controllers/projectController';
import { validateRequest, projectSchema } from '../middlewares/validateRequest';

const router = Router();

// GET /api/projects - List all projects
router.get('/', projectController.getAllProjects);

// GET /api/projects/:id - Get single project
router.get('/:id', projectController.getProject);

// POST /api/projects - Create project
router.post('/', validateRequest(projectSchema), projectController.createProject);

// PUT /api/projects/:id - Update project
router.put('/:id', projectController.updateProject);

// DELETE /api/projects/:id - Delete project
router.delete('/:id', projectController.deleteProject);

export default router;
