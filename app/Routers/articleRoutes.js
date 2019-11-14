import { Router } from 'express';
import articleController from '../Controllers/articleController';

const router = Router();

router.post('/', articleController.createArticle);

router.patch('/:articleId', articleController.updateAnArticle);

router.get('/:articleId', articleController.getAnArticle);

router.delete('/:articleId', articleController.deleteAnArticle);

router.post('/:articleId/comment', articleController.postAnArticleComment);

router.post('/:articleId/flag', articleController.flagArticle);

export default router;
