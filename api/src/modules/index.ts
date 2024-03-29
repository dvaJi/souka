import { Router } from 'express';
import auth from './auth/auth.route';
import users from './user/user.route';

const router: Router = Router();

router.use('/', auth);
router.use('/users', users);

export default router;
