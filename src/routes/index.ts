import { Router, Request, Response } from 'express';
import apiRoutes from './api';

const router = Router();

router.use('/api', apiRoutes);

// Handle 404 errors
router.use((req: Request, res: Response) => {
    res.status(404).send('404 Error');
});

export default router;