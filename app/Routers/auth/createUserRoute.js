import { Router } from 'express';
import createUserController from '../../Controllers/createUserController';
import validate from '../../utilities/validator';

const router = Router();

router.post('/', validate.createUser, createUserController);

export default router;
