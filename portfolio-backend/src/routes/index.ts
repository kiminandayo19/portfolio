import { Router } from 'express';
import profileRoutes from './profileRoutes';
import experienceRoutes from './experienceRoutes';
import projectRoutes from './projectRoutes';
import skillRoutes from './skillRoutes';

const router = Router();

// Mount all route modules
router.use('/profile', profileRoutes);
router.use('/experiences', experienceRoutes);
router.use('/projects', projectRoutes);
router.use('/skills', skillRoutes);

// Health check endpoint
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
