import { Router } from 'express';
import docController from '../Controllers/docController';

const router = Router();

router.get('/', docController);

export default router;
