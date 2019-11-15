import { Router } from 'express';
import multipart from 'connect-multiparty';
import gifController from '../Controllers/gifController';

const router = Router();
const multipartMiddleware = multipart();

router.post('/', multipartMiddleware, gifController.createGif);

router.get('/:gifId', gifController.getAGif);

router.delete('/:gifId', gifController.deleteAGif);

router.post('/:gifId/comment', gifController.postAGifComment);

router.post('/:gifId/flag', gifController.flagGif);

router.post('/:gifId/comment/:commentId/flag', gifController.flagComment);

router.delete('/:gifId/flag', gifController.deleteFlaggedGif);

router.delete('/:gifId/comment/:commentId', gifController.deleteFlaggedComment);

export default router;
