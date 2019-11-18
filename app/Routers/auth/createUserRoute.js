import { Router } from 'express';
import createUserController from '../../Controllers/createUserController';
import validate from '../../utilities/validator';

const router = Router();

router.post('/', createUserController);

export default router;
