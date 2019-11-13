import { Router } from 'express';
import feedController from '../Controllers/feedController';

const router = Router();

router.get('/', feedController);

export default router;
