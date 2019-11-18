import { Router } from 'express';
import signInController from '../../Controllers/signInController';
import validate from '../../utilities/validator';

const router = Router();

router.post('/', signInController);

export default router;
