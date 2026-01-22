import { Router } from 'express';
import * as skillController from '../controllers/skillController';
import { validateRequest, skillSchema } from '../middlewares/validateRequest';

const router = Router();

// GET /api/skills - List all skills
router.get('/', skillController.getAllSkills);

// GET /api/skills/:id - Get single skill
router.get('/:id', skillController.getSkill);

// POST /api/skills - Create skill
router.post('/', validateRequest(skillSchema), skillController.createSkill);

// PUT /api/skills/:id - Update skill
router.put('/:id', skillController.updateSkill);

// DELETE /api/skills/:id - Delete skill
router.delete('/:id', skillController.deleteSkill);

export default router;
