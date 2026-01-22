import { Router } from 'express';
import * as profileController from '../controllers/profileController';
import { validateRequest, profileSchema } from '../middlewares/validateRequest';

const router = Router();

// GET /api/profile - Get profile data
router.get('/', profileController.getProfile);

// PUT /api/profile - Update or create profile
router.put('/', validateRequest(profileSchema), profileController.updateProfile);

export default router;
