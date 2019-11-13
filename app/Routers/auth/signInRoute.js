import { Router } from 'express';
import signInController from '../../Controllers/signInController';

const router = Router();

router.post('/', signInController);

export default router;
