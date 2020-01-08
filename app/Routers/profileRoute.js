import { Router } from 'express';
import multipart from 'connect-multiparty';
import validate from '../utilities/validator';
import profileController from '../Controllers/profileController';

const router = Router();
const multipartMiddleware = multipart();

router.post('/', multipartMiddleware, validate.profile, profileController.uploadPic);

router.get('/:userId', profileController.getProfile);

export default router;
