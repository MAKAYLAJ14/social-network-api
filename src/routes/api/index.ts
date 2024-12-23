import { Router } from 'express';
import userRoutes from './userRoutes';
import thoughtRoutes from '../api/';

const router = Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

export default router;