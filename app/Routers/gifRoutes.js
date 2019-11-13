import { Router } from 'express';
import multipart from 'connect-multiparty';
import gifController from '../Controllers/gifController';

const router = Router();
const multipartMiddleware = multipart();

router.post('/', multipartMiddleware, gifController.createGif);

router.get('/:gifId', gifController.getAGif);

router.delete('/:gifId', gifController.deleteAGif);

router.post('/:gifId/comment', gifController.postAGifComment);

export default router;
