import { Router } from 'express';
import chapter from './chapter';

const router: Router = Router();

router.use('/chapter', chapter);

export default router;
