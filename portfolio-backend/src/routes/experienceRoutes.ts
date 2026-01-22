import { Router } from 'express';
import * as experienceController from '../controllers/experienceController';
import { validateRequest, experienceSchema } from '../middlewares/validateRequest';

const router = Router();

// GET /api/experiences - List all experiences
router.get('/', experienceController.getAllExperiences);

// GET /api/experiences/:id - Get single experience
router.get('/:id', experienceController.getExperience);

// POST /api/experiences - Create experience
router.post('/', validateRequest(experienceSchema), experienceController.createExperience);

// PUT /api/experiences/:id - Update experience
router.put('/:id', experienceController.updateExperience);

// DELETE /api/experiences/:id - Delete experience
router.delete('/:id', experienceController.deleteExperience);

export default router;
