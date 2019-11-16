import { Router } from 'express';
import signInController from '../../Controllers/signInController';
import validate from '../../utilities/validator';

const router = Router();

router.post('/', validate.signin, signInController);

export default router;
