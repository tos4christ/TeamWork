import { Router } from 'express';
import articleController from '../Controllers/articleController';
import validate from '../utilities/validator';

const router = Router();

router.post('/', validate.postArticles , articleController.createArticle);

router.patch('/:articleId', validate.patchArticles, articleController.updateAnArticle);

router.get('/:articleId', articleController.getAnArticle);

router.get('/all/:userId', articleController.getAllArticle);

router.delete('/:articleId', articleController.deleteAnArticle);

router.post('/:articleId/comment', validate.postArtCom, articleController.postAnArticleComment);

router.post('/:articleId/flag', articleController.flagArticle);

router.post('/:articleId/comment/:commentId/flag', articleController.flagComment);

router.delete('/:articleId/flag', articleController.deleteFlaggedArticle);

router.delete('/:articleId/comment/:commentId', articleController.deleteFlaggedComment);

router.delete('/:articleId/commented/:commentId', articleController.deleteComment);

router.get('/', articleController.getArticleByTag);

export default router;
