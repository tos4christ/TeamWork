import { Router } from 'express';
import createUserController from '../../Controllers/createUserController';

const router = Router();

router.post('/', createUserController);

export default router;
